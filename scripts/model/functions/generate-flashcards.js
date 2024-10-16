import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import toBase64 from "../utils/to-base-64.js";
import { getData, saveData } from "../utils/indexed-db.js";
import { getValue } from "../utils/storage.js";

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

export async function GenerateFlashCardsForText(text) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
    systemInstruction: "You are an expert at flashcards generator, good at giving concise and meaningful flashcards Q&As from joint documents containing the document and its summary read by the user.",
  });
  const prompt = "Generate 20 flashcards of questions and answers from the joint documents containing the document and its summary read by the user, below: ";

  try {
    const generatedContent = await model.generateContent(prompt + "\n" + text);
    const response = generatedContent.response.text();
    const index = getValue("currentIndex");
    const history = await getData();
    history[index].flashcards = response;
    await saveData(history);
    return response;
  } catch (e) {
    console.log(e)
    return false;
  }

}

export async function GenerateFlashCardsForFile(file) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
    systemInstruction: "You are an expert at flashcards generator, good at giving concise and meaningful flashcards Q&As from documents.",
  });
  const prompt = "Generate 20 flashcards of questions and answers from the document in the file";

  async function fileToGenerativePart(file) {
    const base64 = file;
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
    history[index].flashcards = response;
    await saveData(history);
    console.log(response)
    return response;
  } catch (e) {
    console.log(e.message)
    return false;
  }
}