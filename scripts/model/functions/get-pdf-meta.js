// Imports necessary modules for Google Generative AI.
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Defines the schema for the title response.  Specifies that the response should be a JSON object with a "title" property.
const schema = {
  description: "Title",
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: "title",
      nullable: false,
    }
  },
  required: ["title"],
};

// Asynchronous function to extract a title from a given text using Google Gemini.
export default async function getPdfMeta(summary) {
  // Creates a new Google Generative AI instance using the API key from environment variables.
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  // Gets the Gemini 1.5 Flash model with specific generation configuration and system instructions for title generation.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json", // Specifies that the response should be in JSON format.
      responseSchema: schema, // Uses the predefined schema to ensure the response is correctly structured.
    },
    systemInstruction: "You are an expert at meta object generation, good at giving concise and meaningful titles from a documents.", // Provides instructions to the model.
  });
  // Defines the prompt for title generation.
  const prompt = "Generate an object of title from the document below, don't add an extension: ";

  try {
    // Generates content using the model and the given prompt and summary text.
    const generatedContent = await model.generateContent(prompt + "\n" + summary);
    // Extracts the text from the response.
    const response = generatedContent.response.text();
    // Parses the JSON response and returns the title.
    return JSON.parse(response).title;
  } catch (e) {
    console.log(e); // Logs any errors that occur during title generation.
    return false; // Returns false to indicate an error.
  }
}