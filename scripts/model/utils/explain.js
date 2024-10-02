import { GoogleGenerativeAI } from "@google/generative-ai";
import toBase64 from "./to-base-64.js";
import { getData, saveData } from "indexed-db.js";
import { getValue } from "storage.js";

export async function TextSummary(text, length) {
  const genAI = new GoogleGenerativeAI(import.meta.env.SUMMIFY_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at content explanation good at giving concise and meaningful explanation of contents by explaining key information, main and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the explanation is easy to understand, clear, and free of jargon."
  });

  const prompt = `Generate a ${length} length explanation of the document below: `;

  try {
    const generatedContent = await model.generateContent(prompt + "\n" + text);
    const response = generatedContent.response.text();
    const index = getValue("currentIndex");
    const history = await getData();
    history[index].inputData = {
      title: text.slice(0, 20),
      type: "text",
      data: text
    };
    history[index].outputData = response;
    history[index].chat = [
      {
        role: "user",
        parts: [{ text }]
      },
      {
        role: "model",
        parts: [{ text: response }]
      }
    ];
    await saveData(history);
    return response;
  } catch (e) {
    console.log(e)
    return false;
  }
}

export async function FileSummary(file, length) {
  const genAI = new GoogleGenerativeAI(import.meta.env.SUMMIFY_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at documents explanation good at giving concise and meaningful explanation of documents by explaining key information, main and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the explanation is easy to understand, clear, and free of jargon."
  });

  const prompt = `Generate a ${length} length explanation of the document below: `;

  async function fileToGenerativePart(file) {
    const base64 = await toBase64(file);
    const data = base64.split(",")[1];
    const mimeType = base64.split(",")[0].split(";")[0].split(":")[1];
    return {
      inlineData: {
        data,
        mimeType
      },
    };
  }

  try {
    const filePart = await fileToGenerativePart(file);
    const generatedContent = await model.generateContent([filePart, prompt]);
    const response = generatedContent.response.text();
    const index = getValue("currentIndex");
    const history = await getData();
    history[index].inputData = {
      title: file.name,
      type: "file",
      data: `data:${filePart.inlineData.mimeType};base64,${filePart.inlineData.data}`
    };
    history[index].outputData = response;
    history[index].chat = [
      {
        role: "user",
        parts: [{ filePart }, { text }]
      },
      {
        role: "model",
        parts: [{ text: response }]
      }
    ];
    await saveData(history);
    return response;
  } catch (e) {
    console.log(e)
    return false;
  }
}