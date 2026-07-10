import cityRepository from '../repositories/city.repository.js';
import { MESSAGES } from '../constants/index.js';

class CityService {
  /**
   * Get all cities
   */
  async getAllCities() {
    const cities = await cityRepository.findAll({ isActive: true });
    return cities;
  }

  /**
   * Get city by ID
   */
  async getCityById(id: string) {
    const city = await cityRepository.findById(id);

    if (!city) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return city;
  }

  /**
   * Get city by slug
   */
  async getCityBySlug(slug: string) {
    const city = await cityRepository.findBySlug(slug);

    if (!city) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    return city;
  }

  /**
   * Create city (Admin only)
   */
  async createCity(data: { name: string; slug: string }) {
    const city = await cityRepository.create(data);
    return city;
  }

  /**
   * Update city (Admin only)
   */
  async updateCity(id: string, data: any) {
    const city = await cityRepository.findById(id);

    if (!city) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    const updated = await cityRepository.update(id, data);
    return updated;
  }

  /**
   * Delete city (Admin only)
   */
  async deleteCity(id: string) {
    const city = await cityRepository.findById(id);

    if (!city) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    await cityRepository.delete(id);
    return { message: MESSAGES.DELETED };
  }
}

export default new CityService();
