export default function textToSpeech(text) {
  const speech = speechSynthesis || window.speechSynthesis;
  speech.cancel();
  const utterance = new SpeechSynthesisUtterance;
  utterance.text = text;
  speech.speak(utterance);
}