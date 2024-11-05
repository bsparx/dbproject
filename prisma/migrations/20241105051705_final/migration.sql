-- CreateEnum
CREATE TYPE "Status" AS ENUM ('completed', 'incomplete');

-- DropForeignKey
ALTER TABLE "ExamAnswerRecord" DROP CONSTRAINT "ExamAnswerRecord_student_id_fkey";

-- AlterTable
ALTER TABLE "ExamAnswerRecord" ADD COLUMN     "Status" "Status" NOT NULL DEFAULT 'incomplete';

-- AddForeignKey
ALTER TABLE "ExamAnswerRecord" ADD CONSTRAINT "ExamAnswerRecord_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
