// Imports necessary modules for Google Generative AI, base64 conversion, data storage, and getting values from storage.
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import toBase64 from "../utils/to-base-64.js";
import { getData, saveData } from "../utils/indexed-db.js";
import { getValue } from "../utils/storage.js";

// Defines the schema for the flashcard response.
const schema = {
  description: "FlashCards",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      question: {
        type: SchemaType.STRING,
        description: "Question",
        nullable: false,
      },
      answer: {
        type: SchemaType.STRING,
        description: "Answer",
        nullable: false,
      },
    },
    required: ["question", "answer"],
  },
};

// Asynchronous function to generate flashcards from text using Google Gemini.
export async function GenerateFlashCardsForText(text) {
  // Creates a new Google Generative AI instance.
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  // Gets the Gemini 1.5 Flash model with specific generation configuration and system instructions.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json", //Specifies the response type as JSON.
      responseSchema: schema, //Specifies the schema for the response.
    },
    systemInstruction: "You are an expert at flashcards generator, good at giving concise and meaningful flashcards Q&As from joint documents containing the document and its summary read by the user.", //Instruction for the model.
  });
  // Defines the prompt for generating flashcards.
  const prompt = "Generate 20 flashcards of questions and answers from the joint documents containing the document and its summary read by the user, below: ";

  try {
    // Generates flashcards from the given text using the model.
    const generatedContent = await model.generateContent(prompt + "\n" + text);
    // Extracts the text from the response.
    const response = generatedContent.response.text();
    // Retrieves the current index and history from storage.
    const index = getValue("currentIndex");
    const history = await getData();
    // Updates the history object with the generated flashcards.
    history[index].flashcards = response;
    // Saves the updated history to IndexedDB.
    await saveData(history);
    // Returns the generated flashcards.
    return response;
  } catch (e) {
    console.log(e); // Logs any errors that occur during flashcard generation.
    return false; // Returns false to indicate an error.
  }
}

// Asynchronous function to generate flashcards from a file using Google Gemini.
export async function GenerateFlashCardsForFile(file) {
  // Creates a new Google Generative AI instance.
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  // Gets the Gemini 1.5 Flash model with specific generation configuration and system instructions.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json", //Specifies the response type as JSON.
      responseSchema: schema, //Specifies the schema for the response.
    },
    systemInstruction: "You are an expert at flashcards generator, good at giving concise and meaningful flashcards Q&As from documents.", //Instruction for the model.
  });
  // Defines the prompt for generating flashcards from a file.
  const prompt = "Generate 20 flashcards of questions and answers from the document in the file";

  // Asynchronous function to convert a file to a format suitable for Google Generative AI.
  async function fileToGenerativePart(file) {
    // Converts the file to base64.
    const base64 = file;
    // Extracts the data and mime type from the base64 string.
    const data = base64.split(",")[1];
    const mimeType = base64.split(",")[0].split(";")[0].split(":")[1];
    // Returns an object containing the data and mime type.
    return {
      inlineData: {
        data,
        mimeType
      },
    };
  }

  try {
    // Converts the file to the required format.
    const filePart = await fileToGenerativePart(file);
    // Generates flashcards from the file data and prompt using the model.
    const generatedContent = await model.generateContent([filePart, prompt]);
    // Extracts the text from the response.
    const response = generatedContent.response.text();
    // Retrieves the current index and history from storage.
    const index = getValue("currentIndex");
    const history = await getData();
    // Updates the history object with the generated flashcards.
    history[index].flashcards = response;
    // Saves the updated history to IndexedDB.
    await saveData(history);
    console.log(response); // Logs the generated flashcards to the console.
    return response; // Returns the generated flashcards.
  } catch (e) {
    console.log(e.message); // Logs any errors that occur during flashcard generation.
    return false; // Returns false to indicate an error.
  }
}