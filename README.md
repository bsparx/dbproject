# Quiz Craft

A robust backend system built with [Prisma](https://www.prisma.io/) and designed for efficient data handling, user validation, and seamless integration with OpenAI's LangChain. This repository provides a scalable foundation for managing SQL queries, optimizing database connections, and enhancing user validation workflows. Built with **Next.js** for a full-stack architecture, styled using **ShadCN** and **Tailwind CSS** for modern, responsive UI components.

---

## Features

- **Efficient CRUD Operations**: Centralized in `Crud.ts` for fetching, updating, reading, and deleting data.
- **AI-Powered Queries**: `Ai.ts` integrates with LangChain to generate structured JSON responses from ChatGPT queries, which can be parsed and stored efficiently.
- **Optimized Database Handling**: `db.ts` extends Prisma's functionality to reuse database connections with Neon, minimizing overhead and improving performance.
- **User Management**: `User.ts` handles user-related queries, while `validation.ts` ensures robust user data validation.
- **Modern UI**: Built with **ShadCN** and **Tailwind CSS** to provide clean, responsive, and customizable designs.
- **Full-Stack Flexibility**: Developed using **Next.js** to combine server-side logic with client-side rendering seamlessly.

---

## Folder Structure

### **`utils/`**

The `utils` folder contains the core backend logic and utilities:

- **`Crud.ts`**:  
  Centralized file for all SQL queries related to CRUD operations. This file acts as the backbone for interacting with the database.

- **`Ai.ts`**:  
  Handles AI integration using LangChain. This enables the architecture of queries to ChatGPT and returns structured JSON data.  
  - Parses and stores JSON outputs for further processing.

- **`db.ts`**:  
  Extends the Prisma variable to optimize database connections, especially with Neon, ensuring a single connection is reused across queries rather than creating new connections repeatedly.

- **`User.ts`**:  
  Contains logic for user-related queries, such as fetching or updating user data.

- **`validation.ts`**:  
  Includes robust validation functions to ensure all user data adheres to expected formats and constraints.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16+  
- [Prisma](https://www.prisma.io/)  
- A [Neon](https://neon.tech/) database instance  
- [Next.js](https://nextjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  

---
