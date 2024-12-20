import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    revisionGuide: z.string().describe(
      "Create a comprehensive revision guide that covers the core concepts, theories, and principles tested in the provided questions. Include relevant examples, definitions, and explanations without directly revealing specific answers. Format the content using React markdown styling with headers, subheaders, bullet points, and emphasis where appropriate. Focus on building foundational understanding of the topics."
    )
  })
);

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template: `Based on the following exam questions and marking schemes, create a detailed revision guide that will help students understand the underlying concepts and prepare effectively:

{entry}

Generate a revision guide that:
- Covers all key topics and themes from the questions
- Explains core concepts and principles
- Provides relevant examples and applications
- Uses clear structure with sections and subsections
- Includes definitions and terminology
- Avoids directly revealing specific answers
- Uses React markdown formatting for clear presentation

{format_instructions}`,
    inputVariables: ["entry"],
    partialVariables: { format_instructions }
  });
  
  const input = await prompt.format({
    entry: content,
  });
  return input;
};

export async function getRevisionString(prompt) {
  const input = await getPrompt(prompt);
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini-2024-07-18", // or "gpt-4" depending on your needs
    temperature: 0.3,
    maxTokens: 2000,
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const aiMsg = await llm.invoke([
      {
        role: "user",
        content: input,
      },
    ]);
    
    const parsedData = await parser.parse(aiMsg.content);
    
    if (!parsedData || !parsedData.revisionGuide) {
      throw new Error("Invalid response format");
    }
    
    return parsedData;
  } catch (e) {
    console.error("Error generating revision guide:", e);
    return {
      revisionGuide: "Error generating revision guide. Please try again."
    };
  }
}
