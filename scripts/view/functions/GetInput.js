export const GetInput = (elementId, type) => {

 // get the input of the element with the inputed id and assign it to a variable 
 const input = document.getElementById(elementId);
 
 // check if selected element is valid 
 if (input) {
   
   // check if 'type' arg is a string 
   if (type == 'string')
     return input.value; // return the value
   
   // check if 'type' arg is select 
   else if (type == 'select')
     return input.value; //return the value
     
 } else {
   console.error(`Element with the id of ${elementId.toUpperCase()} is not found`);
 } 
 
}
