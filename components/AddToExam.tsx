import { useState } from "react";
import { addToExam } from "@/utils/crud";

export default function AddToExam({ exam_id, question_id, onAdd }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToExam = async () => {
    setLoading(true);
    const response = await addToExam({ exam_id, question_id }, new FormData());

    setMessage(response.comment || "Question added to exam successfully!");
    setLoading(false);

    // Call the onAdd function to update the parent component's state
    if (onAdd && !response.comment.includes("duplicates")) {
      onAdd({
        question_id: question_id,
        text: response.question_text, // Add question text or any other details if needed
      });
    }
  };

  return (
    <div>
      <button onClick={handleAddToExam} disabled={loading}>
        {loading ? "Adding..." : "Add to Quiz"}
      </button>
      {message && <h1>{message}</h1>}
    </div>
  );
}
