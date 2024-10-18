import { GoogleGenerativeAI } from "@google/generative-ai";
import { getData, saveData } from "../utils/indexed-db.js";
import { getValue } from "../utils/storage.js";
import showToast from "../../view/utils/showToast.js";

export default async function SummaryChat(text) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at giving good insights into documens, helping users answer questions strictly about the input or output document. Engaging in no other discussion except those concerning the document. You make sure to stick to conversations pertaining to the document alone."
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
    showToast("An error occured, Please try again later", 2500);
    console.log(e.message);
    return false;
  }
}