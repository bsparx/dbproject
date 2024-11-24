import { getTopic } from "@/utils/getters";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page({params}){
const {id,topicId}=await params;
const topic=await getTopic(topicId)
if(!topic?.contentString){
    redirect(`/courses/${id}/${topicId}/editContent`)
}

return(
    <div>
        <Link href={`courses/${id}/${topicId}/editContent`}>
        <button>Edit Content</button></Link>
        Generate Questions Page
    </div>
)
}