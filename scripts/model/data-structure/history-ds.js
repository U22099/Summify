/*Tempate Structure of the History*/

const historyDs = [
  {
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