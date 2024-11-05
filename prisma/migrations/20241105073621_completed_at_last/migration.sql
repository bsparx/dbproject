-- DropIndex
DROP INDEX "CheckedAnswers_record_id_question_id_key";

-- AlterTable
ALTER TABLE "CheckedAnswers" ADD COLUMN     "results_id" SERIAL NOT NULL,
ADD CONSTRAINT "CheckedAnswers_pkey" PRIMARY KEY ("results_id");
