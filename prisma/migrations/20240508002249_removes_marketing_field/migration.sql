/*
  Warnings:

  - You are about to drop the column `accept_marketing` on the `owner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "owner" DROP COLUMN "accept_marketing";

-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "sex" SET DATA TYPE CHAR;
