export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    
    this.view.runAddEventListener("open-nav", "click", () => {
      this.view.runGetElement(".side-bar").style.visibility = "visible";
    });
    
    this.view.runAddEventListener("close-nav", "click", () => {
      this.view.runGetElement(".side-bar").style.visibility = "hidden";
    });
  }
}