export const WriteToElement = (elementId, text) => {
  
  // get selected element and assign it to a variable 
  const element = document.getElementById(elementId);
  
  
  // check if selected element is valid 
  if (!element)
    console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
  else 
   // set the value of the 'text' arg as the text content of the selected element 
   element.textContent = text;
   
}
