import apiClient from '../api-client';

export interface City {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  cityId: string;
  city?: City;
  isActive: boolean;
}

export interface Specialization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  type: 'GOVERNMENT' | 'PRIVATE' | 'SEMI_GOVERNMENT' | 'CHARITABLE';
  address: string;
  cityId: string;
  areaId?: string;
  phone?: string;
  website?: string;
  email?: string;
  logo?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  emergencyAvailable: boolean;
  rating: number;
  isActive: boolean;
  city?: City;
  area?: Area;
  _count?: {
    doctors: number;
  };
}

export const masterDataApi = {
  // Cities
  getAllCities: async () => {
    const response = await apiClient.get<City[]>('/cities');
    return response.data.data;
  },

  getCityById: async (cityId: string) => {
    const response = await apiClient.get<City>(`/cities/${cityId}`);
    return response.data.data;
  },

  // Areas
  getAllAreas: async (cityId?: string) => {
    const params = cityId ? { cityId } : undefined;
    const response = await apiClient.get<Area[]>('/areas', { params });
    return response.data.data;
  },

  getAreasByCity: async (cityId: string) => {
    const response = await apiClient.get<Area[]>(`/areas/city/${cityId}`);
    return response.data.data;
  },

  getAreaById: async (areaId: string) => {
    const response = await apiClient.get<Area>(`/areas/${areaId}`);
    return response.data.data;
  },

  // Specializations
  getAllSpecializations: async () => {
    const response = await apiClient.get<Specialization[]>('/specializations');
    return response.data.data;
  },

  getSpecializationById: async (specializationId: string) => {
    const response = await apiClient.get<Specialization>(`/specializations/${specializationId}`);
    return response.data.data;
  },

  // Hospitals
  getAllHospitals: async (params?: any) => {
    const response = await apiClient.get('/hospitals', { params });
    return response.data.data;
  },

  getHospitalById: async (hospitalId: string) => {
    const response = await apiClient.get<Hospital>(`/hospitals/${hospitalId}`);
    return response.data.data;
  },

  getHospitalStats: async () => {
    const response = await apiClient.get('/hospitals/stats');
    return response.data.data;
  },
};
