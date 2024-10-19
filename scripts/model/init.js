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


export default class Model {
  
  //initialise a new document history
  async init(action){
    const history = await getData() || [];
    storeValue("currentIndex", history.length || 0);
    history.push({
      action,
      inputData: {
        title: null,
        type: null,
        data: null
      },
      outputData: null,
      chat: [],
      flashcards: []
    });
    await saveData(history);
  }
  
  runStoreValue(name, value){
    storeValue(name, value);
  }
  
  getStoredValue(name){
    return getValue(name);
  }
  
  async getHistory(){
    return await getData() || [];
  }
  
  //Destroy history data
  async destroy(){
    storeValue("currentIndex", 0);
    await saveData([]);
  }
  
  //change current history index
  changeCurrentIndex(index){
    storeValue("currentIndex", index);
  }
  
  //gets summary for text
  async runTextSummary(text, length) {
    return await TextSummary(text, length);
  }

  //gets summary for files
  async runFileSummary(text, length, isNew = true) {
    return await FileSummary(text, length, isNew);
  }

  //gets flashcards for text
  async runGenerateFlashCardsForText(text) {
    return await GenerateFlashCardsForText(text);
  }

  //gets flashcards for files
  async runGenerateFlashCardsForFile(file) {
    return await GenerateFlashCardsForFile(file);
  }

  //gets explanation for text
  async runTextExplanation(text, length) {
    return await TextExplanation(text, length);
  }

  //gets explanation for files
  async runFileExplanation(file, length, isNew = true) {
    return await FileExplanation(file, length, isNew);
  }

  //starts chat about summary
  async runChat(text) {
    return await Chat(text);
  }
  
  //converts text fo speech
  runTextToSpeech(text = null){
    textToSpeech(text);
  }
  
  //converts speech to text
  runSpeechToText(callback){
    return speechToText(callback);
  }
  
  //converts text to pdf
  async runTextToFile(input){
    const title = await this.getTitle(input);
    textToFile(input, title);
  }
  
  //gets meta tags for pdf eg title, subject and keywords
  async getTitle(input){
    return await getPdfTitle(input);
  } 
  
  async runToBase64(file){
    return await toBase64(file);
  }
  
  runMarkdownToHtml(markdown){
    return markdownToHtml(markdown);
  }
  
  runCopyToClipboard(text){
    copyToClipboard(text);
  }
  
  runMarkdownToText(markdown){
    return markdownToText(markdown);
  }
}