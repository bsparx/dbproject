-- AlterTable
ALTER TABLE "CheckedAnswers" ALTER COLUMN "score" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ExamAnswerRecord" ADD COLUMN     "finalPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
