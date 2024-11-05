import { useState } from "react";
import { removeFromExam } from "@/utils/crud";

export default function RemoveFromExam({ exam_id, question_id, onRemove }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRemoveFromExam = async () => {
    setLoading(true);
    const response = await removeFromExam({ exam_id, question_id });
    setMessage(response.comment || "Question removed from exam successfully!");
    setLoading(false);

    // Call the onRemove function to update the parent component's state
    if (onRemove) onRemove(question_id);
  };

  return (
    <div>
      <button onClick={handleRemoveFromExam} disabled={loading}>
        {loading ? "Removing..." : "Remove from Quiz"}
      </button>
      {message && <h1>{message}</h1>}
    </div>
  );
}
