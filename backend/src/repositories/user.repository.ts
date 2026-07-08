import { User, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';
import { IUserRepository } from '../interfaces/repository.interface.js';

class UserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        doctorProfile: true,
        patientProfile: true,
      },
    });
  }

  async findOne(where: Prisma.UserWhereInput): Promise<User | null> {
    return prisma.user.findFirst({
      where,
      include: {
        doctorProfile: true,
        patientProfile: true,
      },
    });
  }

  async findMany(where?: Prisma.UserWhereInput): Promise<User[]> {
    return prisma.user.findMany({
      where,
      include: {
        doctorProfile: true,
        patientProfile: true,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return prisma.user.count({ where });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: {
        doctorProfile: true,
        patientProfile: true,
      },
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { phoneNumber },
      include: {
        doctorProfile: true,
        patientProfile: true,
      },
    });
  }

  async findActiveUser(id: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        id,
        isActive: true,
        isBlocked: false,
        deletedAt: null,
      },
      include: {
        doctorProfile: true,
        patientProfile: true,
      },
    });
  }

  async updateLastLogin(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });
  }
}

export default new UserRepository();
