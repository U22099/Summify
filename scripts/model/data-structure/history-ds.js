/*Tempate Structure of the History*/

const historyDs = [
  {
    action: "summary" || "explanation",
    inputData: {
      title: "...",
      type: "text" || "file",
      data: "..." || file,
      length: "..."
    },
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