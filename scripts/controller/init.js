export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {

    this.initSideBarOpen();

    this.initSideBarClose();

    this.view.runAddEventListener("summary", "click", () => {
      this.view.runInsertHTML("input-popup", this.view.getInputPopupHtml().PopupHtml, "afterbegin");
      this.initPopupNav();
      this.initPopupBtn("summary");
    });

    this.view.runAddEventListener("explanation", "click", () => {
      this.view.runInsertHTML("input-popup", this.view.getInputPopupHtml().PopupHtml, "afterbegin");
      this.initPopupNav();
      this.initPopupBtn("explanation");
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

  changeActiveBtn(id){
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
      this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().ImageInputHtml(null, "none"), "afterbegin");
      this.view.runAddEventListener("input-popup-image-input", "change", async (e) => {

        console.log(e.target)
        const data = await this.model.runToBase64(e.target.files[0]);

        this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().ImageInputHtml(data, "flex"), "afterbegin");
      });
    });

    this.view.runAddEventListener("input-popup-document", "click", () => {
      this.changeActiveBtn("input-popup-document");
      this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().FileInputHtml(null, "none"), "afterbegin");
      this.view.runAddEventListener("input-popup-file-input", "change", async (e) => {

        const data = await this.model.runToBase64(e.target.files[0]);

        this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().FileInputHtml(data, "flex"), "afterbegin");
      });
    });
  }

  initPopupBtn(type) {
    this.view.runAddEventListener("input-popup-btn", "click", async () => {
      const input = {
        data: this.getInputData(),
        type: this.view.runGetElement(".active-btn").innerText.toLowerCase(),
        length: this.view.runGetInput("input-popup-length", "string")
      };
      console.log(input);
      //await this.model.init(type);
    });
  }

  getInputData() {
    const activeBtn = this.view.runGetElement(".active-btn").innerText.toLowerCase();

    switch (activeBtn) {
      case "text":
        return this.view.runGetInput("input-popup-text-input", "string");
      case "image":
        return this.view.runGetInput("input-popup-image-input", "file");
      case "document":
        return this.view.runGetInput("input-popup-file-input", "file");
    }
  }
}