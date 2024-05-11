/*
  Warnings:

  - You are about to drop the column `id_number` on the `owner` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `owner` table. All the data in the column will be lost.
  - You are about to drop the column `preferred_contact_method` on the `owner` table. All the data in the column will be lost.
  - You are about to drop the column `referral_source` on the `owner` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "owner_id_number_key";

-- AlterTable
ALTER TABLE "owner" DROP COLUMN "id_number",
DROP COLUMN "occupation",
DROP COLUMN "preferred_contact_method",
DROP COLUMN "referral_source";

-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "sex" SET DATA TYPE CHAR;
