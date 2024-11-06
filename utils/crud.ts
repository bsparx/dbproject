"use server";

import { redirect } from "next/navigation";
import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/router";
import { analyze } from "./ai";

export async function createCourse(previousInput, formdata: FormData) {
  const { userId } = previousInput;
  const newCourse = await prisma.course.create({
    data: {
      name: formdata.get("name"),
      teacher_id: userId,
    },
  });

  revalidatePath(`course/${newCourse.course_id}`);

  return {
    userId: userId,
    message: "Added a new course successfully",
  };
}

export async function addTopic(previousInput, formdata: FormData) {
  const { courseId, message } = previousInput;
  const newTopic = await prisma.topic.create({
    data: {
      course_id: courseId,
      name: formdata.get("name"),
    },
  });
  revalidatePath(`/course/${courseId}`);
  return {
    courseId: courseId,
    message: "Sucessfully Created a new Course",
  };
}

export async function get5Courses() {
  const courses = await prisma.course.findMany({
    take: 5,
  });
  return courses;
}

export async function addQuestion(previousInput, formdata: FormData) {
  const { topic_id, courseId } = previousInput;
  const difficulty = Number(formdata.get("difficulty"));

  const newTopic = await prisma.question.create({
    data: {
      topic_id: Number(topic_id),
      text: formdata.get("text"),
      correct_answer: formdata.get("correct_answer"),
      difficulty: difficulty,
    },
  });
  revalidatePath(`/course/${courseId}/${topic_id}`);
  return {
    courseId: courseId,
    topic_id: topic_id,
    message: "Sucessfully Created a new Question",
  };
}

export async function editQuestion(previousInput, formdata: FormData) {
  const { question_id } = previousInput;
  const difficulty = Number(formdata.get("difficulty"));

  await prisma.question.update({
    where: {
      question_id: question_id,
    },
    data: {
      text: formdata.get("text"),
      correct_answer: formdata.get("correct_answer"),
      difficulty: difficulty,
    },
  });
  revalidatePath(`/question/${question_id}`);
  return {
    question_id: question_id,
    message: "Sucessfully updated the question!!",
  };
}

export async function deleteQuestion(previousInput, formdata) {
  const { question_id } = previousInput;
  const course = await prisma.question.findUnique({
    where: {
      question_id: question_id,
    },
    include: {
      topic: true,
    },
  });
  await prisma.question.delete({
    where: {
      question_id: question_id,
    },
  });
  revalidatePath(`/courses/${course?.topic.course_id}/${course?.topic_id}`);
  redirect(`/courses/${course?.topic.course_id}/${course?.topic_id}`);
}

export async function createExam(previousInput, formdata: FormData) {
  const { course_id } = previousInput;
  const newMock = await prisma.mockExam.create({
    data: {
      course_id: Number(course_id),
      name: formdata.get("name"),
      created_by: "teacher",
    },
  });
  revalidatePath(`/course/${Number(course_id)}`);
  redirect(`/quiz/${newMock.exam_id}`);
}

export async function getQuestionsFromTopic(topic_id) {
  const questions = await prisma.question.findMany({
    where: {
      topic_id: topic_id,
    },
  });

  return questions;
}

export async function addToExam(previousInput, formdata: FormData) {
  const { exam_id, question_id } = previousInput;

  const checkQuestion = await prisma.examQuestions.findFirst({
    where: {
      exam_id: Number(exam_id),
      question_id: Number(question_id),
    },
  });
  if (checkQuestion != null) {
    return {
      question_id: question_id,
      exam_id: exam_id,
      comment: "Can't have duplicates",
    };
  }

  const addedQuestion = await prisma.examQuestions.create({
    data: {
      exam_id: Number(exam_id),
      question_id: Number(question_id),
    },
  });

  const questions = await prisma.examQuestions.findMany({
    where: { exam_id: exam_id },
    include: {
      question: true,
    },
  });

  const totalDifficulty = questions.reduce(
    (sum, q) => sum + q.question.difficulty,
    0
  );
  const averageDifficulty = questions.length
    ? totalDifficulty / questions.length
    : 0;

  await prisma.mockExam.update({
    where: { exam_id: exam_id },
    data: {
      average_difficulty: averageDifficulty,
    },
  });
  revalidatePath(`/quiz/${exam_id}`);
  return {
    question_id: question_id,
    exam_id: exam_id,
    comment: "Sucessfully added a question",
  };
}

export async function getCurrentExamQuestions({ exam_id }) {
  const questions = await prisma.examQuestions.findMany({
    where: {
      exam_id: Number(exam_id),
    },
    include: {
      question: true,
    },
  });
  return questions;
}

export async function removeFromExam({ exam_id, question_id }) {
  // Remove the question from the exam
  await prisma.examQuestions.delete({
    where: {
      exam_id_question_id: {
        exam_id: Number(exam_id),
        question_id: Number(question_id),
      },
    },
  });

  const questions = await prisma.examQuestions.findMany({
    where: { exam_id: exam_id },
    include: {
      question: true,
    },
  });

  const totalDifficulty = questions.reduce(
    (sum, q) => sum + q.question.difficulty,
    0
  );
  const averageDifficulty = questions.length
    ? totalDifficulty / questions.length
    : 0;

  await prisma.mockExam.update({
    where: { exam_id: exam_id },
    data: {
      average_difficulty: averageDifficulty,
    },
  });

  revalidatePath(`/quiz/${exam_id}`);

  return {
    question_id: question_id,
    exam_id: exam_id,
    comment: "Successfully removed the question",
  };
}

export async function registerForCourse(previousInput, formdata: FormData) {
  const { course_id, student_id } = previousInput;

  const count = await prisma.enrollment.count({
    where: {
      student_id: student_id,
    },
  });
  if (count >= 5) {
    return {
      course_id,
      student_id,
      message: "Sorry, you can only register for 5 courses",
    };
  }

  const newEnrolment = await prisma.enrollment.create({
    data: {
      course_id,
      student_id,
    },
  });
  console.log("Created a newEnrolment", newEnrolment);
  redirect(`/courses/${Number(course_id)}`);
}

export async function makeExamAnswerRecord(previousInput, formdata: FormData) {
  const { exam_id, student_id } = previousInput;
  const createNewExamAnswerRecord = await prisma.examAnswerRecord.create({
    data: {
      exam_id: Number(exam_id),
      student_id: Number(student_id),
    },
  });
  redirect(`/exams/${createNewExamAnswerRecord.record_id}`);
}

export async function gradeTheExam(previousInput, formdata: FormData) {
  const { record_id, ExamQuestions } = previousInput;
  console.log(formdata);
  for (let question of ExamQuestions) {
    const analysis = await analyze(
      `This is the question:${
        question.question.text
      },\nThis is the correct answer: ${
        question.question.correct_answer
      },\nthis is what the student answered ${formdata.get(
        `${question.question_id}answer`
      )}`
    );

    const checkAnswer = await prisma.checkedAnswers.create({
      data: {
        record_id: record_id,
        question_id: question.question_id,
        student_answer: formdata.get(`${question.question_id}answer`),
        score: analysis.score,
        comments: analysis.comments,
      },
    });
  }
  redirect(`/exams/${record_id}/finalGrade`);
}

export async function getQuestion(question_id) {
  const question = await prisma.question.findUnique({
    where: {
      question_id: question_id,
    },
  });
  return question;
}
