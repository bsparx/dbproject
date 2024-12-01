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

export async function getTopics(topic_id) {
  const topic = await prisma.topic.findMany({
    where: {
      course_id: Number(topic_id),
    },
    include: {
      questions: true,
    },
  });

  return topic;
}

export async function getUserExams(user_id) {
  const Exams = await prisma.mockExam.findMany({
    where: {
      student_id: user_id,
      created_by: "system",
    },
    orderBy: {
      date: "desc",
    },
  });
  return Exams;
}

export async function get5UserExams(user_id) {
  const Exams = await prisma.mockExam.findMany({
    where: {
      student_id: user_id,
      created_by: "system",
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  });
  return Exams;
}

export async function get5Reports(user_id) {
  const records = await prisma.examAnswerRecord.findMany({
    where: {
      student_id: user_id,
      Status: "completed",
    },
    orderBy: {
      updated: "desc",
    },
    take: 5,
    include: {
      exam: {
        include: {
          course: true,
        },
      },
    },
  });
  return records;
}

export async function getTeacherCourses(user_id) {
  const courses = await prisma.course.findMany({
    where: {
      teacher_id: user_id,
    },
    take: 5,
  });
  return courses;
}


export async function getAllUserCourses(user_id) {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      student_id: user_id,
    },
    include: {
      course: true,
    },
  });
  const courses = enrollments.map((enrollment) => enrollment.course);

  return courses;
}
