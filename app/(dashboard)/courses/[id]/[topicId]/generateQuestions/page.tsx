import { getTopic } from "@/utils/getters";
import { redirect } from "next/navigation";

export default async function page({params}){
const {id,topicId}=await params;
const topic=await getTopic(topicId)
if(!topic?.contentString){
    redirect(`/courses/${id}/${topicId}/editContent`)
}

return(
    <div>
        Generate Questions Page
    </div>
)
}