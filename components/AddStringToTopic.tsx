"use client";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { addContentToTopic } from "@/utils/crud";

export default function AddStringToTopic({ topicId, contentString }) {
  const [charCount, setCharCount] = useState(
    contentString ? contentString.length : 80
  );
  const [state, formAction, isPending] = useActionState(addContentToTopic, {
    topicId,
  });

  const handleTextChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-slate-700"
        >
          Paste the entire topic here!
        </label>
        <div className="relative">
          <textarea
            name="content"
            id="content"
            required
            className="w-full min-h-[300px] p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400"
            placeholder="Enter at least 1000 characters..."
            defaultValue={
              contentString ||
              "It is recommended that you copy and paste the entire contents of the topic here."
            }
            onChange={handleTextChange}
            minLength={999}
          />
          <div className="absolute bottom-2 right-2 text-sm text-slate-500">
            {charCount}/1000 characters
          </div>
        </div>
        {charCount < 1000 && charCount > 0 && (
          <p className="text-amber-600 text-sm">
            Please enter at least 1000 characters ({1000 - charCount} more
            needed)
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || charCount < 1000}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Submitting...
          </span>
        ) : (
          "Submit"
        )}
      </button>

      {state?.message && (
        <div
          className={`p-4 rounded-lg ${
            state.error
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          } mt-4`}
        >
          {state.message}
        </div>
      )}
    </form>
  );
}
