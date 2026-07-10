import favoriteDoctorRepository from '../repositories/favorite-doctor.repository.js';
import patientRepository from '../repositories/patient.repository.js';
import doctorRepository from '../repositories/doctor.repository.js';
import { parsePaginationParams, createPaginatedResponse, getPaginationOptions } from '../utils/pagination.util.js';
import { MESSAGES } from '../constants/index.js';

class FavoriteDoctorService {
  /**
   * Add doctor to favorites
   */
  async addFavoriteDoctor(userId: string, doctorId: string) {
    // Get patient profile
    const patient = await patientRepository.findByUserId(userId);
    if (!patient) {
      throw new Error('Patient profile not found');
    }

    // Check if doctor exists and is approved
    const doctor = await doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    if (doctor.status !== 'APPROVED') {
      throw new Error('Doctor is not approved');
    }

    // Check if already favorited
    const existing = await favoriteDoctorRepository.exists(patient.id, doctorId);
    if (existing) {
      throw new Error('Doctor already in favorites');
    }

    // Add to favorites
    const favorite = await favoriteDoctorRepository.create({
      patient: {
        connect: { id: patient.id },
      },
      doctor: {
        connect: { id: doctorId },
      },
    });

    return favorite;
  }

  /**
   * Remove doctor from favorites
   */
  async removeFavoriteDoctor(userId: string, doctorId: string) {
    // Get patient profile
    const patient = await patientRepository.findByUserId(userId);
    if (!patient) {
      throw new Error('Patient profile not found');
    }

    // Check if favorited
    const existing = await favoriteDoctorRepository.exists(patient.id, doctorId);
    if (!existing) {
      throw new Error('Doctor not in favorites');
    }

    // Remove from favorites
    await favoriteDoctorRepository.delete(patient.id, doctorId);

    return { message: 'Doctor removed from favorites' };
  }

  /**
   * Get favorite doctors
   */
  async getFavoriteDoctors(userId: string, params: any) {
    // Get patient profile
    const patient = await patientRepository.findByUserId(userId);
    if (!patient) {
      throw new Error('Patient profile not found');
    }

    const { page, limit } = parsePaginationParams(params);
    const { skip, take } = getPaginationOptions(page, limit);

    const [favorites, total] = await Promise.all([
      favoriteDoctorRepository.findByPatientId(patient.id, skip, take),
      favoriteDoctorRepository.count(patient.id),
    ]);

    return createPaginatedResponse(favorites, page, limit, total);
  }

  /**
   * Check if doctor is favorited
   */
  async isFavorited(userId: string, doctorId: string) {
    // Get patient profile
    const patient = await patientRepository.findByUserId(userId);
    if (!patient) {
      return false;
    }

    const isFavorited = await favoriteDoctorRepository.exists(patient.id, doctorId);

    return { isFavorited };
  }
}

export default new FavoriteDoctorService();
