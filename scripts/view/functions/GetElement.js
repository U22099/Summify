export const GetElement = (identifier, all) => {

 // get the element with the id
 let element = document.querySelector(identifier)
 
 if(all){
    element = Array.from(document.querySelectorAll(identifier));
 }
 
 // check if selected element is valid 
 if (element) {
  
   return element;
   
 } else {
  
   console.error(`Element with the identifier of ${identifier.toUpperCase()} is not found`);
   return null;
 } 
 
}
