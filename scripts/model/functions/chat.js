// Import necessary modules.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getData, saveData } from "../utils/indexed-db.js";
import { getValue } from "../utils/storage.js";
import showToast from "../../view/utils/showToast.js";

// Asynchronous function to handle chat messages using Google Generative AI.
export default async function Chat(text) {
  // Create a new Google Generative AI instance using the API key from environment variables.
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  // Get the Gemini 1.5 Flash model.  System instruction sets the model's behavior.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at giving good insights into documents, helping users answer questions strictly about the input or output document. Engaging in no other discussion except those concerning the document. You make sure to stick to conversations pertaining to the document alone."
  });

  //Retrieve current index and history from storage.
  const index = getValue("currentIndex");
  const history = await getData();

  // Start a new chat session with the existing chat history.
  const chat = model.startChat({ history: history[index].chat });
  try {
    // Send the message to the chat model and await the response.
    const result = await chat.sendMessage(text);
    // Extract the text from the response.
    const response = result.response.text();
    // Add user and model messages to the chat history.
    history[index].chat.push(
      {
        role: "user",
        parts: [{ text }]
      },
      {
        role: "model",
        parts: [{ text: response }]
      }
    );
    // Save the updated history to IndexedDB.
    await saveData(history);
    // Return the model's response.
    return response;
  } catch (e) {
    // Display an error toast message if an error occurs.
    showToast("An error occured, Please try again later", 2500);
    console.log(e.message); // Log the error message to the console.
    return false; // Return false to indicate an error.
  }
}