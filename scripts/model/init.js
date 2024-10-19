// Imports necessary modules for various functionalities.
import { TextSummary, FileSummary } from './functions/summarise.js';
import { GenerateFlashCardsForText, GenerateFlashCardsForFile } from './functions/generate-flashcards.js';
import { TextExplanation, FileExplanation } from './functions/explain.js';
import Chat from './functions/chat.js';
import getPdfTitle from './functions/get-pdf-meta.js';
import { storeValue, getValue } from './utils/storage.js';
import { saveData, getData } from './utils/indexed-db.js';
import textToSpeech from './utils/text-to-speech.js';
import speechToText from './utils/speech-to-text.js';
import textToFile from './utils/text-to-file.js';
import toBase64 from './utils/to-base-64.js';
import markdownToHtml from './utils/markdown-to-html.js';
import copyToClipboard from './utils/copy-to-clipboard.js';
import markdownToText from './utils/markdown-to-txt.js';

// Model class handles data processing and interaction with external services.
export default class Model {
  // Initializes a new document history entry in IndexedDB.
  async init(action) {
    const history = await getData() || []; // Retrieves existing history or initializes an empty array.
    storeValue("currentIndex", history.length); // Stores the index of the new history entry.
    // Creates a new history object with default values.
    history.push({
      action, // Action type (summary, explanation).
      inputData: { // Input data object.
        title: null, // Title of the input.
        type: null, // Type of input (text, image, document).
        data: null // Input data itself.
      },
      outputData: null, // Output data (summary, explanation).
      chat: [], // Chat history.
      flashcards: [] // Flashcards generated from the input.
    });
    await saveData(history); // Saves the updated history to IndexedDB.
  }

  // Stores a value in local storage using the storage utility function.
  runStoreValue(name, value) {
    storeValue(name, value);
  }

  // Retrieves a value from local storage using the storage utility function.
  getStoredValue(name) {
    return getValue(name);
  }

  // Retrieves the history from IndexedDB using the indexedDB utility function.
  async getHistory() {
    return await getData() || [];
  }

  // Clears the history data from IndexedDB and resets the current index in local storage.
  async destroy() {
    storeValue("currentIndex", 0);
    await saveData([]);
  }

  // Changes the current history index in local storage.
  changeCurrentIndex(index) {
    storeValue("currentIndex", index);
  }

  // Generates a text summary using the summarization functions.
  async runTextSummary(text, length) {
    return await TextSummary(text, length);
  }

  // Generates a file summary using the summarization functions.
  async runFileSummary(text, length, isNew = true) {
    return await FileSummary(text, length, isNew);
  }

  // Generates flashcards from text using the flashcard generation functions.
  async runGenerateFlashCardsForText(text) {
    return await GenerateFlashCardsForText(text);
  }

  // Generates flashcards from a file using the flashcard generation functions.
  async runGenerateFlashCardsForFile(file) {
    return await GenerateFlashCardsForFile(file);
  }

  // Generates a text explanation using the explanation functions.
  async runTextExplanation(text, length) {
    return await TextExplanation(text, length);
  }

  // Generates a file explanation using the explanation functions.
  async runFileExplanation(file, length, isNew = true) {
    return await FileExplanation(file, length, isNew);
  }

  // Starts a chat session using the chat function.
  async runChat(text) {
    return await Chat(text);
  }

  // Performs text-to-speech conversion using the text-to-speech utility function.
  runTextToSpeech(text = null) {
    textToSpeech(text);
  }

  // Performs speech-to-text conversion using the speech-to-text utility function.
  runSpeechToText(callback) {
    return speechToText(callback);
  }

  // Converts text to a PDF file using the text-to-file utility function.
  async runTextToFile(input) {
    const title = await this.getTitle(input); // Gets the title for the PDF file.
    textToFile(input, title);
  }

  // Gets the title for a PDF file using the getPdfTitle function.
  async getTitle(input) {
    return await getPdfTitle(input);
  }

  // Converts a file to base64 using the toBase64 utility function.
  async runToBase64(file) {
    return await toBase64(file);
  }

  // Converts markdown to HTML using the markdown-to-html utility function.
  runMarkdownToHtml(markdown) {
    return markdownToHtml(markdown);
  }

  // Copies text to the clipboard using the copy-to-clipboard utility function.
  runCopyToClipboard(text) {
    copyToClipboard(text);
  }

  // Converts markdown to plain text using the markdown-to-txt utility function.
  runMarkdownToText(markdown) {
    return markdownToText(markdown);
  }
}