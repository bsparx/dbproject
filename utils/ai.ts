import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    score: z
      .number()
      .describe(
        "Aim to give the student a 10 whenever possible. Grade the student's response on a scale of 0 to 10, focusing on the presence of key concepts and overall understanding. Award a full score of 10 if the answer captures the essence and main points of the expected response, even if phrased differently. Deduct points sparingly and only for significant inaccuracies or major omissions in understanding. "
      ),
    comments: z
      .string()
      .describe(
        "Offer encouraging and constructive feedback, emphasizing strengths in the student's answer and gently pointing out areas for further clarification or detail if needed. Highlight any significant errors while also acknowledging what the student did well."
      ),
  })
);
const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following questions.Don't deduct marks for differences in wording.Be really lenient in checking. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
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
    model: "gpt-4o-mini",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });

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
