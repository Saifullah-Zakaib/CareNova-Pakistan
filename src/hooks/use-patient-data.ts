import { useQuery } from '@tanstack/react-query';
import { patientApi, doctorApi, favoriteDoctorApi } from '@/lib/api';

export function usePatientProfile() {
  return useQuery({
    queryKey: ['patient', 'profile'],
    queryFn: () => patientApi.getMyProfile(),
  });
}

export function useFavoriteDoctors(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['favorite-doctors', params],
    queryFn: () => favoriteDoctorApi.getFavoriteDoctors(params),
  });
}

export function useSearchDoctors(params?: any) {
  return useQuery({
    queryKey: ['doctors', 'search', params],
    queryFn: () => doctorApi.searchDoctors(params),
    enabled: !!params, // Only fetch when params are provided
  });
}
