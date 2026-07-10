import { useQuery } from '@tanstack/react-query';
import { doctorApi } from '@/lib/api';

export function useDoctorProfile() {
  return useQuery({
    queryKey: ['doctor', 'profile'],
    queryFn: () => doctorApi.getMyProfile(),
  });
}

export function useDoctorStats() {
  return useQuery({
    queryKey: ['doctor', 'stats'],
    queryFn: () => doctorApi.getDoctorStats(),
  });
}
