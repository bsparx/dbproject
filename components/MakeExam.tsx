"use client";

export default function MakeExam({ topic }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          // Handle form submission logic here
        }}
      >
        {topic.map((top) => {
          return top.questions.length !== 0 ? (
            <div key={top.topic_id} className="mb-4">
              <label htmlFor={`questions-${top.topic_id}`}>
                From {top.name}
              </label>
              <br />
              <label htmlFor={`num-questions-${top.topic_id}`}>
                Number of questions
              </label>
              <input
                type="number"
                id={`num-questions-${top.topic_id}`}
                name={`num-questions-${top.topic_id}`}
                min="0"
                max="3"
                className="border p-1 rounded"
              />
              <br />
            </div>
          ) : (
            <div key={top.topic_id} className="mb-4 text-gray-500">
              No questions in {top.name}
            </div>
          );
        })}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
