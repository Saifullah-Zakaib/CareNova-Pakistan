import { City, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class CityRepository {
  async findAll(where?: Prisma.CityWhereInput): Promise<City[]> {
    return prisma.city.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<City | null> {
    return prisma.city.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<City | null> {
    return prisma.city.findUnique({
      where: { slug },
    });
  }

  async create(data: Prisma.CityCreateInput): Promise<City> {
    return prisma.city.create({ data });
  }

  async update(id: string, data: Prisma.CityUpdateInput): Promise<City> {
    return prisma.city.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<City> {
    return prisma.city.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.CityWhereInput): Promise<number> {
    return prisma.city.count({ where });
  }
}

export default new CityRepository();
