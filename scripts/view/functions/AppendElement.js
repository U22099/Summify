export const AppendElement = (parentId, childElement) => {
  
  // get parent element 
  const parent = document.getElementById(parentId);
  
  // get child element 
  const child = document.getElementById(childElement);
  
  // check if either the parent element or child element is absent 
  if (!parent || !child) {
    console.error(`Make sure both child and parent element are present in the Dom`);
  } else {
    // append the child to the parent element 
    parent.appendChild(child);
  }
  
}