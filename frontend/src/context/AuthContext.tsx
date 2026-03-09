'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getBackendUrlSync, getBackendUrl, clearBackendUrlCache } from '../utils/getBackendUrl';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  adminUser: User | null;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, redirectTo?: string) => Promise<void>;
  adminLogin: (email: string, password: string, redirectTo?: string) => Promise<void>;
  register: (userData: any, redirectTo?: string) => Promise<void>;
  logout: () => void;
  adminLogout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

type ApiUser = {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  role?: 'user' | 'admin';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getApiBaseUrl = () => getBackendUrlSync();

async function fetchWithBackendRetry(input: string, init?: RequestInit) {
  let baseUrl = await getBackendUrl();

  try {
    return await fetch(`${baseUrl}${input}`, init);
  } catch (error) {
    clearBackendUrlCache();
    baseUrl = await getBackendUrl(true);
    return await fetch(`${baseUrl}${input}`, init);
  }
}

async function mergeGuestCart(userId: string) {
  const guestToken = localStorage.getItem('guestCartToken');
  if (!guestToken) return;

  await fetchWithBackendRetry('/cart/merge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestToken, userId }),
  }).catch((error) => {
    console.error('Failed to merge guest cart:', error);
  });
}

function normalizeUser(apiUser: ApiUser): User {
  const fullName = apiUser.name?.trim() || '';
  const [nameFirst, ...rest] = fullName.split(' ').filter(Boolean);

  return {
    id: apiUser.id,
    email: apiUser.email,
    firstName: apiUser.firstName || nameFirst || 'User',
    lastName: apiUser.lastName || rest.join(' ') || '',
    phone: apiUser.phone,
    address: apiUser.address,
    role: apiUser.role || 'user',
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    checkAdminAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const cachedUser = localStorage.getItem('authUser');

      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
        } catch {
          localStorage.removeItem('authUser');
        }
      }

      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetchWithBackendRetry('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const normalized = normalizeUser(userData);
        setUser(normalized);
        localStorage.setItem('authUser', JSON.stringify(normalized));
      } else {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const refreshResponse = await fetchWithBackendRetry('/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshed = await refreshResponse.json();
            localStorage.setItem('authToken', refreshed.accessToken);
            localStorage.setItem('refreshToken', refreshed.refreshToken);
            const normalized = normalizeUser(refreshed.user);
            setUser(normalized);
            localStorage.setItem('authUser', JSON.stringify(normalized));
            setIsLoading(false);
            return;
          }
        }

        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authUser');
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;

      const response = await fetchWithBackendRetry('/admin/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const adminData = await response.json();
        const normalized = normalizeUser(adminData);
        setAdminUser({ ...normalized, role: 'admin' });
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Admin auth check failed:', error);
    }
  };

  const login = async (email: string, password: string, redirectTo?: string) => {
    try {
      const response = await fetchWithBackendRetry('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      const token = data.token || data.accessToken;
      if (!token) throw new Error('Token missing in login response');

      const normalized = normalizeUser(data.user);
      localStorage.setItem('authToken', token);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      localStorage.setItem('authUser', JSON.stringify(normalized));
      setUser(normalized);
      await mergeGuestCart(normalized.id);

      toast.success('Login successful!');
      router.push(redirectTo || '/dashboard');
    } catch (error) {
      if (error instanceof TypeError || (error instanceof Error && error.message.includes('fetch'))) {
        clearBackendUrlCache();
      }
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  };

  const adminLogin = async (email: string, password: string, redirectTo?: string) => {
    try {
      const response = await fetchWithBackendRetry('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Admin login failed');
      }

      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      const normalized = normalizeUser(data.admin);
      setAdminUser({ ...normalized, role: 'admin' });

      toast.success('Admin login successful!');
      router.push(redirectTo || '/admin/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Admin login failed');
      throw error;
    }
  };

  const register = async (userData: any, redirectTo?: string) => {
    try {
      const response = await fetchWithBackendRetry('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      const token = data.token || data.accessToken;
      const normalized = normalizeUser(data.user);

      if (token) {
        localStorage.setItem('authToken', token);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        localStorage.setItem('authUser', JSON.stringify(normalized));
        setUser(normalized);
        await mergeGuestCart(normalized.id);
      }

      toast.success('Registration successful!');
      router.push(redirectTo || '/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      void fetchWithBackendRetry('/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => undefined);
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
    router.push('/');
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminUser(null);
    toast.success('Admin logged out successfully');
    router.push('/admin/login');
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...userData };
    setUser(updated);
    localStorage.setItem('authUser', JSON.stringify(updated));
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Not authenticated');

      const response = await fetchWithBackendRetry('/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      updateUser({
        firstName: updatedProfile.name?.split(' ')[0] || user?.firstName || 'User',
        lastName: updatedProfile.name?.split(' ').slice(1).join(' ') || user?.lastName || '',
        phone: updatedProfile.phone,
        address: updatedProfile.address,
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        adminUser,
        isAuthenticated: !!user,
        isAdminAuthenticated: !!adminUser,
        isLoading,
        login,
        adminLogin,
        register,
        logout,
        adminLogout,
        updateUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
