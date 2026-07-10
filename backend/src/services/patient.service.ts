import { Prisma } from '@prisma/client';
import patientRepository from '../repositories/patient.repository.js';
import userRepository from '../repositories/user.repository.js';
import { parsePaginationParams, createPaginatedResponse, getPaginationOptions } from '../utils/pagination.util.js';
import { buildSearchCondition } from '../utils/search.util.js';
import { buildExactFilter, combineFilters } from '../utils/filter.util.js';
import { buildOrderBy } from '../utils/sort.util.js';
import { MESSAGES } from '../constants/index.js';

class PatientService {
  /**
   * Get patient profile by user ID
   */
  async getPatientProfileByUserId(userId: string) {
    const patient = await patientRepository.findByUserId(userId);

    if (!patient) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return patient;
  }

  /**
   * Get patient profile by ID (Admin only)
   */
  async getPatientProfile(patientId: string) {
    const patient = await patientRepository.findById(patientId);

    if (!patient) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return patient;
  }

  /**
   * Update patient profile
   */
  async updatePatientProfile(userId: string, data: any) {
    const patient = await patientRepository.findByUserId(userId);

    if (!patient) {
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

    // Update patient profile
    const updateData: Prisma.PatientProfileUpdateInput = {};

    if (data.bloodGroup) updateData.bloodGroup = data.bloodGroup;
    if (data.height !== undefined) updateData.height = data.height;
    if (data.weight !== undefined) updateData.weight = data.weight;
    if (data.allergies) updateData.allergies = data.allergies;
    if (data.chronicDiseases) updateData.chronicDiseases = data.chronicDiseases;
    if (data.currentMedications) updateData.currentMedications = data.currentMedications;
    if (data.medicalHistory) updateData.medicalHistory = data.medicalHistory;
    if (data.smoking !== undefined) updateData.smoking = data.smoking;
    if (data.alcohol !== undefined) updateData.alcohol = data.alcohol;
    if (data.emergencyContactName) updateData.emergencyContactName = data.emergencyContactName;
    if (data.emergencyContactPhone) updateData.emergencyContactPhone = data.emergencyContactPhone;
    if (data.emergencyContactRelation) updateData.emergencyContactRelation = data.emergencyContactRelation;
    if (data.address) updateData.address = data.address;
    if (data.areaId) updateData.area = { connect: { id: data.areaId } };
    if (data.postalCode) updateData.postalCode = data.postalCode;
    if (data.country) updateData.country = data.country;

    const updatedPatient = await patientRepository.updateByUserId(userId, updateData);

    return updatedPatient;
  }

  /**
   * Get all patients (Admin only)
   */
  async getAllPatients(params: any) {
    const { page, limit } = parsePaginationParams(params);
    const { skip, take } = getPaginationOptions(page, limit);

    // Build filters
    const where: any = {};

    if (params.bloodGroup) {
      where.bloodGroup = params.bloodGroup;
    }

    if (params.gender) {
      where.user = { gender: params.gender };
    }

    if (params.city) {
      where.user = { ...where.user, city: params.city };
    }

    if (params.search) {
      where.OR = [
        {
          user: buildSearchCondition(params.search, ['firstName', 'lastName', 'email', 'phoneNumber']),
        },
      ];
    }

    const orderBy = buildOrderBy(params.sortBy, ['createdAt'], {
      field: 'createdAt',
      order: 'desc',
    });

    const [patients, total] = await Promise.all([
      patientRepository.findMany(where, skip, take, orderBy),
      patientRepository.count(where),
    ]);

    return createPaginatedResponse(patients, page, limit, total);
  }

  /**
   * Delete patient profile (Admin only)
   */
  async deletePatient(patientId: string) {
    const patient = await patientRepository.findById(patientId);

    if (!patient) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    // Soft delete user (cascade will handle patient profile)
    await userRepository.softDelete(patient.userId);

    return { message: MESSAGES.DELETED };
  }

  /**
   * Get patient statistics
   */
  async getPatientStats() {
    const total = await patientRepository.count({});

    return {
      total,
    };
  }
}

export default new PatientService();
