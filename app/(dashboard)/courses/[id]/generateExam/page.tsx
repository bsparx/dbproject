import MakeExam from "@/components/MakeExam";
import { getTopics } from "@/utils/getters";

export default async function GenerateExamPage({ params }) {
  const { id } = await params;
  const topic = await getTopics(id);
  const topicWithQuestions = topic.filter((e) => {
    if (e.questions.length > 0) {
      return e;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold text-center">
            Generate Custom Exam
          </h1>
          <p className="text-center text-blue-100 mt-2">
            Craft your perfect assessment by selecting topics and difficulty
          </p>
        </div>
        <MakeExam topic={topicWithQuestions} id={id} />
      </div>
    </div>
  );
}