import { DoctorAvailability, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';

class DoctorAvailabilityRepository {
  async create(data: Prisma.DoctorAvailabilityCreateInput): Promise<DoctorAvailability> {
    return prisma.doctorAvailability.create({ data });
  }

  async findByDoctorId(doctorId: string): Promise<DoctorAvailability[]> {
    return prisma.doctorAvailability.findMany({
      where: { doctorId },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  async findOne(doctorId: string, dayOfWeek: string): Promise<DoctorAvailability | null> {
    return prisma.doctorAvailability.findUnique({
      where: {
        doctorId_dayOfWeek: {
          doctorId,
          dayOfWeek: dayOfWeek as any,
        },
      },
    });
  }

  async update(id: string, data: Prisma.DoctorAvailabilityUpdateInput): Promise<DoctorAvailability> {
    return prisma.doctorAvailability.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<DoctorAvailability> {
    return prisma.doctorAvailability.delete({
      where: { id },
    });
  }

  async deleteByDoctorId(doctorId: string): Promise<Prisma.BatchPayload> {
    return prisma.doctorAvailability.deleteMany({
      where: { doctorId },
    });
  }
}

export default new DoctorAvailabilityRepository();
