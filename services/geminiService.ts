
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateLearningContent(topic: string): Promise<string> {
  const prompt = `
    You are an expert in DevOps and Site Reliability Engineering, specializing in monitoring with Prometheus. Your task is to create a one-day lesson plan for a 7-day course on 'Mastering Prometheus & PromQL'. Today's topic is: "${topic}".

    Please provide the content in Markdown format. The content should be structured as follows and must include these exact headings:

    ## 🎯 Overview
    A brief introduction to what will be covered today.

    ## 📚 Key Concepts
    A detailed explanation of the core concepts for the day. Use bullet points and clear language. Explain technical terms simply.

    ## ⌨️ PromQL Examples
    Provide 3-5 practical PromQL query examples related to the concepts. Use Markdown code blocks with the \`promql\` language identifier. Explain what each query does and why it's useful.

    ## 🏋️‍♂️ Daily Challenge
    A hands-on exercise or a set of questions to test the user's understanding. Provide a clear task for the user to complete.

    Ensure the content is beginner-friendly but comprehensive enough to be valuable. The tone should be encouraging and educational. Do not add any introductory or concluding remarks outside of this structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to fetch learning content from Gemini API.");
  }
}
