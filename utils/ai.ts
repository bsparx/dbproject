import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z
    .object({
      comments: z
        .string()
        .min(1)
        .describe(
          `Provide a detailed grading breakdown in react-markdown following this EXACT structure:

# Grading Breakdown

**Final Score: {X.X}/10.0**

## Score Components
- Name/description of the component: **{X.X}/total component marks**
  - Explanation of points awarded/deducted
- Name/description of the component: **{X.X}/total component marks**
  - Name/description of the component
  - Explanation of points awarded/deducted

## Feedback Summary
*Brief explanation of overall performance*

## Correct Answer Comparison
- What was correct
- What could be improved
- Key differences noted

Note: Ensure all numerical scores use X.X format and match the final score field.`
        ),

      score: z
        .number()
        .min(0)
        .max(10)
        .describe(
          `Grade the answer from 0-10 following these rules:
1. Score MUST match the final score shown in comments
2. Round to one decimal place (X.X format)
3. Grade based on:
   - Conceptual understanding (not exact wording)
   - Question difficulty level
   - Core requirements in marking scheme
4. Scoring guide:
   - 10.0: Perfect answer meeting all requirements
   - 7.0-9.9: Strong answer with minor gaps
   - 4.0-6.9: Partial understanding shown
   - 1.0-3.9: Major concepts missing
   - 0.0-0.9: Completely incorrect/irrelevant, or some non-sense answer`
        ),
    })
    .describe(
      "Response MUST contain 'comments' (markdown string) and 'score' (number between 0-10)"
    )
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `You are an expert exam grader. Grade the following answer carefully and provide formatted feedback.

CRITICAL REQUIREMENTS:
1. Return valid JSON with exactly two fields:
   - comments: Markdown-formatted string following the template exactly
   - score: Number between 0-10 with one decimal place

2. Ensure the final score in comments matches the score field exactly

3. Be lenient in grading:
   - Accept paraphrased answers
   - Focus on conceptual understanding
   - Don't deduct for minor wording differences
   - Give full marks if core requirements are met

FORMAT INSTRUCTIONS:
{format_instructions}

CONTENT TO GRADE:
{entry}

Remember: Response MUST be valid JSON with proper markdown formatting in comments.`,
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  return prompt.format({
    entry: content,
  });
};

export async function gradeTheQuestion(prompt) {
  const input = await getPrompt(prompt);
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini-2024-07-18",
    apiKey: process.env.OPENAI_API_KEY,
    maxTokens: -1,
    temperature: 0,
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
