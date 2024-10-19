// Function to store a value in local storage under the "Summify" key.
export function storeValue(name, value) {
  // Retrieves existing Summify data from local storage or initializes an empty object if none exists.
  const summify = JSON.parse(localStorage.getItem("Summify")) || {};
  // Stores the given value under the specified name.
  summify[name] = value;
  // Saves the updated Summify data back to local storage.
  localStorage.setItem("Summify", JSON.stringify(summify));
}

// Function to retrieve a value from local storage under the "Summify" key.
export function getValue(name) {
  // Retrieves Summify data from local storage.
  const summify = JSON.parse(localStorage.getItem("Summify"));
  // Returns the value associated with the given name, or undefined if it doesn't exist.
  return summify ? summify[name] : undefined;
}

// Function to clear all data stored under the "Summify" key in local storage.
export function clearAll() {
  // Sets the Summify data in local storage to an empty JSON object, effectively clearing all stored values.
  localStorage.setItem("Summify", JSON.stringify({}));
}