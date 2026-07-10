import { Hospital, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class HospitalRepository {
  async create(data: Prisma.HospitalCreateInput): Promise<Hospital> {
    return prisma.hospital.create({ data });
  }

  async findById(id: string): Promise<Hospital | null> {
    return prisma.hospital.findUnique({
      where: { id },
      include: {
        city: true,
        area: true,
        doctors: {
          where: { status: 'APPROVED' },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
            specialization: true,
          },
        },
      },
    });
  }

  async findMany(
    where?: Prisma.HospitalWhereInput,
    skip?: number,
    take?: number,
    orderBy?: Prisma.HospitalOrderByWithRelationInput
  ): Promise<Hospital[]> {
    return prisma.hospital.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        city: true,
        area: true,
        _count: {
          select: {
            doctors: {
              where: { status: 'APPROVED' },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.HospitalUpdateInput): Promise<Hospital> {
    return prisma.hospital.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Hospital> {
    return prisma.hospital.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.HospitalWhereInput): Promise<number> {
    return prisma.hospital.count({ where });
  }
}

export default new HospitalRepository();
