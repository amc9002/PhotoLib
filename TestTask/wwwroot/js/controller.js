'use strict';

class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.handlers = {
            'SelectImage': (id) => this.editImage(id),
            'EditDescription': (id, descr) => this.editDescr(id, descr),
            'UploadFile': (fileupload) => this.uploadFile(fileupload),
        };
    }

    showAll() {
        this.view.bind(this.handlers);
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

    async uploadFile(fileupload) {
        let formData = new FormData();
        formData.append("file", fileupload.files[0]);
        if (window.location.origin !== 'file://') {
            await fetch(' /index.html ', {
                method: " POST ",
                body: formData
            });
        }
        else {
            this.model.createFake(fileupload.files[0].name);
        }
        alert(`The file ${fileupload.files[0].name} has been uploaded successfully.`);

        this.showAll();
    }
}
