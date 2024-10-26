// Controller class manages the application flow, interacting with the Model and View.
export default class Controller {
  // Constructor initializes the Controller with Model and View instances.
  constructor(model, view) {
    this.model = model; // Reference to the Model (data and logic).
    this.view = view;   // Reference to the View (UI).
    this.action = "";   // Stores the current action (summary, explanation).
    this.image;         // Stores the selected image file.
    this.file;          // Stores the selected document file.
    this.recognition;   // Stores the speech recognition instance.
  }

  // Initializes the Controller, setting up event listeners and updating the history.
  async init() {
    // Initialize side bar opening functionality.
    this.initSideBarOpen();
    // Initialize side bar closing functionality.
    this.initSideBarClose();

    // Add event listener for summary button click.
    this.view.runAddEventListener("summary", "click", () => {
      // Insert input popup HTML.
      this.view.runInsertHTML("input-popup-container", this.view.getInputPopupHtml().PopupHtml, "afterbegin");
      this.action = "summary"; // Set the action to 'summary'.
      this.initPopupClose();   // Initialize popup closing functionality.
      this.initPopupNav();    // Initialize popup navigation functionality.
      this.initPopupBtn();    // Initialize popup button functionality.
    });

    // Add event listener for explanation button click.
    this.view.runAddEventListener("explanation", "click", () => {
      // Insert input popup HTML.
      this.view.runInsertHTML("input-popup-container", this.view.getInputPopupHtml().PopupHtml, "afterbegin");
      this.action = "explanation"; // Set the action to 'explanation'.
      this.initPopupClose();    // Initialize popup closing functionality.
      this.initPopupNav();     // Initialize popup navigation functionality.
      this.initPopupBtn();     // Initialize popup button functionality.
    });

    // Add event listener for new chat button click.
    this.view.runAddEventListener("new-chat", "click", async () => {
      const page = this.view.runGetElement("#main-container"); // Check if the main container exists.
      //If the main container doesn't exist, remove the result page and insert the initial page.
      if (!page) {
        this.view.runRemoveElement("main", "result-page-container");
        this.view.runInsertHTML("main", this.view.getPageHtml().initPageHtml(), "beforeend", false);
      }
      await this.init(); // Re-initialize the controller.
    });

    // Add event listener for clear history button click.
    this.view.runAddEventListener("clear-history", "click", async () => {
      await this.model.destroy(); // Clear the history in the model.
      await this.updateHistory(); // Update the history in the view.
    });

    await this.updateHistory(); // Update the history on initialization.
    this.initHistoryButton();   // Initialize history button functionality.
  }

  // Initializes the side bar opening functionality.
  initSideBarOpen() {
    this.view.runAddEventListener("open-nav", "click", () => {
      this.sideBarOpen(); // Open the side bar.
    });
  }

  // Opens the side bar.
  sideBarOpen() {
    const sideBar = this.view.runGetElement(".side-bar"); // Get the side bar element.
    sideBar.classList.remove("animate-close-side-bar"); // Remove the closing animation class.
    sideBar.classList.toggle("animate-open-side-bar"); // Toggle the opening animation class.
    sideBar.style.visibility = "visible"; // Set the visibility to visible.
  }

  // Initializes the side bar closing functionality.
  initSideBarClose() {
    this.view.runAddEventListener("close-nav", "click", () => {
      this.sideBarClose(); // Close the side bar.
    });
  }

  // Closes the side bar.
  sideBarClose() {
    const sideBar = this.view.runGetElement(".side-bar"); // Get the side bar element.
    sideBar.classList.remove("animate-open-side-bar"); // Remove the opening animation class.
    sideBar.classList.toggle("animate-close-side-bar"); // Toggle the closing animation class.
    // Set timeout to hide the side bar after animation completes.
    setTimeout(() => { sideBar.style.visibility = "hidden"; }, 200);
  }

  // Initializes the popup closing functionality.
  initPopupClose() {
    this.view.runAddEventListener("input-popup-container", "click", (e) => {
      const popupElement = this.view.runGetElement(".input-popup"); // Get the popup element.
      //Close the popup if the click is outside the popup element
      if (e.target === popupElement) {
        this.popupClose(popupElement);
      }
    });
  }

  // Closes the popup.
  popupClose(popupElement) {
    popupElement.classList.remove("input-popup-close"); // Remove the closing animation class.
    popupElement.classList.toggle("input-popup-close"); // Toggle the closing animation class.
    //Set timeout to remove the popup after animation completes
    setTimeout(() => this.view.runRemoveElement("input-popup-container", "input-popup"), 800);
  }

  // Changes the active button in the popup.
  changeActiveBtn(id) {
    this.view.runRemoveClassName("input-popup-text", "active-btn");
    this.view.runRemoveClassName("input-popup-image", "active-btn");
    this.view.runRemoveClassName("input-popup-document", "active-btn");
    this.view.runAddClassName(id, "active-btn");
  }

  // Initializes the popup navigation functionality.
  initPopupNav() {
    // Add event listener for text input button click.
    this.view.runAddEventListener("input-popup-text", "click", () => {
      this.changeActiveBtn("input-popup-text"); // Change the active button.
      this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().TextInputHtml, "afterbegin"); // Insert text input HTML.
      this.initMic(); // Initialize microphone functionality.
    });

    // Add event listener for image input button click.
    this.view.runAddEventListener("input-popup-image", "click", () => {
      this.changeActiveBtn("input-popup-image"); // Change the active button.
      this.imageDisplay(null, "none"); // Display image input with default settings.
    });

    // Add event listener for document input button click.
    this.view.runAddEventListener("input-popup-document", "click", () => {
      this.changeActiveBtn("input-popup-document"); // Change the active button.
      this.fileDisplay(null, "none"); // Display file input with default settings.
    });
    this.initMic(); // Initialize microphone functionality.
  }

  // Initializes the microphone functionality.
  initMic() {
    this.view.runAddEventListener("mic", "click", (e) => {
      // Stop speech recognition if the button is already active.
      if (e.target.classList.contains("active-btn")) {
        this.recognition?.stop();
        e.target.classList.remove("active-btn");
        return;
      }
      // Start speech recognition
      e.target.classList.add("active-btn");
      document.getElementById("input-popup-text-input").value = ""; // Clear the text input.
      this.recognition = this.model.runSpeechToText((text) => {
        document.getElementById("input-popup-text-input").value = text; // Set the text input value.
      });
    });
  }

  // Displays the image input.
  imageDisplay(data, display) {
    this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().ImageInputHtml(data, display), "afterbegin");
    this.view.runAddEventListener("input-popup-image-input", "change", async (e) => {
      this.image = e.target.files[0]; // Get the selected image file.
      const data = await this.model.runToBase64(e.target.files[0]); // Convert the image to base64.
      this.imageDisplay(data, "flex"); // Display the image.
    });
  }

  // Displays the file input.
  fileDisplay(data, display) {
    this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().FileInputHtml(data, display), "afterbegin");
    this.view.runAddEventListener("input-popup-file-input", "change", async (e) => {
      this.file = e.target.files[0]; // Get the selected file.
      const data = await this.model.runToBase64(e.target.files[0]); // Convert the file to base64.
      this.fileDisplay(data, "flex"); // Display the file.
    });
  }

  // Initializes the popup button functionality.
  initPopupBtn() {
    this.view.runAddEventListener("input-popup-btn", "click", async () => {
      const data = this.getInputData(); // Get the input data.

      //Show toast message if no input data is available
      if (!data) {
        this.view.runShowToast("Please enter a valid input", 2000);
        return;
      };

      // Create input object with data, type and length
      const input = {
        data,
        type: this.view.runGetElement(".active-btn").innerText.toLowerCase(),
        length: this.view.runGetInput("input-popup-length", "string")
      };

      const icon = this.getIcon(input.type);   // Get the icon for the input type.
      const inputTitle = input.data.name || input.data?.slice(0, 60) || "Document"; // Get the input title.

      //Remove existing main container and insert result page
      this.view.runRemoveElement("main", "main-container");
      this.view.runInsertHTML("main", this.view.getPageHtml().resultPageHtml({
        icon,
        inputTitle,
        action: `${this.action[0].toUpperCase()}${this.action.slice(1)}` // Capitalize the action.
      }), "beforeend", false);
      this.popupClose(this.view.runGetElement(".input-popup")); // Close the popup.
      await this.runAction(input); // Run the action.
    });
  }

  // Runs the selected action (summary or explanation).
  async runAction(input) {
    await this.model.init(this.action); // Initialize the model with the selected action.
    const result = await this.getResult(input); // Get the result from the model.
    await this.displayResult(this.model.runMarkdownToHtml(result)); // Display the result in the view.
  }

  // Displays the result in the view.
  async displayResult(result) {
    this.view.runWriteToElement("result-output", result); // Write the result to the output element.
    this.resultPageInit(); // Initialize the result page functionality.
    await this.utilsInit();  // Initialize utility functions.
    await this.updateHistory(); // Update the history.
  }

  // Gets the result from the model based on the selected action and input type.
  async getResult(input) {
    try {
      // Get summary based on the input type
      if (this.action === "summary") {
        const response = input.type === "text" ?
          await this.model.runTextSummary(input.data, input.length) : ["image", "document"].includes(input.type) ?
          await this.model.runFileSummary(input.data, input.length) :
          null;
        return response;
      } else { // Get explanation based on the input type
        const response = input.type === "text" ?
          await this.model.runTextExplanation(input.data, input.length) : ["image", "document"].includes(input.type) ?
          await this.model.runFileExplanation(input.data, input.length) :
          null;
        return response;
      }
    } catch (e) {
      this.view.runShowToast("An error occured, Please try again later", 2500);
      console.log(e);
      return;
    }
  }

  // Gets the icon for the given input type.
  getIcon(type) {
    switch (type) {
      case "text":
        return "file";
      case "image":
        return "image";
      case "document":
        return "file";
      default:
        return "file";
    }
  }

  // Gets the input data based on the active button.
  getInputData() {
    const activeBtn = this.view.runGetElement(".active-btn").innerText.toLowerCase();

    switch (activeBtn) {
      case "text":
        return this.view.runGetInput("input-popup-text-input", "string");
      case "image":
        return this.image;
      case "document":
        return this.file;
      default:
        return this.file;
    }
  }

  // Updates the history in the view.
  async updateHistory() {
    const history = await this.model.getHistory(); // Get the history from the model.
    try {
      this.view.runInsertHTML("history", "", "afterbegin"); // Clear the history container.
      //If history has elements, loop through it and display each
      if (history.length) {
        history.forEach((x, i) => {
          const htmlText = this.view.getHistoryHtml().historyHtml(
            `${x?.action[0].toUpperCase()}${x?.action.slice(1)}`, x?.inputData?.title, i); // Generate the HTML for each history item.
          this.view.runInsertHTML("history", htmlText, "beforeend", false); // Insert the HTML into the history container.
        });
        //this.initHistoryButton(); //Re-initialise the history buttons
      } else {
        this.view.runInsertHTML("history", "", "afterbegin"); //Clear the history container if no history is available
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  // Initializes the history button functionality.
  initHistoryButton() {
    const btns = this.view.runGetElement(".history-btn", true); // Get all history buttons.
    btns.forEach((x, i) => {
      // Add event listener to each history button
      this.view.runAddEventListener(x, "click", async (e) => {
        const index = e.target.querySelector("input").value; // Get the index of the history item.
        this.model.runStoreValue("currentIndex", index); // Store the index in the model.
        await this.showHistoryResult(index); // Show the history result.
        if(this.view.runIsMobile()) this.sideBarClose(); // Close the side bar.
      });
    });
  }

  // Shows the history result.
  async showHistoryResult(index) {
    const history = await this.model.getHistory(); // Get the history from the model.
    const resultPage = this.view.runGetElement("#result-page-container"); // Get the result page element.
    //If result page doesn't exist, show it in the main container, otherwise show it in the result page container
    if (!resultPage) {
      this.showResultPage(history[index], "main-container");
    } else {
      this.showResultPage(history[index], "result-page-container");
    }
    this.view.runWriteToElement("result-output", this.model.runMarkdownToHtml(history[index].outputData)); // Write the result to the output element.
    await this.utilsInit(); // Initialize utility functions.
  }

  // Shows the result page.
  showResultPage(history, container) {
    this.view.runRemoveElement("main", container); // Remove the existing container.
    this.view.runInsertHTML("main", this.view.getPageHtml().resultPageHtml({
      icon: this.getIcon(history?.inputData?.type), // Get the icon for the input type.
      inputTitle: history?.inputData?.title, // Get the input title.
      action: `${history?.action[0].toUpperCase()}${history?.action.slice(1)}` // Capitalize the action.
    }), "beforeend", false); // Insert the result page HTML.
    this.resultPageInit(); // Initialize the result page functionality.
  }

  // Initializes the result page functionality.
  resultPageInit() {
    // Add event listener for run action button click.
    this.view.runAddEventListener("run-action", "click", async (e) => {
      this.view.runRemoveClassName("result-main-container", "center");//Aligns page to start
      e.target.classList.add("active-btn"); // Add the active button class.
      this.view.runGetElement("#flash-card").classList.remove("active-btn"); // Remove the active button class from flash card button.
      this.view.runGetElement("#chat").classList.remove("active-btn"); // Remove the active button class from chat button.
      const history = await this.model.getHistory(); // Get the history from the model.
      const index = this.model.getStoredValue("currentIndex"); // Get the current index from the model.
      this.view.runInsertHTML("result-main-container", this.view.getResultHtml().homeHtml, "afterbegin"); // Insert the home HTML.
      this.view.runWriteToElement("result-output", this.model.runMarkdownToHtml(history[index].outputData)); // Write the result to the output element.
    });

    // Add event listener for flash card button click.
    this.view.runAddEventListener("flash-card", "click", async (e) => {
      this.view.runAddClassName("result-main-container", "center"); //Aligns page to center
      e.target.classList.add("active-btn"); // Add the active button class.
      this.view.runGetElement("#run-action").classList.remove("active-btn"); // Remove the active button class from run action button.
      this.view.runGetElement("#chat").classList.remove("active-btn");  // Remove the active button class from chat button.
      this.view.runInsertHTML("result-main-container", this.view.getResultHtml().flashCardHtml(), "afterbegin"); // Insert the flash card HTML.
      await this.flashCardInit(); // Initialize the flash card functionality.
    });

    // Add event listener for refresh button click.
    this.view.runAddEventListener("refresh", "click", async (e) => {
      this.view.runAddClassName("result-main-container", "center"); //Aligns page to center
      const summary = this.view.runGetElement("#run-action"); // Get the summary button.
      const flashCard = this.view.runGetElement("#flash-card"); // Get the flash card button.
      e.target.classList.add("active-btn"); // Add the active button class.
      e.target.classList.add("rotate");   // Add the rotate class.
      //If summary button is active, refresh the summary
      if (summary.classList.contains("active-btn")) {
        const index = this.model.getStoredValue("currentIndex"); // Get the current index from the model.
        const currentHistory = (await this.model.getHistory())[index]; // Get the current history item.
        const data = currentHistory.inputData; // Get the input data.

        let result;
        try {
          // Get summary or explanation based on the action and input type.
          if (currentHistory.action === "summary") {
            if (data.type === "text") {
              result = await this.model.runTextSummary(data.data, data.length)
            } else {
              result = await this.model.runFileSummary(data.data, data.length, false);
            }
          } else {
            if (data.type === "text") {
              result = await this.model.runTextExplanation(data.data, data.length)
            } else {
              result = await this.model.runFileExplanation(data.data, data.length, false);
            }
          }
        } catch (e) {
          this.view.runShowToast("An error occured, Please try again later", 2500);
          console.log(e);
          return;
        }
        this.view.runWriteToElement("result-output", this.model.runMarkdownToHtml(result)); // Write the result to the output element.
        //await this.utilsInit();
      } else if (flashCard.classList.contains("active-btn")) { // If flash card button is active, refresh the flash cards.
        this.view.runInsertHTML("result-main-container", this.view.getResultHtml().flashCardHtml(), "afterbegin"); // Insert the flash card HTML.
        await this.flashCardInit(true); // Initialize the flash card functionality.
      }
      e.target.classList.remove("active-btn"); // Remove the active button class.
      e.target.classList.remove("rotate");    // Remove the rotate class.
    });

    // Add event listener for chat button click.
    this.view.runAddEventListener("chat", "click", async (e) => {
      e.target.classList.add("active-btn"); // Add the active button class.
      this.view.runGetElement("#run-action").classList.remove("active-btn"); // Remove the active button class from run action button.
      this.view.runGetElement("#flash-card").classList.remove("active-btn"); // Remove the active button class from flash card button.
      this.view.runInsertHTML("result-main-container", this.view.getResultHtml().chatHtml, "afterbegin"); // Insert the chat HTML.
      await this.chatInit(); // Initialize the chat functionality.
    });
  }

  // Initializes the flash card functionality.
  async flashCardInit(refresh = false) {
    const data = await this.getFlashCards(refresh); // Get the flash cards from the model.
    // Show toast message if error occured while getting flashcards
    if (!data) {
      this.view.runShowToast("An error occured, Please try again later", 2500);
      return;
    }
    this.view.runInsertHTML("flash-card-page-container", "", "beforeend"); // Clear the flash card container.
    //Loop through the flashcard data and insert into the container
    JSON.parse(data).forEach((x, i) => {
      this.view.runInsertHTML("flash-card-page-container", this.view.getResultHtml().flashCardSnippet(x.question, x.answer), "beforeend", false);
    });
    // Add event listeners to each flash card.
    Array.from(this.view.runGetElement(".flash-card", true)).forEach(x => {
      x.addEventListener("click", () => {
        const element = x; // Get the flash card element.
        element.classList.remove("flip"); // Remove the flip class.
        element.classList.add("flip");   // Add the flip class.
        //Set timeout to show answer after flip animation
        setTimeout(() => {
          const questionElement = element.querySelector("#q"); // Get the question element.
          const answerElement = element.querySelector("#a"); // Get the answer element.
          questionElement.classList.toggle("hide"); // Toggle the hide class for the question element.
          answerElement.classList.toggle("hide"); // Toggle the hide class for the answer element.
          element.classList.remove("flip"); // Remove the flip class.
        }, 400);
      });
    });
  }

  // Gets the flash cards from the model.
  async getFlashCards(refresh) {
    const history = await this.model.getHistory(); // Get the history from the model.
    const index = this.model.getStoredValue("currentIndex"); // Get the current index from the model.
    //If flashcards are available and refresh is false, return the flashcards
    if (history[index].flashcards.length && !refresh) {
      return history[index].flashcards;
    } else if (history[index].inputData.type === "text") {
      console.log("text")
      const prompt = `
      Document:
      ${history[index].inputData.data}\n\n
      Summary:
      ${history[index].outputData}
      `;
      //Generate flashcards from text prompt
      return await this.model.runGenerateFlashCardsForText(prompt);
    } else {
      //Generate flashcards from file
      return await this.model.runGenerateFlashCardsForFile(history[index].inputData.data);
    }
  }

  // Initializes the utility functions.
  async utilsInit() {
    const history = await this.model.getHistory(); // Get the history from the model.
    const index = this.model.getStoredValue("currentIndex"); // Get the current index from the model.
    const currentHistory = history[index]; // Get the current history item.
    const markdown = currentHistory.outputData; // Get the output data.
    const data = this.model.runMarkdownToText(markdown); // Convert the markdown to text.
    const chatData = currentHistory.chat[currentHistory.chat.length - 1].role === "model" ? currentHistory.chat[currentHistory.chat.length - 1].parts[0].text : "Last message is not by AI"
    // Add event listener for copy button click.
    this.view.runAddEventListener("copy", "click", (e) => {
      try {
        e.target.classList.add("active-btn"); // Add the active button class.
        if(this.view.runGetElement("#chat").classList.contains("active-btn")){
          this.model.runCopyToClipboard(this.model.runMarkdownToText(chatData));
        } else {
          this.model.runCopyToClipboard(data); 
        }// Copy the data to the clipboard.
        this.view.runShowToast("copied", 2000); // Show a toast message.
      } catch (error) {
        this.view.runShowToast("error", 2000); // Show an error toast message.
        console.log(error.message);
      } finally {
        e.target.classList.remove("active-btn"); // Remove the active button class.
      }
    });

    // Add event listener for speak button click.
    this.view.runAddEventListener("speak", "click", (e) => {
      //Remove active class and stop speech if button is already active
      if (e.target.classList.contains("active-btn")) {
        e.target.classList.remove("active-btn");
        this.model.runTextToSpeech();
      } else {
        e.target.classList.add("active-btn"); // Add the active button class.
        if(this.view.runGetElement("#chat").classList.contains("active-btn")){
          this.model.runTextToSpeech(this.model.runMarkdownToText(chatData));
        } else {
          this.model.runTextToSpeech(data);
        }// Speak the data.
      }
    });

    // Add event listener for download button click.
    this.view.runAddEventListener("download", "click", async (e) => {
      e.target.classList.add("active-btn"); // Add the active button class.
      if(this.view.runGetElement("#chat").classList.contains("active-btn")){
          await this.model.runTextToFile(this.model.runMarkdownToText(chatData));
      } else {
          await this.model.runTextToFile(data);
      }// Download the data to a see file.
      e.target.classList.remove("active-btn"); // Remove the active button class.
    });

    // Add event listener for output switch button click.
    this.view.runAddEventListener("output-switch", "click", (e) => {
      //Remove active class and show markdown if button is already active
      if (e.target.classList.contains("active-btn")) {
        e.target.classList.remove("active-btn");
        this.view.runWriteToElement("result-output", this.model.runMarkdownToHtml(markdown));
      } else {
        e.target.classList.add("active-btn"); // Add the active button class.
        //If input type is file, show image or pdf based on the file type
        if (currentHistory.inputData.type === "file") {
          const fileData = currentHistory.inputData.data;
          let type;
          if (fileData.includes("image")) {
            type = "image";
          } else {
            type = "pdf";
          }
          const htmlPdf = `<object data="${fileData}" type="application/pdf" class="card"></object>`;
          const htmlImg = `<img src="${fileData}" alt="Input Image" class="card"/>`;
          const finalHtml = (type === "image") ? htmlImg : htmlPdf;
          this.view.runInsertHTML("result-output", finalHtml, "afterbegin");
        } else { // Otherwise, show the text data
          this.view.runWriteToElement("result-output", currentHistory.inputData.data);
        }
      }
    });
  }

  // Initializes the chat functionality.
  async chatInit() {
    const index = this.model.getStoredValue("currentIndex"); // Get the current index from the model.
    const history = (await this.model.getHistory())[index]; // Get the current history item.
    const chatHistory = history.chat || []; // Get the chat history.

    // Function to generate HTML snippet for chat messages.
    const htmlSnippet = (text, role) => {
      return `<div class="${role}">${text}</div>`;
    };

    this.view.runInsertHTML("chat-output", "", "afterbegin"); // Clear the chat output container.
    //Loop through the chat history and display each message
    chatHistory.forEach((chat, i) => {
      if (![0, 1].includes(i)) {
        this.view.runInsertHTML("chat-output", htmlSnippet(this.model.runMarkdownToHtml(chat.parts[0].text), chat.role), "beforeend", false);
      }
    });

    const outputContainer = this.view.runGetElement("#result-main-container"); // Get the chat output container.
    outputContainer.scrollTop = outputContainer.scrollHeight; // Scroll to the bottom of the container.

    // Add event listener for chat button click.
    this.view.runAddEventListener("chat-btn", "click", async (e) => {
      const input = this.view.runGetInput("chat-input", "string"); // Get the chat input.
      //Show toast message if input is empty
      if (!input) {
        this.view.runShowToast("Empty Input", 2000);
        return;
      }
      e.target.classList.remove("fa-paper-plane"); // Remove the paper plane class.
      e.target.classList.add("fa-spinner");     // Add the spinner class.
      e.target.classList.add("loading");        // Add the loading class.

      this.view.runInsertHTML("chat-output", htmlSnippet(input, "user"), "beforeend", false); // Insert the user input.
      this.view.runGetElement("#chat-input").value = "";  // Clear the chat input.
      outputContainer.scrollTop = outputContainer.scrollHeight; // Scroll to the bottom of the container.

      const response = await this.model.runChat(input); // Get the response from the model.

      this.view.runInsertHTML("chat-output", htmlSnippet(this.model.runMarkdownToHtml(response), "model"), "beforeend", false); // Insert the response.

      e.target.classList.remove("loading");       // Remove the loading class.
      e.target.classList.remove("fa-spinner");    // Remove the spinner class.
      e.target.classList.add("fa-paper-plane");   // Add the paper plane class.
    });
  }
}