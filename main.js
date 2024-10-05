
console.log("wtart")
import Model from "scripts/model/init.js";
import View from "scripts/view/init.js";
import Controller from "scripts/controller/init.js";

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
//initialising application
controller.init();