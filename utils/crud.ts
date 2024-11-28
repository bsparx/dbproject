"use server";

import { redirect } from "next/navigation";
import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/router";
import { analyze } from "./ai";
import { getGeneratedQuestionJson } from "./generateQuestions";
import { getUser } from "./user";

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
  const checkIfItExists = await prisma.examAnswerRecord.findFirst({
    where: {
      exam_id: Number(exam_id),
      student_id: Number(student_id),
      Status: "incomplete",
    },
  });
  if (checkIfItExists) {
    redirect(`/exams/${checkIfItExists.record_id}`);
  }
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

  let totalScore = 0;
  for (let question of ExamQuestions) {
    const analysis = await analyze(
      `This is the question:${
        question.question.text
      },\nThis is the correct answer, compare this to the student's answer.: ${
        question.question.correct_answer
      },The correct answer ends here. The rest is the answer written by the student:\nthis is what the student answered ${formdata.get(
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
    totalScore = totalScore + analysis.score;
  }
  const averageScore = (totalScore / ExamQuestions.length) * 10;

  await prisma.examAnswerRecord.update({
    where: {
      record_id: record_id,
    },
    data: {
      Status: "completed",
      finalPercentage: averageScore,
    },
  });
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

export async function addContentToTopic(previousInput, formdata: FormData) {
  const { topicId } = previousInput;

  const content = formdata.get("content");
  const value = await prisma.topic.update({
    where: {
      topic_id: Number(topicId),
    },
    data: {
      contentString: formdata.get("content"),
    },
  });

  redirect(`/courses/${value.course_id}/${value.topic_id}/generateQuestions`);
  return {
    topicId,
    message: "Succesfully added content",
  };
}

export async function generateQuestion(previousInput, formdata: FormData) {
  console.log(previousInput, formdata);
  const questions = await prisma.question.findMany({
    where: {
      topic_id: Number(previousInput.topicId),
    },
  });
  const bufferQuestions = await prisma.bufferQuestions.findMany({
    where: {
      topic_id: Number(previousInput.topicId),
    },
  });
  const topic = await prisma.topic.findFirst({
    where: {
      topic_id: Number(previousInput.topicId),
    },
  });
  const prompt = `This is the content:${topic?.contentString}.\n
  These questions have already been added: ${questions.map((e, index) => {
    return `${index}: ${e.text} \n`;
  })} ${
    bufferQuestions &&
    bufferQuestions.map((e, index) => {
      return `${index}: ${e.text} \n`;
    })
  }  
  This is the users prompt; ${formdata.get("input")}
  `;
  const data = await getGeneratedQuestionJson(prompt);
  await prisma.bufferQuestions.create({
    data: {
      topic_id: Number(previousInput.topicId),
      text: data.question,
      correct_answer: data.markingScheme,
      difficulty: data.difficulty,
    },
  });
  revalidatePath(
    `/courses/${previousInput.id}/${previousInput.topicId}/generateQuestions`
  );
  return {
    topicId: previousInput.topicId,
    comment: "Question successfully generated",
    id: previousInput.id,
  };
}

export async function addBufferQuestionToBank(previousInput) {
  const data = await prisma.bufferQuestions.delete({
    where: {
      question_id: previousInput.bufferQuestion.question_id,
    },
  });
  await prisma.question.create({
    data: {
      topic_id: previousInput.bufferQuestion.topic_id,
      text: previousInput.bufferQuestion.text,
      correct_answer: previousInput.bufferQuestion.correct_answer,
      difficulty: previousInput.bufferQuestion.difficulty,
    },
  });
  revalidatePath(
    `/courses/${previousInput.id}/${previousInput.bufferQuestion.topic_id}/generateQuestions`
  );
}

export async function deleteBufferQuestion(previousInput) {
  const data = await prisma.bufferQuestions.delete({
    where: {
      question_id: previousInput.bufferQuestion.question_id,
    },
  });
  revalidatePath(
    `/courses/${previousInput.id}/${previousInput.bufferQuestion.topic_id}/generateQuestions`
  );
  return {
    id: previousInput.id,
    bufferQuestion: previousInput.bufferQuestion,
    comment: "Deleted",
  };
}

export async function editBufferQuestion(previousInput, formdata: FormData) {
  const { question_id } = previousInput;
  const difficulty = Number(formdata.get("difficulty"));

  await prisma.bufferQuestions.update({
    where: {
      question_id: question_id,
    },
    data: {
      text: formdata.get("text"),
      correct_answer: formdata.get("correct_answer"),
      difficulty: difficulty,
    },
  });
  revalidatePath(`/bufferquestion/${question_id}`);
  return {
    question_id: question_id,
    message: "Sucessfully updated the question!!",
  };
}

export async function deleteBufferInEdit(previousInput) {
  const { question_id } = previousInput;
  const course = await prisma.bufferQuestions.findUnique({
    where: {
      question_id: question_id,
    },
    include: {
      topic: true,
    },
  });
  await prisma.bufferQuestions.delete({
    where: {
      question_id: question_id,
    },
  });
  revalidatePath(
    `/courses/${course?.topic.course_id}/${course?.topic_id}/generateQuestions`
  );
}

export async function makeStudentExam(previousInput, formdata) {
  const user = await getUser();
  const { topic, course_id } = previousInput;
  const questions = [];
  console.log(formdata.get("ExamName"));
  for (let top of topic) {
    console.log(
      `Difficulty: ${Number(formdata.get(`difficulty-${top.topic_id}`))}`
    );
    const data = await prisma.question.findMany({
      where: {
        topic_id: top.topic_id,
        difficulty: {
          lte: Number(formdata.get(`difficulty-${top.topic_id}`)),
        },
      },
      take: Number(formdata.get(`questions-${top.topic_id}`)),
    });

    questions.push(...data);
  }
  const totalDifficulty = questions.reduce((current, sum) => {
    return current + sum.difficulty;
  }, 0);
  const average_difficulty = totalDifficulty / questions.length;

  const mockExam = await prisma.mockExam.create({
    data: {
      name: formdata.get("ExamName"),
      created_by: "system",
      student_id: user.user_id,
      average_difficulty: average_difficulty,
      course_id: Number(course_id),
    },
  });
  for (let question of questions) {
    const createdQuestion = await prisma.examQuestions.create({
      data: {
        exam_id: mockExam.exam_id,
        question_id: question.question_id,
      },
    });
  }

  console.log("IT HECKEN WORKS")
  return {
    course_id: previousInput.course_id,
    topic: previousInput.topic,
    message: "Worked",
  };
}
