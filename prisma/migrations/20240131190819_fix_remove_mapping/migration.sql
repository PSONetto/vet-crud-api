/*
  Warnings:

  - You are about to drop the column `authorization` on the `owner` table. All the data in the column will be lost.
  - Added the required column `treatment_authorization` to the `owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "owner" DROP COLUMN "authorization",
ADD COLUMN     "treatment_authorization" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "sex" SET DATA TYPE CHAR;
