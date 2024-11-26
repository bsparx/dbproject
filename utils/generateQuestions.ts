import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

// Define the schema for the output
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    question: z
      .string()
      .describe(
        "Generate a clear, relevant, and focused question based solely on the provided course material and the user's input prompt. Do not incorporate any external information. The question should directly reference the material to assess understanding of the core concepts."
      ),
    markingScheme: z
      .string()
      .describe(
        "Provide a comprehensive answer scheme that includes the correct answer to the generated question. Additionally, include a detailed marking scheme that allocates the 100% total marks. The marking scheme should clearly outline how each part of the answer contributes to the overall score, resembling standard educational marking schemes (e.g., Levels A-C or O-Level distinctions). Ensure that the total allocation equals exactly 100%."
      ),
    difficulty: z
      .number()
      .min(1)
      .max(10)
      .describe(
        "Assign a difficulty rating to the question on a scale from 1 to 10, where 1 represents very easy and 10 represents very difficult. This rating should reflect the complexity of the question in the context of the provided course material."
      ),
  })
);

export { parser };

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "IMPORTANT: DON't ASK ABOUT CONCEPTS THAT AREN't DISCUSSED IN THE PROMPT I PROVIDE.Analyze the provided content, the previous questions, and the user prompt carefully.Only use content that I've given to you, don't add material of your own to make the question. Generate new and unique questions that are relevant to the provided material and aligned with the user's intent. Do not repeat or closely resemble any previously generated questions. Ensure that the questions are diverse, well-structured, and cover different aspects of the material to encourage comprehensive understanding.Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export async function getGeneratedQuestionJson(prompt) {
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
