export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.action = "";
    this.image;
    this.file;
  }

  init() {

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
  }

  initSideBarOpen() {
    this.view.runAddEventListener("open-nav", "click", () => {
      const sideBar = this.view.runGetElement(".side-bar")
      sideBar.classList.remove("animate-close-side-bar");
      sideBar.classList.toggle("animate-open-side-bar");
      sideBar.style.visibility = "visible";
    });
  }

  initSideBarClose() {
    this.view.runAddEventListener("close-nav", "click", () => {
      const sideBar = this.view.runGetElement(".side-bar")
      sideBar.classList.remove("animate-open-side-bar");
      sideBar.classList.toggle("animate-close-side-bar");
      setTimeout(() => { sideBar.style.visibility = "hidden"; }, 200);
    });
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
      
      if(!data) return null;
      
      const input = {
        data,
        type: this.view.runGetElement(".active-btn").innerText.toLowerCase(),
        length: this.view.runGetInput("input-popup-length", "string")
      };

      const icon = this.getIcon(input.type);

      const inputTitle = input.data.name || input.data?.slice(0,25) || "Document";

      this.view.runRemoveElement("main", "main-container");
      this.view.runInsertHTML("main", this.view.getResultPageHtml().resultPageHtml({
        icon,
        inputTitle,
        action: `${this.action[0].toUpperCase()}${this.action.slice(1)}`
      }), "beforeend", false);
      this.popupClose(this.view.runGetElement(".input-popup"));
      await this.runAction(input);
    });
  }
  
  async runAction(input){
    await this.model.init(this.action);
    const result = await this.getResult(input);
    console.log(result);
    await this.displayResult(result);
  }
  
  async displayResult(result){
    this.view.runStreamToElement("result-output", result);
    await this.updateHistory();
  }
  
  async getResult(input){
    console.log("called getResult");
    const response = input.type === "text" ? 
    await this.model.runTextSummary(input.data, input.length) 
    : 
    ["image", "document"].includes(input.type) ? 
    await this.model.runFileSummary(input.data, input.length) 
    : null
    
    console.log(response);
    return response;
  }
  
  getIcon(type){
    switch(type){
      case "text":
        return "file";
      case "image":
        return "image";
      case "document":
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
    }
  }
  
  async updateHistory(){
    const history = await this.model.getHistory();
    history.forEach((x, i) => {
      this.view.runInsertHTML("side-bar", this.view.getHistoryHtml().historyHtml(
        `${history.action[0].toUpperCase()}${history.action.slice(1)}`
        , history.inputData.title), "beforeend", false);
    })
  }
}