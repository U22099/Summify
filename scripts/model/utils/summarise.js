import { GoogleGenerativeAI } from "@google/generative-ai";
import toBase64 from "./to-base-64.js";
import { getData, saveData } from "indexed-db.js";
import { getValue } from "storage.js";

export async function TextSummary(text) {
  const genAI = new GoogleGenerativeAI(import.meta.env.SUMMIFY_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at content summarisation good at giving concise and meaningful summary of contents by preserving key information, main ideas, and essential details omiting unnecessary information, redundant phrases, and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the summary is easy to understand, clear, and free of jargon."
  });

  const prompt = "Generate flashcards of question and answer of the document below: ";

  try {
    const generatedContent = await model.generateContent(prompt + "\n" + text);
    const response = generatedContent.response.text();
    const index = getValue("currentIndex");
    const history = await getData()[index];
    history.chat = [
      {
        role: "user",
        parts: [{ text }]
      },
      {
        role: "model",
        parts: [{ text: response }]
      }
    ]
    return response;
  } catch (e) {
    console.log(e)
    return false;
  }
}

export async function FileSummary(file, mimeType) {
  const genAI = new GoogleGenerativeAI(import.meta.env.SUMMIFY_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at content summarisation good at giving concise and meaningful summary of documents by preserving key information, main ideas, and essential details omiting unnecessary information, redundant phrases, and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the summary is easy to understand, clear, and free of jargon."
  });

  const prompt = "Generate flashcards of question and answer of the document in the file";

  async function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: await toBase64(file),
        mimeType
      },
    };
  }

  try {
    const filePart = await fileToGenerativePart(file, mimeType);
    const generatedContent = await model.generateContent([filePart, prompt]);
    const response = generatedContent.response.text();
    const index = getValue("currentIndex");
    const history = await getData()[index];
    history.chat = [
      {
        role: "user",
        parts: [{ filePart },{ text }]
      },
      {
        role: "model",
        parts: [{ text: response }]
      }
    ]
    return response;
  } catch (e) {
    console.log(e)
    return false;
  }
}