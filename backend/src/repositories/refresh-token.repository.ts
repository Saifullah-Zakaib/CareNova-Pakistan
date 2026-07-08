import { RefreshToken, Prisma } from '@prisma/client';
import prisma from '../config/database.config.js';
import { IRefreshTokenRepository } from '../interfaces/repository.interface.js';

class RefreshTokenRepository implements IRefreshTokenRepository {
  async create(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
    return prisma.refreshToken.create({ data });
  }

  async findById(id: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({ where: { id } });
  }

  async findOne(where: Prisma.RefreshTokenWhereInput): Promise<RefreshToken | null> {
    return prisma.refreshToken.findFirst({ where });
  }

  async findMany(where?: Prisma.RefreshTokenWhereInput): Promise<RefreshToken[]> {
    return prisma.refreshToken.findMany({ where });
  }

  async update(id: string, data: Prisma.RefreshTokenUpdateInput): Promise<RefreshToken> {
    return prisma.refreshToken.update({ where: { id }, data });
  }

  async delete(id: string): Promise<RefreshToken> {
    return prisma.refreshToken.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<RefreshToken> {
    throw new Error('Soft delete not implemented for RefreshToken');
  }

  async count(where?: Prisma.RefreshTokenWhereInput): Promise<number> {
    return prisma.refreshToken.count({ where });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    return prisma.refreshToken.findMany({
      where: { userId, isRevoked: false },
    });
  }

  async revokeToken(token: string): Promise<RefreshToken> {
    return prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true },
    });
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    });
  }

  async deleteExpiredTokens(): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }
}

export default new RefreshTokenRepository();
