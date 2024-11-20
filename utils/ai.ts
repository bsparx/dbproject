import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    score: z
      .number()
      .describe(
        "Evaluate the student's response on a scale from 0 to 10. Assess based on the student’s understanding of the main concepts and accuracy, not on wording or phrasing. Provide a full score of 10 if the student demonstrates a correct and thorough understanding of the answer, even if the response is paraphrased. Deduct points only for significant inaccuracies or missing core concepts. Award a 0 only if the response is irrelevant or completely incorrect. If you cannot find the student's answer, give them a 0. If the answer is only a 'v' give them 0 "
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
    return parsedData;
  } catch (e) {
    return "It didn't work";
  }
}
