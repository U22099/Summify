export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.runAddEventListener("open-nav", "click", () => {
      this.view.runGetElement(".nav").style.visibility = "visible";
    });
    this.view.runAddEventListener("close-nav", "click", () => {
      this.view.runGetElement(".nav").style.visibility = "hidden";
    });
  }
}