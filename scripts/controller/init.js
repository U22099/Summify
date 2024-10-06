export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {

    this.view.runAddEventListener("open-nav", "click", () => {
      const sideBar = this.view.runGetElement(".side-bar")
      sideBar.style.opacity = "1";
      sideBar.classList.toggle(".animate-open-side-bar");
    });

    this.view.runAddEventListener("close-nav", "click", () => {
      const sideBar = this.view.runGetElement(".side-bar")
      sideBar.style.opacity = "0";
      sideBar.classList.toggle(".animate-close-side-bar");
    });
  }
}