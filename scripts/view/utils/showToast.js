import toastHtml from './toast-html.js';
import { insertHTML } from '../functions/InsertHTML.js';
import { RemoveElement } from '../functions/RemoveElement.js';

export default function showToast(message,  delay){
  
  insertHTML("container", toastHtml(message), "afterbegin", false);
  
  setTimeout(() => {
    
    document.getElementById("toast-container").classList.add("toast-close");
    
    setTimeout(() => {
      RemoveElement("container", "toast-container");
    }, delay - 400);
    
  }, delay);
}