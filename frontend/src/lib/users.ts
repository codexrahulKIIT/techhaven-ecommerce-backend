import { getBackendUrlSync } from '../utils/getBackendUrl'

const API_BASE_URL = getBackendUrlSync()

interface ApiResponse {
  success: boolean
  data?: any
  message?: string
}

interface GetUsersParams {
  page?: number
  limit?: number
  search?: string
  status?: string
}

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('adminToken') || localStorage.getItem('authToken')
    : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

export const getAllUsers = async (params: GetUsersParams = {}): Promise<ApiResponse> => {
  try {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.status) queryParams.append('status', params.status)

    const response = await fetch(`${API_BASE_URL}/admin/users?${queryParams}`, {
      headers: getAuthHeaders()
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        data: data
      }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch users'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred'
    }
  }
}

export const getUserById = async (userId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      headers: getAuthHeaders()
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        data: data
      }
    } else {
      return {
        success: false,
        message: data.message || 'User not found'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred'
    }
  }
}

export const updateUser = async (userId: string, userData: any): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        data: data,
        message: 'User updated successfully'
      }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update user'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred'
    }
  }
}

export const deleteUser = async (userId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: 'User deleted successfully'
      }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to delete user'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred'
    }
  }
}

export const bulkDeleteUsers = async (userIds: string[]): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/bulk-delete`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userIds })
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: `${userIds.length} users deleted successfully`
      }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to delete users'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred'
    }
  }
}

export const createUser = async (userData: {
  name: string
  email: string
  password: string
  phone?: string
  role?: string
}): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        data: data,
        message: 'User created successfully'
      }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to create user'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred'
    }
  }
}
