/*
  Warnings:

  - You are about to drop the column `behavioral_notes` on the `pet` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `pet` table. All the data in the column will be lost.
  - You are about to drop the column `color_marks` on the `pet` table. All the data in the column will be lost.
  - You are about to alter the column `weight` on the `pet` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "pet" DROP COLUMN "behavioral_notes",
DROP COLUMN "birth_date",
DROP COLUMN "color_marks",
ALTER COLUMN "sex" SET DATA TYPE CHAR,
ALTER COLUMN "weight" SET DATA TYPE INTEGER;
