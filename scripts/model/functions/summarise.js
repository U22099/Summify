// Imports necessary modules for Google Generative AI, base64 conversion, data storage, and toast messages.
import { GoogleGenerativeAI } from "@google/generative-ai";
import toBase64 from "../utils/to-base-64.js";
import { getData, saveData } from "../utils/indexed-db.js";
import { getValue } from "../utils/storage.js";
import showToast from "../../view/utils/showToast.js";

// Asynchronous function to generate a text summary using Google Gemini.
export async function TextSummary(text, length) {
  // Creates a new Google Generative AI instance using the API key from environment variables.
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  // Gets the Gemini 1.5 Flash model with instructions for concise and objective summarization.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at content summarisation good at giving concise and meaningful summary of contents by preserving key information, main ideas, and essential details omiting unnecessary information, redundant phrases, and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the summary is easy to understand, clear, and free of jargon. Formatting your replies in nice and precise markdown format"
  });

  // Defines the prompt for the summarization task.
  const prompt = `Generate a ${length} length summarisation of the document below: `;

  try {
    // Generates content using the model and the given prompt and text.
    const generatedContent = await model.generateContent(prompt + "\n" + text);
    // Extracts the text from the generated content response.
    const response = generatedContent.response.text();
    // Retrieves the current index and history from storage.
    const index = getValue("currentIndex");
    const history = await getData();
    // Updates the history object with input and output data, and a simulated chat history.
    history[index].inputData = {
      title: text.slice(0, 30), // Extracts a shortened title from the input text.
      type: "text", // Specifies the input type as text.
      data: text, // Stores the input text.
      length // Stores the desired length of the summary.
    };
    history[index].outputData = response; // Stores the generated summary.
    history[index].chat = [ // Creates a simulated chat history.
      {
        role: "user",
        parts: [{ text: "This is the input document " + text }]
      },
      {
        role: "model",
        parts: [{ text: "This is the output summary " + response }]
      }
    ];
    // Saves the updated history to IndexedDB.
    await saveData(history);
    // Returns the generated summary.
    return response;
  } catch (e) {
    // Displays an error toast message and logs the error to the console if an error occurs.
    showToast("An error occured, Please try again later", 2500);
    console.log(e);
    return false;
  }
}

// Asynchronous function to generate a file summary using Google Gemini.
export async function FileSummary(file, length, isNew) {
  // Creates a new Google Generative AI instance.
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  // Gets the Gemini 1.5 Flash model with summarization instructions.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at content summarisation good at giving concise and meaningful summary of documents by preserving key information, main ideas, and essential details omiting unnecessary information, redundant phrases, and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the summary is easy to understand, clear, and free of jargon. Formatting your replies in nice and precise markdown format"
  });

  // Defines the prompt for the summarization task.
  const prompt = `Generate a ${length} length summarisation of the document below: `;

  // Asynchronous function to convert a file to a Generative AI compatible format.
  async function fileToGenerativePart(file) {
    // Converts the file to base64 if it's a new file, otherwise uses the existing base64 representation.
    const base64 = isNew ? await toBase64(file) : file;
    // Extracts data and mime type from base64 string.
    const data = base64.split(",")[1];
    const mimeType = base64.split(",")[0].split(";")[0].split(":")[1];
    // Returns the file data in the format required by Google Generative AI.
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
    // Generates content using the model, file data, and prompt.
    const generatedContent = await model.generateContent([filePart, prompt]);
    // Extracts the text from the response.
    const response = generatedContent.response.text();
    // Retrieves the current index and history from storage.
    const index = getValue("currentIndex");
    const history = await getData();
    // Updates the history object with input and output data, and a simulated chat history.
    history[index].inputData = {
      title: file.name || history[index].inputData.title, // Uses the file name as the title, or the existing title if available.
      type: "file", // Specifies the input type as file.
      data: isNew ? `data:${filePart.inlineData.mimeType};base64,${filePart.inlineData.data}` : file, // Stores the file data as base64 if it's a new file, otherwise uses the existing data.
      length // Stores the desired length of the summary.
    };
    history[index].outputData = response; // Stores the generated summary.
    history[index].chat = [ // Creates a simulated chat history.
      {
        role: "user",
        parts: [filePart, { text: "This is ths input document" }]
      },
      {
        role: "model",
        parts: [{ text: "This is the output summary " + response }]
      }
    ];
    // Saves the updated history to IndexedDB.
    await saveData(history);
    // Returns the generated summary.
    return response;
  } catch (e) {
    // Displays an error toast message and logs the error to the console if an error occurs.
    showToast("An error occured, Please try again later", 2500);
    console.log("Error occured");
    console.log(e);
    return false;
  }
}