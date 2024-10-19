// Function to perform speech-to-text conversion using the browser's Speech Recognition API.
export default function speechToText(callback) {
  // Checks if the browser supports speech recognition.
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    console.log("not supported"); // Logs a message if speech recognition is not supported.
    callback('Speech recognition not supported in this browser.'); // Calls the callback with an error message.
    return; // Returns early if speech recognition is not supported.
  }

  // Creates a new SpeechRecognition instance, using webkitSpeechRecognition as a fallback.
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.interimResults = true; // Enables interim results (partial transcriptions).

  // Event handler for when speech recognition starts.
  recognition.onstart = () => {
    console.log('Speech recognition started'); // Logs a message when speech recognition starts.
  };

  // Event handler for when speech recognition ends.
  recognition.onend = () => {
    console.log('Speech recognition ended'); // Logs a message when speech recognition ends.
  };

  // Event handler for when speech recognition results are available.
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript; // Extracts the transcript from the event object.
    callback(transcript); // Calls the callback function with the transcript.
  };

  // Event handler for when a speech recognition error occurs.
  recognition.onerror = (error) => {
    console.error('Speech recognition error:', error); // Logs the error to the console.
  };

  recognition.start(); // Starts the speech recognition process.
  return recognition; // Returns the recognition object.
}