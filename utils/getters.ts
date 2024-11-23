"use server";

import { prisma } from "./db";

export async function getTopic(topic_id) {
  return await prisma.topic.findFirst({
    where: {
      topic_id:Number(topic_id)
    },
  });
}
