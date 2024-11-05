/*
  Warnings:

  - You are about to alter the column `difficulty` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "difficulty" SET DEFAULT 10,
ALTER COLUMN "difficulty" SET DATA TYPE INTEGER;
