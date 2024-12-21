import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";


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
        `Create a comprehensive marking scheme for the question that totals 10 marks, structured as follows:
        - Give a model answer to the question.It should be an answer not an explanation of what a model answer would be.
        - Allocate marks to each major component of the answer based on its importance and complexity.
        - Include clear guidance on what constitutes a complete, accurate response for each section.
        - Provide examples or key points that should be mentioned for full marks.
        - Offer a concise explanation of how partial marks should be awarded for incomplete or incorrect answers.
        - Ensure that the scheme supports efficient evaluation and helps the student understand the criteria for earning full marks.`
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
      "IMPORTANT: DON't ASK ABOUT CONCEPTS THAT AREN't DISCUSSED IN THE PROMPT I PROVIDE.Analyze the provided content, the previous questions, and the user prompt carefully.Only use content that I've given to you, don't add material of your own to make the question. Generate new and unique questions that are relevant to the provided material and aligned with the user's intent. Make sure the marking-scheme totals to 10 marks. Ensure that the questions are diverse, well-structured, and cover different aspects of the material to encourage comprehensive understanding.Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
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
    model: "gpt-4o-mini-2024-07-18",
    temperature: 0.3, // Slightly increased for more natural language
    maxTokens:-1,
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
