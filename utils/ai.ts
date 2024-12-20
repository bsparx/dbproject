import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    comments: z
      .string()
      .describe(
        "Generate a detailed marks breakdown with specific component scores. Format MUST include: individual criterion scores (X.X/Y.Y format), total score, and a 1-line summary. Conclude with the correct or ideal answer."
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

  return input;
};

export async function analyze(prompt) {
  const input = await getPrompt(prompt);
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini-2024-07-18",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0, 
    maxTokens: 2000, // Add token limit to prevent overlong responses
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
