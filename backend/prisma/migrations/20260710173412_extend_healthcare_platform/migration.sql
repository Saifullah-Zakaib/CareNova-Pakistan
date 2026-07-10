/*
  Warnings:

  - You are about to drop the column `specialization` on the `doctor_profiles` table. All the data in the column will be lost.
  - The `bloodGroup` column on the `patient_profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allergies` column on the `patient_profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ConsultationType" AS ENUM ('ONLINE', 'PHYSICAL', 'BOTH');

-- CreateEnum
CREATE TYPE "HospitalType" AS ENUM ('GOVERNMENT', 'PRIVATE', 'SEMI_GOVERNMENT', 'CHARITABLE');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DoctorStatus" ADD VALUE 'SUSPENDED';
ALTER TYPE "DoctorStatus" ADD VALUE 'BLOCKED';

-- DropIndex
DROP INDEX "doctor_profiles_specialization_idx";

-- AlterTable
ALTER TABLE "doctor_profiles" DROP COLUMN "specialization",
ADD COLUMN     "consultationType" "ConsultationType" NOT NULL DEFAULT 'BOTH',
ADD COLUMN     "hospitalId" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "reviewsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "specializationId" TEXT;

-- AlterTable
ALTER TABLE "patient_profiles" ADD COLUMN     "address" TEXT,
ADD COLUMN     "alcohol" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "areaId" TEXT,
ADD COLUMN     "chronicDiseases" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Pakistan',
ADD COLUMN     "currentMedications" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "emergencyContactName" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "emergencyContactRelation" TEXT,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "medicalHistory" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "smoking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weight" DOUBLE PRECISION,
DROP COLUMN "bloodGroup",
ADD COLUMN     "bloodGroup" "BloodGroup",
DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specializations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "HospitalType" NOT NULL DEFAULT 'PRIVATE',
    "address" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "areaId" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "email" TEXT,
    "logo" TEXT,
    "description" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "emergencyAvailable" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_availability" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "breakStartTime" TEXT,
    "breakEndTime" TEXT,
    "maxPatients" INTEGER NOT NULL DEFAULT 20,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_education" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Pakistan',
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_experience" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_doctors" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_doctors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cities_slug_key" ON "cities"("slug");

-- CreateIndex
CREATE INDEX "cities_slug_idx" ON "cities"("slug");

-- CreateIndex
CREATE INDEX "areas_cityId_idx" ON "areas"("cityId");

-- CreateIndex
CREATE INDEX "areas_slug_idx" ON "areas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "areas_cityId_slug_key" ON "areas"("cityId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "specializations_name_key" ON "specializations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "specializations_slug_key" ON "specializations"("slug");

-- CreateIndex
CREATE INDEX "specializations_slug_idx" ON "specializations"("slug");

-- CreateIndex
CREATE INDEX "hospitals_cityId_idx" ON "hospitals"("cityId");

-- CreateIndex
CREATE INDEX "hospitals_areaId_idx" ON "hospitals"("areaId");

-- CreateIndex
CREATE INDEX "hospitals_type_idx" ON "hospitals"("type");

-- CreateIndex
CREATE INDEX "hospitals_rating_idx" ON "hospitals"("rating");

-- CreateIndex
CREATE INDEX "doctor_availability_doctorId_idx" ON "doctor_availability"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_availability_doctorId_dayOfWeek_key" ON "doctor_availability"("doctorId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "doctor_education_doctorId_idx" ON "doctor_education"("doctorId");

-- CreateIndex
CREATE INDEX "doctor_experience_doctorId_idx" ON "doctor_experience"("doctorId");

-- CreateIndex
CREATE INDEX "favorite_doctors_patientId_idx" ON "favorite_doctors"("patientId");

-- CreateIndex
CREATE INDEX "favorite_doctors_doctorId_idx" ON "favorite_doctors"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_doctors_patientId_doctorId_key" ON "favorite_doctors"("patientId", "doctorId");

-- CreateIndex
CREATE INDEX "doctor_profiles_specializationId_idx" ON "doctor_profiles"("specializationId");

-- CreateIndex
CREATE INDEX "doctor_profiles_hospitalId_idx" ON "doctor_profiles"("hospitalId");

-- CreateIndex
CREATE INDEX "doctor_profiles_rating_idx" ON "doctor_profiles"("rating");

-- CreateIndex
CREATE INDEX "patient_profiles_areaId_idx" ON "patient_profiles"("areaId");

-- AddForeignKey
ALTER TABLE "patient_profiles" ADD CONSTRAINT "patient_profiles_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_profiles" ADD CONSTRAINT "doctor_profiles_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_profiles" ADD CONSTRAINT "doctor_profiles_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areas" ADD CONSTRAINT "areas_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospitals" ADD CONSTRAINT "hospitals_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_availability" ADD CONSTRAINT "doctor_availability_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_education" ADD CONSTRAINT "doctor_education_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_experience" ADD CONSTRAINT "doctor_experience_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_doctors" ADD CONSTRAINT "favorite_doctors_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_doctors" ADD CONSTRAINT "favorite_doctors_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
