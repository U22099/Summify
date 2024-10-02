export const insertHTML = (elementId, htmlText, position) => {
  
  // get the selected element and assign it to a variable 
  const element = document.getElementById(elementId);
  
  
  // check if the element is valid
  if (!element) {
    console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
  } else {
    element.insertAdjacentHTML(position, htmlText); // insert Html text at specified position
  }
  
}
''