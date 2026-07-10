import apiClient from '../api-client';

export interface PatientProfile {
  id: string;
  userId: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  allergies: string[];
  chronicDiseases: string[];
  currentMedications: string[];
  medicalHistory?: string;
  smoking: boolean;
  alcohol: boolean;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  address?: string;
  areaId?: string;
  postalCode?: string;
  country: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
    gender?: string;
    dateOfBirth?: string;
    city?: string;
  };
  area?: {
    id: string;
    name: string;
    city: {
      id: string;
      name: string;
    };
  };
}

export const patientApi = {
  // Patient endpoints
  getMyProfile: async () => {
    const response = await apiClient.get<PatientProfile>('/patients/me');
    return response.data.data;
  },

  updateMyProfile: async (data: any) => {
    const response = await apiClient.put<PatientProfile>('/patients/me', data);
    return response.data.data;
  },

  // Admin endpoints
  getAllPatients: async (params?: any) => {
    const response = await apiClient.get('/patients', { params });
    return response.data.data;
  },

  getPatientById: async (patientId: string) => {
    const response = await apiClient.get<PatientProfile>(`/patients/${patientId}`);
    return response.data.data;
  },

  deletePatient: async (patientId: string) => {
    const response = await apiClient.delete(`/patients/${patientId}`);
    return response.data.data;
  },

  getPatientStats: async () => {
    const response = await apiClient.get('/patients/stats');
    return response.data.data;
  },
};
