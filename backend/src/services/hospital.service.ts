import hospitalRepository from '../repositories/hospital.repository.js';
import { parsePaginationParams, createPaginatedResponse, getPaginationOptions } from '../utils/pagination.util.js';
import { buildSearchCondition } from '../utils/search.util.js';
import { buildExactFilter, combineFilters } from '../utils/filter.util.js';
import { buildOrderBy } from '../utils/sort.util.js';
import { MESSAGES } from '../constants/index.js';

class HospitalService {
  /**
   * Get all hospitals with pagination and filters
   */
  async getAllHospitals(params: any) {
    const { page, limit } = parsePaginationParams(params);
    const { skip, take } = getPaginationOptions(page, limit);

    // Build filters
    const filters = combineFilters(
      { isActive: true },
      buildExactFilter('type', params.type),
      buildExactFilter('cityId', params.cityId),
      buildExactFilter('areaId', params.areaId),
      params.emergencyAvailable ? { emergencyAvailable: true } : {}
    );

    // Build search
    const where = params.search
      ? {
          ...filters,
          OR: buildSearchCondition(params.search, ['name', 'address', 'description']).OR,
        }
      : filters;

    // Build sort
    const orderBy = buildOrderBy(params.sortBy, ['rating', 'name', 'createdAt'], {
      field: 'rating',
      order: 'desc',
    });

    const [hospitals, total] = await Promise.all([
      hospitalRepository.findMany(where, skip, take, orderBy),
      hospitalRepository.count(where),
    ]);

    return createPaginatedResponse(hospitals, page, limit, total);
  }

  /**
   * Get hospital by ID
   */
  async getHospitalById(id: string) {
    const hospital = await hospitalRepository.findById(id);

    if (!hospital) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return hospital;
  }

  /**
   * Create hospital (Admin only)
   */
  async createHospital(data: any) {
    const hospital = await hospitalRepository.create({
      name: data.name,
      type: data.type,
      address: data.address,
      city: {
        connect: { id: data.cityId },
      },
      area: data.areaId ? { connect: { id: data.areaId } } : undefined,
      phone: data.phone,
      website: data.website,
      email: data.email,
      logo: data.logo,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      emergencyAvailable: data.emergencyAvailable,
      rating: data.rating || 0,
    });

    return hospital;
  }

  /**
   * Update hospital (Admin only)
   */
  async updateHospital(id: string, data: any) {
    const hospital = await hospitalRepository.findById(id);

    if (!hospital) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.type) updateData.type = data.type;
    if (data.address) updateData.address = data.address;
    if (data.cityId) updateData.city = { connect: { id: data.cityId } };
    if (data.areaId) updateData.area = { connect: { id: data.areaId } };
    if (data.phone) updateData.phone = data.phone;
    if (data.website) updateData.website = data.website;
    if (data.email) updateData.email = data.email;
    if (data.logo) updateData.logo = data.logo;
    if (data.description) updateData.description = data.description;
    if (data.latitude !== undefined) updateData.latitude = data.latitude;
    if (data.longitude !== undefined) updateData.longitude = data.longitude;
    if (data.emergencyAvailable !== undefined) updateData.emergencyAvailable = data.emergencyAvailable;
    if (data.rating !== undefined) updateData.rating = data.rating;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const updated = await hospitalRepository.update(id, updateData);
    return updated;
  }

  /**
   * Delete hospital (Admin only)
   */
  async deleteHospital(id: string) {
    const hospital = await hospitalRepository.findById(id);

    if (!hospital) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    await hospitalRepository.delete(id);
    return { message: MESSAGES.DELETED };
  }

  /**
   * Get hospital statistics
   */
  async getHospitalStats() {
    const [total, government, private_, semiGovernment, charitable] = await Promise.all([
      hospitalRepository.count({ isActive: true }),
      hospitalRepository.count({ isActive: true, type: 'GOVERNMENT' }),
      hospitalRepository.count({ isActive: true, type: 'PRIVATE' }),
      hospitalRepository.count({ isActive: true, type: 'SEMI_GOVERNMENT' }),
      hospitalRepository.count({ isActive: true, type: 'CHARITABLE' }),
    ]);

    return {
      total,
      government,
      private: private_,
      semiGovernment,
      charitable,
    };
  }
}

export default new HospitalService();
