import apiClient from '../api-client';

export interface DoctorSearchParams {
  search?: string;
  specializationId?: string;
  hospitalId?: string;
  cityId?: string;
  areaId?: string;
  gender?: string;
  consultationType?: string;
  minFee?: number;
  maxFee?: number;
  minExperience?: number;
  maxExperience?: number;
  minRating?: number;
  language?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface Doctor {
  id: string;
  userId: string;
  qualification: string;
  yearsOfExperience: number;
  consultationFee: number;
  consultationType: 'ONLINE' | 'PHYSICAL' | 'BOTH';
  rating: number;
  reviewsCount: number;
  languages: string[];
  bio?: string;
  status: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
    gender?: string;
    city?: string;
  };
  specialization?: {
    id: string;
    name: string;
    slug: string;
  };
  hospital?: {
    id: string;
    name: string;
    city?: { name: string };
    area?: { name: string };
  };
  availability?: any[];
  education?: any[];
  experience?: any[];
}

export interface PaginatedDoctorsResponse {
  data: Doctor[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const doctorApi = {
  // Public endpoints
  searchDoctors: async (params?: DoctorSearchParams) => {
    const response = await apiClient.get('/doctors/search', { params });
    // The backend returns: { success: true, data: { data: [...], meta: {...} } }
    // We need to return the nested data object
    return response.data.data;
  },

  getDoctorProfile: async (doctorId: string) => {
    const response = await apiClient.get(`/doctors/${doctorId}`);
    return response.data.data;
  },

  // Doctor endpoints (requires authentication)
  getMyProfile: async () => {
    const response = await apiClient.get('/doctors/me');
    return response.data.data;
  },

  updateMyProfile: async (data: any) => {
    const response = await apiClient.put('/doctors/me', data);
    return response.data.data;
  },

  // Admin endpoints
  getAllDoctors: async (params?: any) => {
    const response = await apiClient.get('/doctors', { params });
    return response.data.data;
  },

  getDoctorStats: async () => {
    const response = await apiClient.get('/doctors/stats');
    return response.data.data;
  },

  approveDoctor: async (doctorId: string) => {
    const response = await apiClient.post(`/doctors/${doctorId}/approve`);
    return response.data.data;
  },

  rejectDoctor: async (doctorId: string, reason: string) => {
    const response = await apiClient.post(`/doctors/${doctorId}/reject`, { reason });
    return response.data.data;
  },

  suspendDoctor: async (doctorId: string, reason: string) => {
    const response = await apiClient.post(`/doctors/${doctorId}/suspend`, { reason });
    return response.data.data;
  },

  blockDoctor: async (doctorId: string, reason: string) => {
    const response = await apiClient.post(`/doctors/${doctorId}/block`, { reason });
    return response.data.data;
  },
};
