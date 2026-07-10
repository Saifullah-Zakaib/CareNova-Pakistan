import { useQuery } from '@tanstack/react-query';
import { masterDataApi } from '@/lib/api';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: () => masterDataApi.getAllCities(),
  });
}

export function useAreas(cityId?: string) {
  return useQuery({
    queryKey: ['areas', cityId],
    queryFn: () => masterDataApi.getAllAreas(cityId),
    enabled: !!cityId,
  });
}

export function useSpecializations() {
  return useQuery({
    queryKey: ['specializations'],
    queryFn: () => masterDataApi.getAllSpecializations(),
  });
}

export function useHospitals(params?: any) {
  return useQuery({
    queryKey: ['hospitals', params],
    queryFn: () => masterDataApi.getAllHospitals(params),
  });
}
