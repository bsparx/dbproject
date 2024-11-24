-- CreateTable
CREATE TABLE "BufferQuestions" (
    "question_id" SERIAL NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 5,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BufferQuestions_pkey" PRIMARY KEY ("question_id")
);

-- AddForeignKey
ALTER TABLE "BufferQuestions" ADD CONSTRAINT "BufferQuestions_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("topic_id") ON DELETE CASCADE ON UPDATE CASCADE;
