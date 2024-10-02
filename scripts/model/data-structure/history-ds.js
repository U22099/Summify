/*Tempate Structure of the History*/

const historyDs = [
  {
    inputType: "text" || "file",
    inputData: text || file,
    outputData: text,
    chat: [
      {
        role: "user",
        parts: [{ text }]
      },
      {
        role: "model",
        parts: [{ text: response }]
      }
    ],
    flashcards: [
      {
        q: "...",
        a: "..."
      }
    ],
  }
]