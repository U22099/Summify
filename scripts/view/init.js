import { AddClassName } from '/scripts/view/Utils/AddClassName.js';
import { AddEventListener } from '/scripts/view/Utils/AddEventListener.js';
import { AppendElement } from '/scripts/view/Utils/AppendElement.js';
import { CreateElement } from '/scripts/view/Utils/CreateElement.js';
import { GetInput } from '/scripts/view/Utils/GetInput.js';
import { InsertHtml } from '/scripts/view/Utils/InsertHTML.js';
import { RemoveClassName } from '/scripts/view/Utils/RemoveClassName.js';
import { RemoveElement } from '/scripts/view/Utils/RemoveElement.js';
import { WriteToElement } from '/scripts/view/Utils/WriteToElement.js';


export default class View {
  
  // add class name method 
  getAddClassName(elementId, newClassName) {
    AddClassName(elementId, newClassName);
  }
  
  
 // add event listener method 
  getAddEventListener(elementId, type, callbackFunc) {
    AddEventListener(elementId, type, callbackFunc);
  }
  
 
 // append element method 
  getAppendElement(parentId, childElement) {
    AppendElement(parentId, childElement);
  }
  
 
  // create element method 
  getCreateElement(type) {
    return CreateElement(type);
  }
  
  
  // get element input method 
  getGetInput(elementId, type) {
    return GetInput(elementId, type);
  }
  
  
  // insertHtml text method 
  getInsertHtml(elementId, htmlText, position) {
    InsertHtml(elementId, htmlText, position);
  }
  
  
  // remove class name method 
  getRemoveClassName(elementId, className) {
    RemoveClassName(elementId, className);
  }
  
  
  // remove element method 
  getRemoveElement(parentId, childElement) {
    RemoveElement(parentId, childElement);
  }
  
  
  //write to element method 
  getWriteToElement(elementId, text) {
    WriteToElement(elementId, text)
  }
  
  
}
