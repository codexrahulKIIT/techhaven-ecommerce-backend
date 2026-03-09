import { getBackendUrlSync } from '../utils/getBackendUrl'

export const getToken = () => localStorage.getItem("authToken");
export const getCurrentUser = () => {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};
export const isAuthenticated = () => !!getToken();

const API_BASE_URL = getBackendUrlSync();

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('authToken', data.token || data.accessToken);
  localStorage.setItem('authUser', JSON.stringify(data.user));
  return data;
};

export const register = async (userData: { firstName: string; lastName: string; email: string; phone: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed');
  }

  const data = await response.json();
  // Do not auto-login, just return the response
  return data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
};
