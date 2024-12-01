import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    score: z
      .number()
      .describe(
        "Use the marking scheme and percentage breakdown to grade the example. The percentage breakdown is not part of the answer, it's only for you(The AI) to grade the exam.Assign a score between 0 and 10 based on the student's comprehension and accuracy of the main concepts. The evaluation should be lenient towards paraphrased answers as long as the core ideas are correctly conveyed. A score of 10 indicates a thorough and accurate understanding, even if the response is rephrased. Deduct points for significant inaccuracies or omissions of essential concepts. Assign a 0 only if the response is entirely irrelevant, incorrect, or missing. If the student's answer is not found or is a single character like 'v', assign a 0."
      ),
    comments: z
      .string()
      .describe(
        "Provide clear, concise, and actionable feedback on the student's response. Begin by highlighting the strengths of the answer, such as accurate understanding of key concepts, effective argumentation, or clear communication. Then, identify specific areas for improvement, pointing out any missing information, misconceptions, or areas that lack clarity. Offer practical suggestions on how the student can enhance their response, ensuring the feedback is encouraging and aimed at fostering deeper understanding and skill development."
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
    model: "gpt-4o-mini",
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
