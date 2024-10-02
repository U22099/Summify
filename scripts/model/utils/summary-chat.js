import { GoogleGenerativeAI } from "@google/generative-ai";
import { getData, saveData } from "indexed-db.js";
import { getValue } from "storage.js";

export default async function SummaryChat(text) {
  const genAI = new GoogleGenerativeAI(import.meta.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"
  });

  const index = getValue("currentIndex");
  const history = await getData();

  const chat = model.startChat({ history: history[index].chat });
  try {
    const result = await chat.sendMessage(text);
    const response = result.response.text();
    history[index].chat.push(
    {
      role: "user",
      parts: [{ text }]
    },
    {
      role: "model",
      parts: [{ text: response }]
    });
    await saveData(history);
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
}