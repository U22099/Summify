export const RemoveClassName = (elementId, className) => {
  
  // set the element with the inputed id in a variable 
  const element = document.getElementById(elementId);
 
  // check if element is valid
  if (!element)
    console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
  else 
    // add class name to element
    element.classList.remove(className);
  
}
