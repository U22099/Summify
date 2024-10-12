export default function speechToText(callback) {
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    console.log("not supported")
    callback('Speech recognition not supported in this browser.');
    return;
  }

  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.interimResults = true;

  recognition.onstart = () => {
    console.log('Speech recognition started');
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    callback(transcript);
  };

  recognition.onerror = (error) => {
    console.error('Speech recognition error:', error);
  };
  
  recognition.start();
  return recognition;
}