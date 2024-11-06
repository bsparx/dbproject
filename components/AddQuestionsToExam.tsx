"use client";

import {
  getCurrentExamQuestions,
  getQuestion,
  getQuestionsFromTopic,
} from "@/utils/crud";
import { useEffect, useState } from "react";
import AddToExam from "./AddToExam";
import RemoveFromExam from "./RemoveFromExam";

export default function AddQuestionToExam({ exam_id, topics }) {
  const [currentTopic, setTopic] = useState(topics[0]?.topic_id || 0);
  const [questions, setQuestions] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [refreshExisting, setRefreshExisting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestionsFromTopic(
        Number(currentTopic)
      );

      setQuestions(fetchedQuestions);
    };

    if (currentTopic) fetchQuestions();
  }, [currentTopic]);

  useEffect(() => {
    const fetchExamQuestions = async () => {
      const existingQuestions = await getCurrentExamQuestions({ exam_id });
      setExamQuestions(existingQuestions);
    };

    fetchExamQuestions();
  }, [refreshExisting]);

  const handleRemoveQuestion = (question_id) => {
    setExamQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.question_id !== question_id)
    );
  };

  const handleAddQuestion = async (newQuestion) => {
    const { question_id } = newQuestion;
    const question = await getQuestion(question_id);

    setExamQuestions((prevQuestions) => [...prevQuestions]);
    setRefreshExisting(!refreshExisting);
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      <div>
        <label className="text-lg font-semibold mb-2">Select Topic:</label>
        <select
          className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={currentTopic || ""}
          onChange={(e) => setTopic(Number(e.target.value))}
        >
          <option value="">--Select a Topic--</option>
          {topics.map((topic) => (
            <option key={topic.topic_id} value={topic.topic_id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-green-700">
          Questions Already in Exam:
        </h3>
        {examQuestions.length > 0 ? (
          examQuestions.map((question) => (
            <div
              key={question.question_id}
              className="bg-green-100 my-2 p-4 rounded-md flex justify-between items-center"
            >
              <span>{question.question.text || "Please Refresh to load"}</span>
              <RemoveFromExam
                exam_id={exam_id}
                question_id={question.question_id}
                onRemove={handleRemoveQuestion}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No questions added to the exam yet.</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-700">
          Available Questions for Topic:
        </h3>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question.question_id}
              className="bg-blue-100 my-2 p-4 rounded-md flex justify-between items-center"
            >
              <span>{question.text}</span>
              <AddToExam
                exam_id={exam_id}
                question_id={question.question_id}
                onAdd={handleAddQuestion}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No questions available for this topic.
          </p>
        )}
      </div>
    </div>
  );
}
