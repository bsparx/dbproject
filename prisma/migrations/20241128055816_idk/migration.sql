-- AlterTable
ALTER TABLE "MockExam" ADD COLUMN     "student_id" INTEGER;

-- AddForeignKey
ALTER TABLE "MockExam" ADD CONSTRAINT "MockExam_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
