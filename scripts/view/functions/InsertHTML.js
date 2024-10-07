export const insertHTML = (elementId, htmlText, position, clear) => {
  
  // get the selected element and assign it to a variable 
  const element = document.getElementById(elementId);
  
  
  // check if the element is valid
  if (!element) {
    console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
  } else {
    if(clear){
      element.innerHTML = "";
    }
    element.insertAdjacentHTML(position, htmlText); // insert Html text at specified position
  }
  
}