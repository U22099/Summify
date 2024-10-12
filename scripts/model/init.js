import { TextSummary, FileSummary } from './functions/summarise.js';
import { GenerateFlashCardsForText, GenerateFlashCardsForFile } from './functions/generate-flashcards.js';
import { TextExplanation, FileExplanation } from './functions/explain.js';
import SummaryChat from './functions/summary-chat.js';
import getPdfMeta from './functions/get-pdf-meta.js';
import { storeValue, getValue } from './utils/storage.js';
import { saveData, getData } from './utils/indexed-db.js';
import textToSpeech from './utils/text-to-speech.js';
import speechToText from './utils/speech-to-text.js';
import textToPdf from './utils/text-to-pdf.js';
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
  async runFileSummary(text, length) {
    return await FileSummary(text, length);
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
  async runFileExplanation(file, length) {
    return await FileExplanation(file, length);
  }

  //starts chat about summary
  async runSummaryChat(text) {
    return await SummaryChat(text);
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
  async runTextToPdf(summary){
    const meta = await this.getMeta(summary);
    textToPdf(summary, JSON.parse(meta));
  }
  
  //gets meta tags for pdf eg title, subject and keywords
  async getMeta(summary){
    return await getPdfMeta(summary);
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