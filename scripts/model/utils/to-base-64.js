// Function to convert a file to its base64 representation.
export default function toBase64(file) {
  // Creates a new FileReader object.
  const reader = new FileReader();
  // Starts reading the file as a data URL.
  reader.readAsDataURL(file);
  // Returns a Promise that resolves with the base64 representation of the file or rejects with an error.
  const data = new Promise((resolve, reject) => {
    // Handles successful file reading.
    reader.onload = () => resolve(reader.result); // Resolves the Promise with the base64 data URL.
    // Handles file reading errors.
    reader.onerror = (err) => reject(err); // Rejects the Promise with the error.
  });
  return data; // Returns the Promise.
}