'use strict';

class App {
    constructor() {
        this.storage = new Store();
        this.model = new Model(this.storage);
        this.template = new Template();
        this.view = new View(this.template);
        this.controller = new Controller(this.model, this.view);
    }
}
