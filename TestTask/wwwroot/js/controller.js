'use strict';

class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.handlers = {
            'SelectImage': (id) => this.editImage(id),
            'EditDescription': (id, descr) => this.editDescr(id, descr),
            'UploadFile': () => this.uploadFile(),
        };
    }

    showAll() {
        const data = this.model.read();
        this.view.showImages(data, this.handlers);
    }

    editImage(id) {
        const item = this.model.read(id);
        if (item) {
            this.view.editImage(item, this.handlers);
        }
    }

    editDescr(id, descr) {
        const item = this.model.read(id);
        if (item) {
            item.descr = descr;
            this.model.update(id, item);
        }
    }

    async uploadFile() {
        let formData = new FormData();
        formData.append("file", fileupload.files[0]);
        await fetch(' /index.html ', {
            method: " POST ",
            body: formData
        });
        alert('The file has been uploaded successfully.');
    }
}
