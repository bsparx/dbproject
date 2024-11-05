/*
  Warnings:

  - Added the required column `name` to the `MockExam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MockExam" ADD COLUMN     "name" TEXT NOT NULL;
