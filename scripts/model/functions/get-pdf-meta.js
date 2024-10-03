import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";


const schema = {
  description: "MetaTags",
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: "title",
      nullable: false,
    },
    subject: {
      type: SchemaType.STRING,
      description: "subject",
      nullable: false,
    },
    keywords: {
      type: SchemaType.ARRAY,
      description: "keywords",
      items: {
        type: SchemaType.STRING,
      }
    }
  },
  required: ["title", "subject", "keywords"],
};

export async function getPdfMeta(summary) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
    systemInstruction: "You are an expert at meta object generation, good at giving concise and meaningful titles, subject and keywords object from a documents.",
  });
  const prompt = "Generate an object of  title, subject and an array of keywords from the document below: ";

  try {
    const generatedContent = await model.generateContent(prompt + "\n" + summary);
    const response = generatedContent.response.text();
    return response;
  } catch (e) {
    console.log(e)
    return false;
  }

}