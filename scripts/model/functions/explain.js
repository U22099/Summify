import { GoogleGenerativeAI } from "@google/generative-ai";
import toBase64 from "../utils/to-base-64.js";
import { getData, saveData } from "../utils/indexed-db.js";
import { getValue } from "../utils/storage.js";
import showToast from "../../view/utils/showToast.js";

export async function TextExplanation(text, length) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at content explanation good at giving concise and meaningful explanation of contents by explaining key information, main and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the explanation is easy to understand, clear, and free of jargon. Formatting your replies in nice and precise markdown format"
  });

  const prompt = `Generate a ${length} length explanation of the document below: `;

  try {
    const generatedContent = await model.generateContent(prompt + "\n" + text);
    const response = generatedContent.response.text();
    const index = getValue("currentIndex");
    const history = await getData();
    history[index].inputData = {
      title: text.slice(0, 30),
      type: "text",
      data: text,
      length
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
    showToast("An error occured, Please try again later", 2500);
    console.log(e)
    return false;
  }
}

export async function FileExplanation(file, length, isNew) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert at documents explanation good at giving concise and meaningful explanation of documents by explaining key information, main and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the explanation is easy to understand, clear, and free of jargon. Formatting your replies in nice and precise markdown format"
  });

  const prompt = `Generate a ${length} length explanation of the document below: `;

  async function fileToGenerativePart(file) {
    const base64 = isNew ? await toBase64(file) : file;
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
      title: file.name || history[index].inputData.title,
      type: "file",
      data: isNew ? `data:${filePart.inlineData.mimeType};base64,${filePart.inlineData.data}` : file,
      length
    };
    history[index].outputData = response;
    history[index].chat = [
      {
        role: "user",
        parts: [{ filePart }]
      },
      {
        role: "model",
        parts: [{ text: response }]
      }
    ];
    await saveData(history);
    return response;
  } catch (e) {
    showToast("An error occured, Please try again later", 2500);
    console.log(e)
    return false;
  }
}