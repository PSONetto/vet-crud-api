/*
  Warnings:

  - You are about to drop the column `ownerId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `refferal_source` on the `owner` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `pet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[onwer_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `pet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `onwer_id` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_ownerId_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "ownerId",
ADD COLUMN     "onwer_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "owner" DROP COLUMN "refferal_source",
ADD COLUMN     "referral_source" TEXT;

-- AlterTable
ALTER TABLE "pet" DROP COLUMN "ownerId",
ADD COLUMN     "owner_id" INTEGER NOT NULL,
ALTER COLUMN "sex" SET DATA TYPE CHAR;

-- CreateIndex
CREATE UNIQUE INDEX "address_onwer_id_key" ON "address"("onwer_id");

-- CreateIndex
CREATE UNIQUE INDEX "pet_owner_id_key" ON "pet"("owner_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_onwer_id_fkey" FOREIGN KEY ("onwer_id") REFERENCES "owner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
