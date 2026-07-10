import { Prisma } from '@prisma/client';

export type SortOrder = 'asc' | 'desc';

/**
 * Parse sort parameter from query string
 * Format: "field:order" or "field" (defaults to asc)
 * Example: "createdAt:desc" or "name"
 */
export function parseSortParam(sortParam: string | undefined): {
  field: string;
  order: SortOrder;
} | null {
  if (!sortParam) {
    return null;
  }

  const parts = sortParam.split(':');
  const field = parts[0].trim();
  const order = (parts[1]?.trim().toLowerCase() || 'asc') as SortOrder;

  if (!field) {
    return null;
  }

  return { field, order };
}

/**
 * Build orderBy object for Prisma
 */
export function buildOrderBy(
  sortParam: string | undefined,
  allowedFields: string[] = [],
  defaultSort: { field: string; order: SortOrder } = { field: 'createdAt', order: 'desc' }
): any {
  const parsed = parseSortParam(sortParam);

  if (!parsed) {
    return { [defaultSort.field]: defaultSort.order };
  }

  // Validate field if allowedFields is provided
  if (allowedFields.length > 0 && !allowedFields.includes(parsed.field)) {
    return { [defaultSort.field]: defaultSort.order };
  }

  return { [parsed.field]: parsed.order };
}

/**
 * Build nested orderBy for related models
 */
export function buildNestedOrderBy(
  relation: string,
  field: string,
  order: SortOrder = 'asc'
): any {
  return {
    [relation]: {
      [field]: order,
    },
  };
}

/**
 * Common sort options for different models
 */
export const SORT_OPTIONS = {
  DOCTOR: {
    RATING_HIGH: { field: 'rating', order: 'desc' as SortOrder },
    RATING_LOW: { field: 'rating', order: 'asc' as SortOrder },
    EXPERIENCE_HIGH: { field: 'yearsOfExperience', order: 'desc' as SortOrder },
    EXPERIENCE_LOW: { field: 'yearsOfExperience', order: 'asc' as SortOrder },
    FEE_LOW: { field: 'consultationFee', order: 'asc' as SortOrder },
    FEE_HIGH: { field: 'consultationFee', order: 'desc' as SortOrder },
    NEWEST: { field: 'createdAt', order: 'desc' as SortOrder },
    OLDEST: { field: 'createdAt', order: 'asc' as SortOrder },
    NAME_AZ: { field: 'user', order: { firstName: 'asc' as SortOrder } },
    NAME_ZA: { field: 'user', order: { firstName: 'desc' as SortOrder } },
  },
  HOSPITAL: {
    RATING_HIGH: { field: 'rating', order: 'desc' as SortOrder },
    RATING_LOW: { field: 'rating', order: 'asc' as SortOrder },
    NAME_AZ: { field: 'name', order: 'asc' as SortOrder },
    NAME_ZA: { field: 'name', order: 'desc' as SortOrder },
    NEWEST: { field: 'createdAt', order: 'desc' as SortOrder },
    OLDEST: { field: 'createdAt', order: 'asc' as SortOrder },
  },
  PATIENT: {
    NAME_AZ: { field: 'user', order: { firstName: 'asc' as SortOrder } },
    NAME_ZA: { field: 'user', order: { firstName: 'desc' as SortOrder } },
    NEWEST: { field: 'createdAt', order: 'desc' as SortOrder },
    OLDEST: { field: 'createdAt', order: 'asc' as SortOrder },
  },
} as const;

/**
 * Get predefined sort option
 */
export function getPredefinedSort(
  model: keyof typeof SORT_OPTIONS,
  sortKey: string
): any {
  const modelSorts = SORT_OPTIONS[model] as any;
  return modelSorts[sortKey] || { createdAt: 'desc' };
}
