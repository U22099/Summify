import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";


const schema = {
  description: "Title",
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: "title",
      nullable: false,
    }
  },
  required: ["title"],
};

export default async function getPdfMeta(summary) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
    systemInstruction: "You are an expert at meta object generation, good at giving concise and meaningful titles from a documents.",
  });
  const prompt = "Generate an object of title from the document below, don't add an extension: ";

  try {
    const generatedContent = await model.generateContent(prompt + "\n" + summary);
    const response = generatedContent.response.text();
    return JSON.parse(response).title.split(".")[0];
  } catch (e) {
    console.log(e)
    return false;
  }

}