import { Area, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class AreaRepository {
  async findAll(where?: Prisma.AreaWhereInput): Promise<Area[]> {
    return prisma.area.findMany({
      where,
      include: {
        city: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findByCityId(cityId: string): Promise<Area[]> {
    return prisma.area.findMany({
      where: { cityId, isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<Area | null> {
    return prisma.area.findUnique({
      where: { id },
      include: {
        city: true,
      },
    });
  }

  async findBySlug(slug: string, cityId: string): Promise<Area | null> {
    return prisma.area.findUnique({
      where: { cityId_slug: { cityId, slug } },
      include: {
        city: true,
      },
    });
  }

  async create(data: Prisma.AreaCreateInput): Promise<Area> {
    return prisma.area.create({ data });
  }

  async update(id: string, data: Prisma.AreaUpdateInput): Promise<Area> {
    return prisma.area.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Area> {
    return prisma.area.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.AreaWhereInput): Promise<number> {
    return prisma.area.count({ where });
  }
}

export default new AreaRepository();
