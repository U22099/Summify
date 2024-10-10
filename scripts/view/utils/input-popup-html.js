const PopupHtml = `<div class="input-popup" id="input-popup">
    <div class="input-popup-body">
      <nav class="input-popup-nav">
        <p id="input-popup-text" class="active-btn">
          Text
        </p>
        <p id="input-popup-image">
          Image
        </p>
        <p id="input-popup-document">
          Document
        </p>
      </nav>
      <main class="input-popup-main" id="input-popup-main">
        <textarea type="text" placeholder="Paste in anything" id="input-popup-text-input">
        ## Summify: AI-Powered Content Summarizer Documentation

**Project Overview**

Summify is an AI-powered content summarizer that leverages the capabilities of the Gemini API to provide users with concise and informative summaries of various input formats. It offers a user-friendly interface for summarizing text, PDFs, and even image prompts. 

**Features**

* **Text Summarization/Explanation:**  Users can paste or type in text content to generate a summary.
* **PDF Summarization/Explanation:**  Users can upload PDF documents for summarization.
* **Image Summarization/Explanation:** Users can upload images for summarization, leveraging the Gemini API's image understanding capabilities.
* **Flash Cards:**  Based on the input document, the application generates flash cards with key points, promoting learning and knowledge retention.
* **Chat Interface:** Users can engage in a conversational chat interface to ask further questions about the summarized content.
* **IndexedDB History:**  A user's history of summarized documents is stored locally using IndexedDB for easy access and reference.
* **PDF Download:**  Users can download a PDF version of the generated summary pr explanation for offline access and sharing.

**Technology Stack**

* **Frontend:** HTML, CSS, JavaScript, and Vite
* **API:** Gemini API 
* **Library:** PDFMake (for PDF generation)

**Project Structure**

The project will be structured using a combination of components and modules, with a focus on clear separation of concerns:

* **Components:**
    * **Input Components:**
        * Text Input
        * PDF Upload
        * Image Upload
    * **Summarization Component:** Handles the summarization process using the Gemini API.
    * **Output Components:**
        * Summary Display
        * Flashcard View
        * Chat Interface
        * Download Button
    * **History Component:**  Manages IndexedDB for storing and retrieving summarized documents.

* **Modules:**
    * **API Module:** Handles communication with the Gemini API.
    * **Storage Module:**  Manages data storage and retrieval using IndexedDB.
    * **PDF Module:** Handles PDF generation using PDFMake.

**Workflow**

1. **Input:** Users choose their preferred input method (text, PDF, or image) and provide the content.
2. **Summarization/Explanation:**  The application uses the Gemini API to process the input and generate a summary or explanation.
3. **Output:**  The summary or explanation is displayed in a user-friendly format.
4. **Flash Cards:**  The app generates flash cards based on the summary.
5. **Chat:**  Users can engage in a conversational chat interface to ask further questions.
6. **History:**  The summary is stored in IndexedDB for later retrieval.
7. **Download:**  Users can download the summary as a PDF.

**Development Plan**

1. **Project Setup:**  Create the project structure, initialize Vite, and install necessary dependencies.
2. **Component Development:**  Build the UI components for input, output, and interaction.
3. **API Integration:**  Connect to the Gemini API and implement the summarization logic.
4. **Data Storage:**  Implement IndexedDB for storing summarization history.
5. **PDF Generation:**  Use PDFMake to generate PDF files for download.
6. **Testing:**  Thoroughly test all features and functionality.
7. **Deployment:**  Deploy the application to a web server.

This documentation will be updated throughout the development process to provide a comprehensive overview of Summify. 
        </textarea>
      </main>
      <footer class="input-popup-footer">
        <select name="input-popup-length" id="input-popup-length">
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
        <button id="input-popup-btn">Send</button>
      </footer>
    </div>
  </div>`;

const TextInputHtml = `<textarea type="text" placeholder="Paste in anything" id="input-popup-text-input">
## Summify: AI-Powered Content Summarizer Documentation

**Project Overview**

Summify is an AI-powered content summarizer that leverages the capabilities of the Gemini API to provide users with concise and informative summaries of various input formats. It offers a user-friendly interface for summarizing text, PDFs, and even image prompts. 

**Features**

* **Text Summarization/Explanation:**  Users can paste or type in text content to generate a summary.
* **PDF Summarization/Explanation:**  Users can upload PDF documents for summarization.
* **Image Summarization/Explanation:** Users can upload images for summarization, leveraging the Gemini API's image understanding capabilities.
* **Flash Cards:**  Based on the input document, the application generates flash cards with key points, promoting learning and knowledge retention.
* **Chat Interface:** Users can engage in a conversational chat interface to ask further questions about the summarized content.
* **IndexedDB History:**  A user's history of summarized documents is stored locally using IndexedDB for easy access and reference.
* **PDF Download:**  Users can download a PDF version of the generated summary pr explanation for offline access and sharing.

**Technology Stack**

* **Frontend:** HTML, CSS, JavaScript, and Vite
* **API:** Gemini API 
* **Library:** PDFMake (for PDF generation)

**Project Structure**

The project will be structured using a combination of components and modules, with a focus on clear separation of concerns:

* **Components:**
    * **Input Components:**
        * Text Input
        * PDF Upload
        * Image Upload
    * **Summarization Component:** Handles the summarization process using the Gemini API.
    * **Output Components:**
        * Summary Display
        * Flashcard View
        * Chat Interface
        * Download Button
    * **History Component:**  Manages IndexedDB for storing and retrieving summarized documents.

* **Modules:**
    * **API Module:** Handles communication with the Gemini API.
    * **Storage Module:**  Manages data storage and retrieval using IndexedDB.
    * **PDF Module:** Handles PDF generation using PDFMake.

**Workflow**

1. **Input:** Users choose their preferred input method (text, PDF, or image) and provide the content.
2. **Summarization/Explanation:**  The application uses the Gemini API to process the input and generate a summary or explanation.
3. **Output:**  The summary or explanation is displayed in a user-friendly format.
4. **Flash Cards:**  The app generates flash cards based on the summary.
5. **Chat:**  Users can engage in a conversational chat interface to ask further questions.
6. **History:**  The summary is stored in IndexedDB for later retrieval.
7. **Download:**  Users can download the summary as a PDF.

**Development Plan**

1. **Project Setup:**  Create the project structure, initialize Vite, and install necessary dependencies.
2. **Component Development:**  Build the UI components for input, output, and interaction.
3. **API Integration:**  Connect to the Gemini API and implement the summarization logic.
4. **Data Storage:**  Implement IndexedDB for storing summarization history.
5. **PDF Generation:**  Use PDFMake to generate PDF files for download.
6. **Testing:**  Thoroughly test all features and functionality.
7. **Deployment:**  Deploy the application to a web server.

This documentation will be updated throughout the development process to provide a comprehensive overview of Summify. 
</textarea>`;

const ImageInputHtml = (img, display) => `<label for="input-popup-image-input">
          <img src="${img}" alt="" style="display: ${display};"/>
          <span>
            <i class="fa-regular fa-image"></i>
            <span>Add Image</span>
          </span>
          <input type="file" name="image" id="input-popup-image-input" accept=".jpeg, .jpg, .png" hidden style="display: none;"/>
        </label>`;

const FileInputHtml = (file, display) => `<label for="input-popup-file-input">
          <object data="${file}" type="application/pdf" style="display: ${display};"></object>
          <span>
            <i class="fa-regular fa-file"></i>
            <span>Add File</span>
          </span>
          <input type="file" name="file" id="input-popup-file-input" accept=".pdf" hidden style="display: none;" />
        </label>`;
        
  export default {PopupHtml, TextInputHtml, ImageInputHtml, FileInputHtml}