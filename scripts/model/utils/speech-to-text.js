export default function speechToText(callback){
  const recognition = new SpeechRecognition() || new webkitSpeechRecognition();
  recognition.interimResults = true;
  recognition.start();
  recognition.onstart = () => {
    return true;
  }
  recognition.onend = () => {
    return false;
  }
  recognition.onresult = (e) => {
     callback(e.results[0][0].transcript);
  }
  recognition.onerror = (e) => {
    console.log(e)
    return false;
  }
}