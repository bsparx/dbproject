import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    score: z
      .number()
      .describe(
        "Be really really lenient in grading the question.Grade the student's response on a scale of 0 to 10 based on the accuracy and completeness of the concepts presented. Award a full score of 10 if the student demonstrates a correct understanding of all key concepts, regardless of whether the language used is paraphrased. Deduct points only for inaccuracies or omissions in the conceptual understanding."
      ),
    comments: z
      .string()
      .describe(
        "Provide insightful and specific feedback highlighting any errors or misconceptions in the student's answer, giving clear guidance on areas for improvement."
      ),
  })
);
const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following questions. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export async function analyze(prompt) {
  const input = await getPrompt(prompt);
  const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log(input);
  const aiMsg = await llm.invoke([
    {
      role: "user",
      content: input,
    },
  ]);
  try {
    const parsedData = await parser.parse(aiMsg.content);
    return parsedData;
  } catch (e) {
    return "It didn't work";
  }
}
