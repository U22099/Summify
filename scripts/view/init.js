import { AddClassName } from './functions/AddClassName.js';
import { AddEventListener } from './functions/AddEventListener.js';
import { AppendElement } from './functions/AppendElement.js';
import { CreateElement } from './functions/CreateElement.js';
import { GetInput } from './functions/GetInput.js';
import { GetElement } from './functions/GetElement.js'
import { insertHTML } from './functions/InsertHTML.js';
import { RemoveClassName } from './functions/RemoveClassName.js';
import { RemoveElement } from './functions/RemoveElement.js';
import { WriteToElement } from './functions/WriteToElement.js';
import { StreamToElement } from './functions/StreamToElement.js';
import inputPopUpHtml from './utils/input-popup-html.js';
import pageHtml from './utils/page-html.js';
import historyHtml from './utils/history-html.js';
import resultHtml from './utils/result-html.js';
import showToast from './utils/showToast.js';
import isMobile from './utils/isMobile.js';
import addSwipeEventListener from './utils/swipe.js';


export default class View {
  
  // add class name method 
  runAddClassName(elementId, newClassName) {
    AddClassName(elementId, newClassName);
  }
  
  
 // add event listener method 
  runAddEventListener(elementId, type, callbackFunc) {
    AddEventListener(elementId, type, callbackFunc);
  }
  
 
 // append element method 
  runAppendElement(parentId, childElement) {
    AppendElement(parentId, childElement);
  }
  
 
  // create element method 
  runCreateElement(type) {
    return CreateElement(type);
  }
  
  
  // get element input method 
  runGetInput(elementId, type) {
    return GetInput(elementId, type);
  }
  
  
  // insertHtml text method 
  runInsertHTML(elementId, htmlText, position, clear = true) {
   insertHTML(elementId, htmlText, position, clear);
  }
  
  
  // remove class name method 
  runRemoveClassName(elementId, className) {
    RemoveClassName(elementId, className);
  }
  
  
  // remove element method 
  runRemoveElement(parentId, childElement) {
    RemoveElement(parentId, childElement);
  }
  
  
  //write to element method 
  runWriteToElement(elementId, text) {
    WriteToElement(elementId, text)
  }
  
  runStreamToElement(elementId, text) {
    StreamToElement(elementId, text)
  }
  
  //returns element
  runGetElement(identifier, all = false){
    return GetElement(identifier, all);
  }
  
  //returns dynamic html string for input popup
  getInputPopupHtml(){
    return inputPopUpHtml;
  }
  
  //returns dynamic html string for result page
  getPageHtml() {
    return pageHtml;
  }
  
  //returns dynamic html string for history navbar
  getHistoryHtml() {
    return historyHtml;
  }
  
  //returns dynamic html string for flash card page
  getResultHtml() {
    return resultHtml;
  }
  
  //For showing toast notifications
  runShowToast(message, delay){
    showToast(message, delay);
  }
  
  //Runs is mobile function
  runIsMobile(){
    return isMobile();
  }
  
  //Runs swipe eventlistner
  runAddSwipeEventListener(leftSwipeAction, rightSwipeAction){
   addSwipeEventListener(leftSwipeAction, rightSwipeAction);
  }
}
