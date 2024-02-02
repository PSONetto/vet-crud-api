/*
  Warnings:

  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_ownerId_fkey";

-- DropTable
DROP TABLE "Owner";

-- DropTable
DROP TABLE "Pet";

-- CreateTable
CREATE TABLE "owner" (
    "owner_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "alternative_phone_number" TEXT,
    "preferred_contact_method" TEXT NOT NULL,
    "id_number" TEXT,
    "driver_license_number" TEXT,
    "occupation" TEXT,
    "additional_notes" TEXT,
    "accept_updates" BOOLEAN NOT NULL,
    "accept_marketing" BOOLEAN NOT NULL,
    "refferal_source" TEXT,
    "authorization" BOOLEAN NOT NULL,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("owner_id")
);

-- CreateTable
CREATE TABLE "address" (
    "address_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "zip_code" VARCHAR(9),
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "pet" (
    "pet_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT,
    "age" INTEGER NOT NULL,
    "birth_date" TIMESTAMP(3),
    "sex" CHAR NOT NULL,
    "neutered_spayed" BOOLEAN NOT NULL,
    "color_marks" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "dietary_notes" TEXT,
    "behavioral_notes" TEXT,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("pet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "owner_email_address_key" ON "owner"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "owner_id_number_key" ON "owner"("id_number");

-- CreateIndex
CREATE UNIQUE INDEX "owner_driver_license_number_key" ON "owner"("driver_license_number");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
