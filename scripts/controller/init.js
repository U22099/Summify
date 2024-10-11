export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.action = "";
    this.image;
    this.file;
  }

  async init() {

    this.initSideBarOpen();

    this.initSideBarClose();

    this.view.runAddEventListener("summary", "click", () => {
      this.view.runInsertHTML("input-popup-container", this.view.getInputPopupHtml().PopupHtml, "afterbegin");
      this.action = "summary";
      this.initPopupClose();
      this.initPopupNav();
      this.initPopupBtn();
    });

    this.view.runAddEventListener("explanation", "click", () => {
      this.view.runInsertHTML("input-popup-container", this.view.getInputPopupHtml().PopupHtml, "afterbegin");
      this.action = "explanation";
      this.initPopupClose();
      this.initPopupNav();
      this.initPopupBtn();
    });
    this.view.runAddEventListener("new-chat", "click", async () => {
      const page = this.view.runGetElement("#main-container")
      if (!page) {
        this.view.runRemoveElement("main", "result-page-container");
        this.view.runInsertHTML("main", this.view.getPageHtml().initPageHtml(), "beforeend", false);
      }
      await this.init();
    })
    this.view.runAddEventListener("clear-history", "click", async () => {
      await this.model.destroy();
      await this.updateHistory();
    });
    await this.updateHistory();
    this.initHistoryButton();
  }

  initSideBarOpen() {
    this.view.runAddEventListener("open-nav", "click", () => {
      this.sideBarOpen();
    });
  }

  sideBarOpen() {
    const sideBar = this.view.runGetElement(".side-bar")
    sideBar.classList.remove("animate-close-side-bar");
    sideBar.classList.toggle("animate-open-side-bar");
    sideBar.style.visibility = "visible";
  }

  initSideBarClose() {
    this.view.runAddEventListener("close-nav", "click", () => {
      this.sideBarClose();
    });
  }

  sideBarClose() {
    const sideBar = this.view.runGetElement(".side-bar")
    sideBar.classList.remove("animate-open-side-bar");
    sideBar.classList.toggle("animate-close-side-bar");
    setTimeout(() => { sideBar.style.visibility = "hidden"; }, 200);
  }

  initPopupClose() {
    this.view.runAddEventListener("input-popup-container", "click", (e) => {
      const popupElement = this.view.runGetElement(".input-popup");
      if (e.target === popupElement) {
        this.popupClose(popupElement)
      }
    })
  }

  popupClose(popupElement) {
    popupElement.classList.remove("input-popup-close");
    popupElement.classList.toggle("input-popup-close")
    setTimeout(() => this.view.runRemoveElement("input-popup-container", "input-popup"), 800);
  }

  changeActiveBtn(id) {
    this.view.runRemoveClassName("input-popup-text", "active-btn");
    this.view.runRemoveClassName("input-popup-image", "active-btn");
    this.view.runRemoveClassName("input-popup-document", "active-btn");
    this.view.runAddClassName(id, "active-btn");
  }

  initPopupNav() {

    this.view.runAddEventListener("input-popup-text", "click", () => {
      this.changeActiveBtn("input-popup-text");
      this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().TextInputHtml, "afterbegin");
    });

    this.view.runAddEventListener("input-popup-image", "click", () => {
      this.changeActiveBtn("input-popup-image");
      this.imageDisplay(null, "none");
    });

    this.view.runAddEventListener("input-popup-document", "click", () => {
      this.changeActiveBtn("input-popup-document");
      this.fileDisplay(null, "none");
    });
  }

  imageDisplay(data, display) {
    this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().ImageInputHtml(data, display), "afterbegin");
    this.view.runAddEventListener("input-popup-image-input", "change", async (e) => {

      this.image = e.target.files[0];
      const data = await this.model.runToBase64(e.target.files[0]);

      this.imageDisplay(data, "flex");
    });
  }

  fileDisplay(data, display) {
    this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().FileInputHtml(data, display), "afterbegin");
    this.view.runAddEventListener("input-popup-file-input", "change", async (e) => {

      this.file = e.target.files[0];
      const data = await this.model.runToBase64(e.target.files[0]);

      this.fileDisplay(data, "flex");
    });
  }

  initPopupBtn() {
    this.view.runAddEventListener("input-popup-btn", "click", async () => {
      const data = this.getInputData();

      if (!data) return null;

      const input = {
        data,
        type: this.view.runGetElement(".active-btn").innerText.toLowerCase(),
        length: this.view.runGetInput("input-popup-length", "string")
      };

      const icon = this.getIcon(input.type);

      const inputTitle = input.data.name || input.data?.slice(0, 25) || "Document";

      this.view.runRemoveElement("main", "main-container");
      this.view.runInsertHTML("main", this.view.getPageHtml().resultPageHtml({
        icon,
        inputTitle,
        action: `${this.action[0].toUpperCase()}${this.action.slice(1)}`
      }), "beforeend", false);
      this.popupClose(this.view.runGetElement(".input-popup"));
      await this.runAction(input);
    });
  }

  async runAction(input) {
    await this.model.init(this.action);
    const result = await this.getResult(input);
    await this.displayResult(this.model.runMarkdownToHtml(result));
  }

  async displayResult(result) {
    this.view.runWriteToElement("result-output", result);
    this.resultPageInit();
    await this.updateHistory();
  }

  async getResult(input) {
    if (this.action === "summary") {
      const response = input.type === "text" ?
        await this.model.runTextSummary(input.data, input.length) : ["image", "document"].includes(input.type) ?
        await this.model.runFileSummary(input.data, input.length) :
        null;

      return response;
    } else {
      const response = input.type === "text" ?
        await this.model.runTextExplanation(input.data, input.length) : ["image", "document"].includes(input.type) ?
        await this.model.runFileExplanation(input.data, input.length) :
        null;

      return response;
    }
  }

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

  async updateHistory() {
    const history = await this.model.getHistory();
    try {
      this.view.runInsertHTML("history", "", "afterbegin");
      if (history.length) {
        history.forEach((x, i) => {
          const htmlText = this.view.getHistoryHtml().historyHtml(
            `${x?.action[0].toUpperCase()}${x?.action.slice(1)}`, x?.inputData?.title, i);

          this.view.runInsertHTML("history", htmlText, "beforeend", false);
        })
        this.initHistoryButton();
      } else {
        this.view.runInsertHTML("history", "", "afterbegin");
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  initHistoryButton() {
    const btns = this.view.runGetElement(".history-btn", true);
    btns.forEach((x, i) => {
      this.view.runAddEventListener(x, "click", async (e) => {
        const index = e.target.querySelector("input").value;
        this.model.runStoreValue("currentIndex", index);
        await this.showHistoryResult(index);
        this.sideBarClose();
      })
    })
  }

  async showHistoryResult(index) {
    const history = await this.model.getHistory();
    const resultPage = this.view.runGetElement("#result-page-container");
    if (!resultPage) {
      this.showResultPage(history[index], "main-container");
    } else {
      this.showResultPage(history[index], "result-page-container");
    }
    this.view.runWriteToElement("result-output", this.model.runMarkdownToHtml(history[index].outputData));
  }

  showResultPage(history, container) {
    this.view.runRemoveElement("main", container);
    this.view.runInsertHTML("main", this.view.getPageHtml().resultPageHtml({
      icon: this.getIcon(history?.inputData?.type),
      inputTitle: history?.inputData?.title,
      action: `${history?.action[0].toUpperCase()}${history?.action.slice(1)}`
    }), "beforeend", false);
    this.resultPageInit();
  }

  resultPageInit() {

    this.view.runAddEventListener("run-action", "click", async (e) => {
      e.target.classList.add("active-btn");
      this.view.runGetElement("#flash-card").classList.remove("active-btn");
      this.view.runGetElement("#chat").classList.remove("active-btn");
      const history = await this.model.getHistory();
      const index = this.model.getStoredValue("currentIndex");
      this.view.runInsertHTML("result-main-container", this.view.getResultHtml().homeHtml, "afterbegin");
      this.view.runWriteToElement("result-output", this.model.runMarkdownToHtml(history[index].outputData));
    })

    this.view.runAddEventListener("flash-card", "click", async (e) => {
      e.target.classList.add("active-btn");
      this.view.runGetElement("#run-action").classList.remove("active-btn");
      this.view.runGetElement("#chat").classList.remove("active-btn");
      this.view.runInsertHTML("result-main-container", this.view.getResultHtml().flashCardHtml(), "afterbegin");
      await this.flashCardInit();
    });

    this.view.runAddEventListener("chat", "click", (e) => {
      e.target.classList.add("active-btn");
      this.view.runGetElement("#run-action").classList.remove("active-btn");
      this.view.runGetElement("#flash-card").classList.remove("active-btn");
      this.view.runInsertHTML("result-main-container", this.view.getResultHtml().chatHtml, "afterbegin");
    });
  }

  async flashCardInit() {
    const data = await this.getFlashCards();
    console.log(JSON.parse(data).length);
    if (!data) return null
    this.view.runInsertHTML("flash-card-page-container", "", "beforeend");
    JSON.parse(data).forEach((x,i) => {
      this.view.runInsertHTML("flash-card-page-container", this.view.getResultHtml().flashCardSnippet(x.question, x.answer), "beforeend", false);});
    Array.from(this.view.runGetElement(".flash-card", true)).forEach(x => {
      x.addEventListener("click", (e) => {
        const element = e.target;
        element.classList.remove("flip");
        element.classList.add("flip");

        const questionElement = element.querySelector("#q");
        const answerElement = element.querySelector("#a");

        questionElement.classList.toggle("hide");
        answerElement.classList.toggle("hide");
        element.classList.remove("flip");
      });
    });
  }

  async getFlashCards() {
    const history = await this.model.getHistory();
    const index = this.model.getStoredValue("currentIndex");
    if(history[index].flashcards.length){
      return history[index].flashcards;
    }
    if (history[index].inputData.type === "text") {
      const prompt = `
      Document:
      ${history[index].inputData.data}\n\n
      Summary:
      ${history[index].outputData}
      `;
      return await this.model.runGenerateFlashCardsForText(prompt);
    } else {
      return await this.model.runGenerateFlashCardsForFile(history[index].inputData.data);
    }
  }
}