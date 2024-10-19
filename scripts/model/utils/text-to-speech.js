// Function to convert text to speech using the browser's Text-to-Speech API.
export default function textToSpeech(text) {
  // Gets the speech synthesis object, using window.speechSynthesis as a fallback.
  const speech = speechSynthesis || window.speechSynthesis;
  // If no text is provided, cancel any ongoing speech synthesis.
  if (!text) {
    speech.cancel(); // Cancels any currently speaking utterance.
  } else {
    speech.cancel(); // Cancels any currently speaking utterance.
    // Creates a new SpeechSynthesisUtterance object.
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text; // Sets the text for the utterance.
    speech.speak(utterance); // Starts speaking the utterance.
  }
}