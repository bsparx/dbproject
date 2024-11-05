/*
  Warnings:

  - You are about to drop the column `comments` on the `ExamAnswerRecord` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `ExamAnswerRecord` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `ExamAnswerRecord` table. All the data in the column will be lost.
  - You are about to drop the column `student_answer` on the `ExamAnswerRecord` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExamAnswerRecord" DROP CONSTRAINT "ExamAnswerRecord_question_id_fkey";

-- AlterTable
ALTER TABLE "ExamAnswerRecord" DROP COLUMN "comments",
DROP COLUMN "question_id",
DROP COLUMN "score",
DROP COLUMN "student_answer";

-- CreateTable
CREATE TABLE "ExamQuestions" (
    "exam_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CheckedAnswers" (
    "record_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "student_answer" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 1,
    "comments" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "ExamQuestions_exam_id_question_id_key" ON "ExamQuestions"("exam_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "CheckedAnswers_record_id_question_id_key" ON "CheckedAnswers"("record_id", "question_id");

-- AddForeignKey
ALTER TABLE "ExamQuestions" ADD CONSTRAINT "ExamQuestions_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "MockExam"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamQuestions" ADD CONSTRAINT "ExamQuestions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckedAnswers" ADD CONSTRAINT "CheckedAnswers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckedAnswers" ADD CONSTRAINT "CheckedAnswers_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "ExamAnswerRecord"("record_id") ON DELETE RESTRICT ON UPDATE CASCADE;
