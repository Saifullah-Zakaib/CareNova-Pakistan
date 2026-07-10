import { Specialization, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class SpecializationRepository {
  async findAll(where?: Prisma.SpecializationWhereInput): Promise<Specialization[]> {
    return prisma.specialization.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<Specialization | null> {
    return prisma.specialization.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<Specialization | null> {
    return prisma.specialization.findUnique({
      where: { slug },
    });
  }

  async create(data: Prisma.SpecializationCreateInput): Promise<Specialization> {
    return prisma.specialization.create({ data });
  }

  async update(id: string, data: Prisma.SpecializationUpdateInput): Promise<Specialization> {
    return prisma.specialization.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Specialization> {
    return prisma.specialization.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.SpecializationWhereInput): Promise<number> {
    return prisma.specialization.count({ where });
  }
}

export default new SpecializationRepository();
