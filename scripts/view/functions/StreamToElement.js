export const StreamToElement = (elementId, text) => {
  
  // get selected element and assign it to a variable 
  const element = document.getElementById(elementId);
  
  
  // check if selected element is valid 
  if (!element)
    console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
  else 
   // stream the value of the 'text' arg as the text content of the selected element 
   stream(element, text)
   
}

function stream(element, text){
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 50);
}