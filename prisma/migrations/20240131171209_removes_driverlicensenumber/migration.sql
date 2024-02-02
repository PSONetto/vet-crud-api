/*
  Warnings:

  - You are about to drop the column `driver_license_number` on the `owner` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "owner_driver_license_number_key";

-- AlterTable
ALTER TABLE "owner" DROP COLUMN "driver_license_number";

-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "sex" SET DATA TYPE CHAR;
