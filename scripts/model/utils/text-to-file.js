// Import the jsPDF library.
import { jsPDF } from "jspdf";

// Function to convert text to a PDF file and trigger a download.
export default function textToFile(text, title) {
  // Create a new jsPDF document.
  const doc = new jsPDF();
  // Get the page size of the document.
  const pageSize = doc.internal.pageSize;
  // Calculate the maximum width for text, considering margins.
  const maxWidth = pageSize.width - 20;
  // Set the line height for text.
  const lineHeight = 10;

  // Split the text into lines that fit within the maximum width.
  let lines = doc.splitTextToSize(text, maxWidth);
  // Initialize the y-coordinate for text placement.
  let y = 10;
  // Iterate over each line of text.
  for (let line of lines) {
    // Add the line of text to the document.
    doc.text(line, 10, y);
    // Update the y-coordinate for the next line.
    y += lineHeight;
    // Add a new page if the current page is full.
    if (y > pageSize.height - 20) {
      doc.addPage();
      y = 10;
    }
  }

  // Generate the PDF as a blob.
  const blob = doc.output('blob');
  // Create a URL for the blob.
  const url = URL.createObjectURL(blob);

  // Create a hidden anchor element to trigger the download.
  const a = document.createElement('a');
  a.href = url; // Set the URL of the anchor element.
  a.download = `${title}.pdf`; // Set the download filename.
  a.target = "_blank"; // Open the PDF in a new tab.
  a.click(); // Trigger the download.
  URL.revokeObjectURL(url); // Release the URL object.
}