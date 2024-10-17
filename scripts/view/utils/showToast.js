import toastHtml from './toast-html.js';
import { insertHTML } from '../functions/InsertHTML.js';
import { RemoveElement } from '../functions/RemoveElement.js';

export default function showToast(message,  delay){
  insertHTML("container", toastHtml(message), "afterbegin", false);
  setTimeout(() => {
    RemoveElement("container", "toast");
  }, delay);
}