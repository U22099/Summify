export const GetElement = (identifier, all) => {

 // get the element with the id
 let element = document.querySelector(identifier)
 if(all)
    element = document.querySelectorAll(identifier);
 
 // check if selected element is valid 
 if (element) {
   return element;
 } else {
   console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
   return null;
 } 
 
}
