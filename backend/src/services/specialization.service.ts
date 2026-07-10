import specializationRepository from '../repositories/specialization.repository.js';
import { MESSAGES } from '../constants/index.js';

class SpecializationService {
  /**
   * Get all specializations
   */
  async getAllSpecializations() {
    const specializations = await specializationRepository.findAll({ isActive: true });
    return specializations;
  }

  /**
   * Get specialization by ID
   */
  async getSpecializationById(id: string) {
    const specialization = await specializationRepository.findById(id);

    if (!specialization) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return specialization;
  }

  /**
   * Get specialization by slug
   */
  async getSpecializationBySlug(slug: string) {
    const specialization = await specializationRepository.findBySlug(slug);

    if (!specialization) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return specialization;
  }

  /**
   * Create specialization (Admin only)
   */
  async createSpecialization(data: { name: string; slug: string; description?: string; icon?: string }) {
    const specialization = await specializationRepository.create(data);
    return specialization;
  }

  /**
   * Update specialization (Admin only)
   */
  async updateSpecialization(id: string, data: any) {
    const specialization = await specializationRepository.findById(id);

    if (!specialization) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    const updated = await specializationRepository.update(id, data);
    return updated;
  }

  /**
   * Delete specialization (Admin only)
   */
  async deleteSpecialization(id: string) {
    const specialization = await specializationRepository.findById(id);

    if (!specialization) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    await specializationRepository.delete(id);
    return { message: MESSAGES.DELETED };
  }
}

export default new SpecializationService();
