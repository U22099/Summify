export const GetElement = (identifier) => {

 // get the element with the id
 const element = document.querySelector(identifier);
 
 // check if selected element is valid 
 if (element) {
   return element
 } else {
   console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
   return null
 } 
 
}
