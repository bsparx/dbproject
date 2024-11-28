import MakeExam from "@/components/MakeExam";
import { getTopics } from "@/utils/getters";

export default async function page({ params }) {
  const {id}=await params;
  const topic=await getTopics(id)
  console.log(topic[0].questions)
  return (<div>
    Hello
    <MakeExam topic={topic}/>
  </div>)
}
