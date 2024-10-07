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
      this.initPopupBtn();
    });

    this.view.runAddEventListener("explanation", "click", () => {
      this.view.runInsertHTML("input-popup", this.view.getInputPopupHtml().PopupHtml, "afterbegin");
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

  initPopupNav() {
    
    this.view.runAddEventListener("input-popup-text", "click", () => {
      this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().TextInputHtml, "afterbegin");
    });

    this.view.runAddEventListener("input-popup-image", "click", () => {
      this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().ImageInputHtml(null, "none"), "afterbegin");
      this.view.runAddEventListener("input-popup-image-input", "onchange", async (e) => {

        const data = await this.model.runToBase64(e.target.file.files[0]);

        this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().ImageInputHtml(data, "flex"), "afterbegin");
      });
    });

    this.view.runAddEventListener("input-popup-document", "click", () => {
      this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().FileInputHtml(null, "none"), "afterbegin");
      this.view.runAddEventListener("input-popup-file-input", "onchange", async (e) => {

        const data = await this.model.runToBase64(e.target.file.files[0]);

        this.view.runInsertHTML("input-popup-main", this.view.getInputPopupHtml().FileInputHtml(data, "flex"), "afterbegin");
      })
    });
  }

  initPopupBtn() {
    this.view.runAddEventListener("input-popup-btn", "click", async () => {
      await this.model.init("summary");
      const input = {
        data: this.getInputData(),
        type: this.view.runGetElement(".active-btn").innerText.toLowerCase().split("-")[2]
      };
      console.log(input);
    });
  }

  getInputData() {
    const activeBtn = this.view.runGetElement(".active-btn").innerText.toLowerCase();

    switch (activeBtn) {
      case "input-popup-text":
        return this.view.runGetInput("input-popup-text-input", "string");
      case "input-popup-image":
        return this.view.runGetInput("input-popup-image-input", "file");
      case "input-popup-document":
        return this.view.runGetInput("input-popup-file-input", "file");
    }
  }
}