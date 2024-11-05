-- DropForeignKey
ALTER TABLE "CheckedAnswers" DROP CONSTRAINT "CheckedAnswers_question_id_fkey";

-- DropForeignKey
ALTER TABLE "CheckedAnswers" DROP CONSTRAINT "CheckedAnswers_record_id_fkey";

-- DropForeignKey
ALTER TABLE "ExamAnswerRecord" DROP CONSTRAINT "ExamAnswerRecord_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "ExamQuestions" DROP CONSTRAINT "ExamQuestions_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "ExamQuestions" DROP CONSTRAINT "ExamQuestions_question_id_fkey";

-- DropForeignKey
ALTER TABLE "MockExam" DROP CONSTRAINT "MockExam_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_course_id_fkey";

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("topic_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockExam" ADD CONSTRAINT "MockExam_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamQuestions" ADD CONSTRAINT "ExamQuestions_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "MockExam"("exam_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamQuestions" ADD CONSTRAINT "ExamQuestions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAnswerRecord" ADD CONSTRAINT "ExamAnswerRecord_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "MockExam"("exam_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckedAnswers" ADD CONSTRAINT "CheckedAnswers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckedAnswers" ADD CONSTRAINT "CheckedAnswers_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "ExamAnswerRecord"("record_id") ON DELETE CASCADE ON UPDATE CASCADE;
