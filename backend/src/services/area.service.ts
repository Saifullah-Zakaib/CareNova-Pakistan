import areaRepository from '../repositories/area.repository.js';
import { MESSAGES } from '../constants/index.js';

class AreaService {
  /**
   * Get all areas
   */
  async getAllAreas(cityId?: string) {
    const where = cityId ? { cityId, isActive: true } : { isActive: true };
    const areas = await areaRepository.findAll(where);
    return areas;
  }

  /**
   * Get areas by city ID
   */
  async getAreasByCity(cityId: string) {
    const areas = await areaRepository.findByCityId(cityId);
    return areas;
  }

  /**
   * Get area by ID
   */
  async getAreaById(id: string) {
    const area = await areaRepository.findById(id);

    if (!area) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return area;
  }

  /**
   * Create area (Admin only)
   */
  async createArea(data: { name: string; slug: string; cityId: string }) {
    const area = await areaRepository.create({
      name: data.name,
      slug: data.slug,
      city: {
        connect: { id: data.cityId },
      },
    });
    return area;
  }

  /**
   * Update area (Admin only)
   */
  async updateArea(id: string, data: any) {
    const area = await areaRepository.findById(id);

    if (!area) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    const updated = await areaRepository.update(id, data);
    return updated;
  }

  /**
   * Delete area (Admin only)
   */
  async deleteArea(id: string) {
    const area = await areaRepository.findById(id);

    if (!area) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    await areaRepository.delete(id);
    return { message: MESSAGES.DELETED };
  }
}

export default new AreaService();
