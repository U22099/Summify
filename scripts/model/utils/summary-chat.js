import { GoogleGenerativeAI } from "@google/generative-ai";
import { getData, saveData } from "indexed-db.js";
import { getValue } from "storage.js";

export default async function SummaryChat(text) {
  const genAI = new GoogleGenerativeAI(import.meta.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"
  });

  const index = getValue("currentIndex");
  const chatHistory = await getData()[index].chat;

  const chatHistory = model.startChat({ history });
  try {
    const result = await chat.sendMessage(text);
    const response = result.response.text();
    chatHistory.push(
    {
      role: "user",
      parts: [{ text }]
    },
    {
      role: "model",
      parts: [{ text: response }]
    });
    await saveData(chatHistory);
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
}