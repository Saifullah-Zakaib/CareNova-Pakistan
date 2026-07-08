export interface IRepository<T> {
  create(data: any): Promise<T>;
  findById(id: string): Promise<T | null>;
  findOne(where: any): Promise<T | null>;
  findMany(where?: any): Promise<T[]>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
  softDelete(id: string): Promise<T>;
  count(where?: any): Promise<number>;
}

export interface IUserRepository extends IRepository<any> {
  findByEmail(email: string): Promise<any | null>;
  findByPhoneNumber(phoneNumber: string): Promise<any | null>;
  findActiveUser(id: string): Promise<any | null>;
}

export interface IDoctorRepository extends IRepository<any> {
  findByPmdcLicense(pmdcLicenseNumber: string): Promise<any | null>;
  findPendingDoctors(): Promise<any[]>;
  findApprovedDoctors(): Promise<any[]>;
  updateStatus(id: string, status: string, reason?: string): Promise<any>;
}

export interface IRefreshTokenRepository extends IRepository<any> {
  findByToken(token: string): Promise<any | null>;
  findByUserId(userId: string): Promise<any[]>;
  revokeToken(token: string): Promise<any>;
  revokeAllUserTokens(userId: string): Promise<void>;
  deleteExpiredTokens(): Promise<void>;
}

export interface IEmailVerificationRepository extends IRepository<any> {
  findValidToken(token: string): Promise<any | null>;
  markAsUsed(id: string): Promise<any>;
  deleteExpiredTokens(): Promise<void>;
}

export interface IPasswordResetRepository extends IRepository<any> {
  findValidToken(token: string): Promise<any | null>;
  markAsUsed(id: string): Promise<any>;
  deleteExpiredTokens(): Promise<void>;
  invalidateUserTokens(userId: string): Promise<void>;
}
