import apiClient from '../api-client';

export interface FavoriteDoctor {
  id: string;
  patientId: string;
  doctorId: string;
  createdAt: string;
  doctor: any; // Use Doctor type from doctor.api.ts
}

export const favoriteDoctorApi = {
  // Get favorite doctors
  getFavoriteDoctors: async (params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get('/favorite-doctors', { params });
    return response.data.data;
  },

  // Add doctor to favorites
  addFavoriteDoctor: async (doctorId: string) => {
    const response = await apiClient.post(`/favorite-doctors/${doctorId}`);
    return response.data.data;
  },

  // Remove doctor from favorites
  removeFavoriteDoctor: async (doctorId: string) => {
    const response = await apiClient.delete(`/favorite-doctors/${doctorId}`);
    return response.data.data;
  },

  // Check if doctor is favorited
  checkFavorite: async (doctorId: string) => {
    const response = await apiClient.get<{ isFavorited: boolean }>(`/favorite-doctors/${doctorId}/check`);
    return response.data.data;
  },
};
