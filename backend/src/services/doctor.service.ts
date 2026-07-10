import { Prisma } from '@prisma/client';
import doctorRepository from '../repositories/doctor.repository.js';
import userRepository from '../repositories/user.repository.js';
import { parsePaginationParams, createPaginatedResponse, getPaginationOptions } from '../utils/pagination.util.js';
import { buildSearchCondition, combineSearchConditions } from '../utils/search.util.js';
import { buildExactFilter, buildRangeFilter, buildInFilter, combineFilters, parseFilterArray, parseNumericFilter } from '../utils/filter.util.js';
import { buildOrderBy } from '../utils/sort.util.js';
import { MESSAGES } from '../constants/index.js';

interface DoctorSearchParams {
  search?: string;
  specializationId?: string;
  hospitalId?: string;
  cityId?: string;
  areaId?: string;
  gender?: string;
  consultationType?: string;
  minFee?: number;
  maxFee?: number;
  minExperience?: number;
  maxExperience?: number;
  minRating?: number;
  language?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

class DoctorService {
  /**
   * Search doctors with advanced filters
   */
  async searchDoctors(params: DoctorSearchParams) {
    const { page, limit } = parsePaginationParams(params);
    const { skip, take } = getPaginationOptions(page, limit);

    // Build search condition (name, bio, qualification)
    const searchCondition = params.search
      ? {
          OR: [
            ...buildSearchCondition(params.search, ['qualification', 'bio', 'hospitalName']).OR,
            {
              user: buildSearchCondition(params.search, ['firstName', 'lastName', 'email']),
            },
          ],
        }
      : {};

    // Build filters
    const filters = combineFilters(
      { status: 'APPROVED' }, // Only show approved doctors
      buildExactFilter('specializationId', params.specializationId),
      buildExactFilter('hospitalId', params.hospitalId),
      buildExactFilter('consultationType', params.consultationType),
      buildRangeFilter('consultationFee', params.minFee, params.maxFee),
      buildRangeFilter('yearsOfExperience', params.minExperience, params.maxExperience),
      buildRangeFilter('rating', params.minRating, undefined),
      params.gender ? { user: { gender: params.gender } } : {},
      params.language ? { languages: { has: params.language } } : {},
      params.cityId ? { hospital: { cityId: params.cityId } } : {},
      params.areaId ? { hospital: { areaId: params.areaId } } : {}
    );

    // Combine search and filters
    const where = combineSearchConditions(searchCondition, filters);

    // Build sort
    const allowedSortFields = [
      'rating',
      'yearsOfExperience',
      'consultationFee',
      'createdAt',
      'reviewsCount',
    ];
    const orderBy = buildOrderBy(params.sortBy, allowedSortFields, {
      field: 'rating',
      order: 'desc',
    });

    // Execute query
    const [doctors, total] = await Promise.all([
      doctorRepository.findMany(where, skip, take, orderBy),
      doctorRepository.count(where),
    ]);

    return createPaginatedResponse(doctors, page, limit, total);
  }

  /**
   * Get doctor public profile
   */
  async getDoctorProfile(doctorId: string) {
    const doctor = await doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    if (doctor.status !== 'APPROVED') {
      throw new Error(MESSAGES.DOCTOR_NOT_APPROVED);
    }

    return doctor;
  }

  /**
   * Get doctor profile by user ID (for doctor's own profile)
   */
  async getDoctorProfileByUserId(userId: string) {
    const doctor = await doctorRepository.findByUserId(userId);

    if (!doctor) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return doctor;
  }

  /**
   * Update doctor profile
   */
  async updateDoctorProfile(userId: string, data: any) {
    const doctor = await doctorRepository.findByUserId(userId);

    if (!doctor) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    // Update user basic info
    if (data.firstName || data.lastName || data.phoneNumber || data.gender || data.dateOfBirth || data.city) {
      await userRepository.update(userId, {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        city: data.city,
      });
    }

    // Update doctor profile
    const updateData: Prisma.DoctorProfileUpdateInput = {};
    
    if (data.qualification) updateData.qualification = data.qualification;
    if (data.specializationId) updateData.specialization = { connect: { id: data.specializationId } };
    if (data.yearsOfExperience !== undefined) updateData.yearsOfExperience = data.yearsOfExperience;
    if (data.consultationFee !== undefined) updateData.consultationFee = data.consultationFee;
    if (data.consultationType) updateData.consultationType = data.consultationType;
    if (data.hospitalId) updateData.hospital = { connect: { id: data.hospitalId } };
    if (data.hospitalName) updateData.hospitalName = data.hospitalName;
    if (data.languages) updateData.languages = data.languages;
    if (data.bio) updateData.bio = data.bio;

    const updatedDoctor = await doctorRepository.updateByUserId(userId, updateData);

    return updatedDoctor;
  }

  /**
   * Get all doctors (Admin only)
   */
  async getAllDoctors(params: any) {
    const { page, limit } = parsePaginationParams(params);
    const { skip, take } = getPaginationOptions(page, limit);

    // Build filters
    const where: any = {};
    
    if (params.status) {
      where.status = params.status;
    }

    if (params.specializationId) {
      where.specializationId = params.specializationId;
    }

    if (params.search) {
      where.OR = [
        ...buildSearchCondition(params.search, ['qualification', 'hospitalName', 'pmdcLicenseNumber']).OR,
        {
          user: buildSearchCondition(params.search, ['firstName', 'lastName', 'email', 'phoneNumber']),
        },
      ];
    }

    const orderBy = buildOrderBy(params.sortBy, ['createdAt', 'rating'], {
      field: 'createdAt',
      order: 'desc',
    });

    const [doctors, total] = await Promise.all([
      doctorRepository.findMany(where, skip, take, orderBy),
      doctorRepository.count(where),
    ]);

    return createPaginatedResponse(doctors, page, limit, total);
  }

  /**
   * Approve doctor (Admin only)
   */
  async approveDoctor(doctorId: string, adminId: string) {
    const doctor = await doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    if (doctor.status === 'APPROVED') {
      throw new Error('Doctor is already approved');
    }

    const approved = await doctorRepository.approve(doctorId, adminId);

    return approved;
  }

  /**
   * Reject doctor (Admin only)
   */
  async rejectDoctor(doctorId: string, reason: string) {
    const doctor = await doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    const rejected = await doctorRepository.reject(doctorId, reason);

    return rejected;
  }

  /**
   * Suspend doctor (Admin only)
   */
  async suspendDoctor(doctorId: string, reason: string) {
    const doctor = await doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    const suspended = await doctorRepository.suspend(doctorId, reason);

    return suspended;
  }

  /**
   * Block doctor (Admin only)
   */
  async blockDoctor(doctorId: string, reason: string) {
    const doctor = await doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    const blocked = await doctorRepository.block(doctorId, reason);

    return blocked;
  }

  /**
   * Get doctor statistics
   */
  async getDoctorStats() {
    const [total, approved, pending, rejected, suspended, blocked] = await Promise.all([
      doctorRepository.count({}),
      doctorRepository.count({ status: 'APPROVED' }),
      doctorRepository.count({ status: 'PENDING' }),
      doctorRepository.count({ status: 'REJECTED' }),
      doctorRepository.count({ status: 'SUSPENDED' }),
      doctorRepository.count({ status: 'BLOCKED' }),
    ]);

    return {
      total,
      approved,
      pending,
      rejected,
      suspended,
      blocked,
    };
  }
}

export default new DoctorService();
