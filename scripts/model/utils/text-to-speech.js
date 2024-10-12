export default function textToSpeech(text) {
  const speech = speechSynthesis || window.speechSynthesis;
  if(!text){
    speech.cancel();
  } else {
    speech.cancel();
    const utterance = new SpeechSynthesisUtterance;
    utterance.text = text;
    speech.speak(utterance);
  }
}