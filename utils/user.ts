"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";

export async function getUser() {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      ClerkID: userId,
    },
  });
  return user;
}

export async function getUnregisteredCourses(userId) {
  const courses = await prisma.course.findMany({
    where: {
      NOT: {
        Enrollment: {
          some: {
            student_id: userId, // Exclude courses where the user is registered
          },
        },
      },
    },
  });

  return courses;
}

export async function getYourCourses(user_id) {
  const courses = await prisma.enrollment.findMany({
    where: {
      student_id: user_id,
    },
    include: {
      course: true,
    },
  });
  return courses;
}
