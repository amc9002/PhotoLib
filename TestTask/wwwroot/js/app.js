/*global app */
class App {
    constructor() {
        this.storage = new app.Store();
        this.model = new Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
    }
}
