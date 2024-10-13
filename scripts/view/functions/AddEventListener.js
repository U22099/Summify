export const AddEventListener = (elementId, type, callbackFunc) => {
  
  // set the element with the inputed id in a variable 
  const element = document.getElementById(elementId) || elementId;
  
  // checks if element with the inputed id is not found and then log an error to the console 
  if (!element)  {
    console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
  } else {
    element.removeEventListener(type, callbackFunc);
   // get element with the inputed id and attach an event listener to it.
    element.addEventListener(type, callbackFunc)
  }
  
}
