import { Prisma } from '@prisma/client';

/**
 * Build search condition for multiple fields
 */
export function buildSearchCondition(
  searchTerm: string | undefined,
  fields: string[]
): any {
  if (!searchTerm || !searchTerm.trim()) {
    return {};
  }

  const search = searchTerm.trim();
  
  return {
    OR: fields.map(field => ({
      [field]: {
        contains: search,
        mode: 'insensitive' as Prisma.QueryMode,
      },
    })),
  };
}

/**
 * Build nested search condition
 */
export function buildNestedSearchCondition(
  searchTerm: string | undefined,
  relation: string,
  fields: string[]
): any {
  if (!searchTerm || !searchTerm.trim()) {
    return {};
  }

  const search = searchTerm.trim();
  
  return {
    [relation]: {
      OR: fields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive' as Prisma.QueryMode,
        },
      })),
    },
  };
}

/**
 * Combine multiple search conditions
 */
export function combineSearchConditions(...conditions: any[]): any {
  const validConditions = conditions.filter(
    condition => condition && Object.keys(condition).length > 0
  );

  if (validConditions.length === 0) {
    return {};
  }

  if (validConditions.length === 1) {
    return validConditions[0];
  }

  return {
    AND: validConditions,
  };
}
