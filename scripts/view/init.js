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
import inputPopUpHtml from './utils/input-popup-html.js';


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
  
  //returns element
  runGetElement(identifier){
    return GetElement(identifier);
  }
  
  //returns dynamic html string for input popup
  getInputPopupHtml(){
    return inputPopUpHtml;
  }
}
