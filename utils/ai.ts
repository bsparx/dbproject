import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    comments: z
      .string()
      .describe(
        "Generate a detailed marks breakdown with specific component scores. Format MUST include: individual criterion scores (X.X/Y.Y format), total score, and a brief explanation. Highlight strengths and weaknesses, ensuring the breakdown directly reflects the marking scheme and final score. Be precise and concise."
      ),
    score: z
      .number()
      .describe(
        "Grade the exam answer by fully accepting paraphrased responses. Evaluate solely on conceptual accuracy and understanding. Score from 0-10, adjusting expectations based on question difficulty (1-10). Prioritize the core meaning and substantive content. Zero points only for completely irrelevant or missing responses. If all the requirements in the marking scheme are met properly, give them full marks."
      ),
  })
);
const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze the following questions.Don't deduct marks for differences in wording.Be really lenient in checking. Compare the student's answer with the correct answer for grading.Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });
console.log(input)
  return input;
};

export async function analyze(prompt) {
  const input = await getPrompt(prompt);
  const llm = new ChatOpenAI({
    model: "o1-mini",
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
    console.log(parsedData);
    return parsedData;
  } catch (e) {
    return "It didn't work";
  }
}
