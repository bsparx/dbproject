import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    revisionGuide: z.string().describe(
      "Create an extensive revision guide that goes beyond the direct scope of the questions to ensure complete topic understanding. Start with foundational concepts and progress chronologically to advanced applications. Include prerequisite knowledge, bridging concepts, and related topics that aren't directly tested but are crucial for deep understanding. Add relevant real-world examples, common misconceptions, and connecting principles. Incorporate active learning prompts, self-assessment questions, and metacognitive strategies. Include exam technique tips specific to the topic. Use React markdown styling for clear presentation of all content including supplementary materials. While covering exam topics comprehensively, expand the context to create a complete learning resource that promotes deep understanding and effective revision strategies."
    )
  }).describe(`CRITICAL FORMAT REQUIREMENTS:
1. Return valid JSON with a single field named 'revisionGuide'
2. Properly escape all special characters in the markdown content
3. Avoid using characters that could break JSON structure
4. Use consistent markdown formatting throughout`)
);

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template: `Analyze these exam questions and marking schemes, then create a comprehensive revision guide that includes both tested material and essential supporting concepts:

{entry}

Generate an extensive revision guide that:
- It starts with an index
- Seperate each section visually.
- Starts with foundational concepts and prerequisites
- Includes necessary background information not directly tested
- Explains bridging concepts that connect different topics
- Addresses common misconceptions and pitfalls
- Provides real-world applications and examples
- Includes relevant theories/concepts that complement tested material
- Progresses logically through increasingly complex topics
- Organizes content chronologically/sequentially
- Builds understanding systematically
- Covers all key topics from the questions thoroughly
- Uses clear structure with sections and subsections
- Includes definitions, terminology, and key principles
- Adds helpful diagrams, equations, or illustrations where beneficial
- Highlights connections between different concepts
- Explains practical applications and significance
- Avoids directly revealing specific answers
- Uses React markdown formatting for clear presentation

Consider adding:
- Historical context where relevant
- Latest developments in the field
- Alternative approaches or viewpoints
- Problem-solving strategies
- Visual aids and memory techniques
- Quick reference summaries
- Practice scenarios (different from exam questions)

Enhance learning with:
- Active recall prompts throughout the guide
- Common exam question types and how to approach them
- Topic-specific exam technique tips
- Mnemonics and memory aids where helpful
- "Deep Dive" sections for advanced understanding
- "Quick Review" sections for last-minute revision
- Cross-references to related topics
- "Common Pitfalls" warnings
- "Key Takeaways" summaries after each section
- Interactive elements (where markdown allows)
- Topic-specific study strategies

Structure each major section with:
1. Overview and learning objectives
2. Core content with examples. This section should be very comprehensive. You can add points of your own to enhance understanding.
3. Summary and key points

Important: Make sure you follow the format instructions and the string should be wrapped in the correct json format so langchain can parse it
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
    temperature: 0,
    maxTokens: 5000,
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
   
    return {
      revisionGuide: "Error generating revision guide. Please try again."
    };
  }
}