import apiClient from '../api-client';

export interface RegisterPatientData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string;
  city: string;
  acceptTerms: boolean;
}

export interface RegisterDoctorData extends RegisterPatientData {
  qualification: string;
  specialization: string;
  yearsOfExperience: number;
  pmdcLicenseNumber: string;
  consultationFee: number;
  hospitalName: string;
  languages: string[];
  bio?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  profileImage?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth?: string;
  city?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  doctorProfile?: any;
  patientProfile?: any;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

class AuthAPI {
  /**
   * Register a new patient
   */
  async registerPatient(data: RegisterPatientData): Promise<ApiResponse<User>> {
    const response = await apiClient.post<ApiResponse<User>>('/auth/register/patient', data);
    return response.data;
  }

  /**
   * Register a new doctor
   */
  async registerDoctor(data: RegisterDoctorData): Promise<ApiResponse<User>> {
    const response = await apiClient.post<ApiResponse<User>>('/auth/register/doctor', data);
    return response.data;
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data);
    
    // Save access token and user data
    if (response.data.success && response.data.data) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/logout');
    
    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    return response.data;
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    
    // Update user data in local storage
    if (response.data.success && response.data.data) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    
    return response.data;
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/verify-email', { token });
    return response.data;
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/resend-verification', { email });
    return response.data;
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/forgot-password', { email });
    return response.data;
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  }

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordData): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>('/auth/change-password', data);
    return response.data;
  }

  /**
   * Get user from local storage
   */
  getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}

export const authAPI = new AuthAPI();
