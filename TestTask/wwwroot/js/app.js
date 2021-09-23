'use strict';

class App {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.controller = new Controller(this.model, this.view);
    }
}
