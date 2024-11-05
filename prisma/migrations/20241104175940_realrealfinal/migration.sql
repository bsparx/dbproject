/*
  Warnings:

  - You are about to drop the column `student_id` on the `MockExam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MockExam" DROP CONSTRAINT "MockExam_student_id_fkey";

-- AlterTable
ALTER TABLE "MockExam" DROP COLUMN "student_id";
