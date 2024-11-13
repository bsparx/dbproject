import { redirect } from "next/navigation";
import { prisma } from "./db";

export async function isAlreadyChecked(record_id){
    console.log(record_id)
const record=await prisma.examAnswerRecord.findUnique({
    where:{
        record_id:Number(record_id)
    }
})
if(record){
    redirect(`/exams/${record.record_id}/finalGrade`)
}
}