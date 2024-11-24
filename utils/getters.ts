"use server";

import { prisma } from "./db";

export async function getTopic(topic_id) {
  return await prisma.topic.findFirst({
    where: {
      topic_id: Number(topic_id),
    },
  });
}

export async function getBufferQuestionsForTopic(topic_id) {
  const questions = await prisma.bufferQuestions.findMany({
    where: {
      topic_id: Number(topic_id),
    },
    orderBy: {
      createdOn: "desc",
    },
  });

  return questions;
}
