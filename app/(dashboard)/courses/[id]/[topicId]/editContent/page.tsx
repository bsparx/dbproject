import AddStringToTopic from "@/components/AddStringToTopic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTopic } from "@/utils/getters";

export default async function TopicPage({ params }) {
  const { id, topicId } = await params;
  const topic=await getTopic(topicId)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-800">
            Topic {id} - Section {topicId}
          </CardTitle>
          <p className="text-center text-slate-600">
            Add your content below to contribute to this topic
          </p>
        </CardHeader>
        <CardContent>
          <AddStringToTopic topicId={topicId} contentString={topic?.contentString}/>
        </CardContent>
      </Card>
    </div>
  );
}