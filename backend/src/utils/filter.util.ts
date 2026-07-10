/**
 * Build filter condition for exact match
 */
export function buildExactFilter(field: string, value: any): any {
  if (value === undefined || value === null || value === '') {
    return {};
  }
  
  return { [field]: value };
}

/**
 * Build filter condition for array of values (IN operator)
 */
export function buildInFilter(field: string, values: any[]): any {
  if (!values || values.length === 0) {
    return {};
  }
  
  return {
    [field]: {
      in: values,
    },
  };
}

/**
 * Build filter condition for range (gte, lte)
 */
export function buildRangeFilter(
  field: string,
  min?: number,
  max?: number
): any {
  const condition: any = {};
  
  if (min !== undefined && min !== null) {
    condition.gte = min;
  }
  
  if (max !== undefined && max !== null) {
    condition.lte = max;
  }
  
  if (Object.keys(condition).length === 0) {
    return {};
  }
  
  return { [field]: condition };
}

/**
 * Build filter condition for boolean
 */
export function buildBooleanFilter(field: string, value: any): any {
  if (value === undefined || value === null || value === '') {
    return {};
  }
  
  // Convert string to boolean
  const boolValue = value === true || value === 'true' || value === '1';
  
  return { [field]: boolValue };
}

/**
 * Build filter condition for nested relation
 */
export function buildNestedFilter(relation: string, condition: any): any {
  if (!condition || Object.keys(condition).length === 0) {
    return {};
  }
  
  return {
    [relation]: condition,
  };
}

/**
 * Combine multiple filter conditions
 */
export function combineFilters(...filters: any[]): any {
  const validFilters = filters.filter(
    filter => filter && Object.keys(filter).length > 0
  );
  
  if (validFilters.length === 0) {
    return {};
  }
  
  // Merge all filters into a single object
  return Object.assign({}, ...validFilters);
}

/**
 * Parse filter values from query string
 */
export function parseFilterArray(value: any): string[] | undefined {
  if (!value) return undefined;
  
  if (Array.isArray(value)) {
    return value;
  }
  
  if (typeof value === 'string') {
    return value.split(',').map(v => v.trim()).filter(v => v);
  }
  
  return undefined;
}

/**
 * Parse numeric filter from query string
 */
export function parseNumericFilter(value: any): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}
