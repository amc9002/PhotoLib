'use strict';

class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.handlers = {
            'SelectImage': (id) => this.editImage(id),
            'EditDescription': (id, descr) => this.editDescr(id, descr),
            'UploadFile': (fileupload) => this.uploadFile(fileupload),
            'DeleteImage': (id) => this.deleteImage(id),
        };
    }

    uploadFile(fileupload) {

        const callback = (itemImg) => {
            alert(`The file ${fileupload.files[0].name} has been uploaded successfully.`);
            this.showAll();
            this.view.editImage(itemImg, this.handlers);
        };
        const errorHandler = (text) =>  alert(text);

        const data = new FormData();
        data.append("file", fileupload.files[0]);
        
        this.model.create(data, errorHandler, callback);
    }

    showAll() {
        this.view.bind(this.handlers);

        const callback = (data) => {
            this.view.showImages(data, this.handlers);
        }
        this.model.read(null, callback);
    }

    editImage(id) {
        const callback = (itemImg) => {
            if (itemImg !== null)
                this.view.editImage(itemImg, this.handlers);
        }
        this.model.read(id, callback);
    }


    editDescr(id, descr) {
        const callback = (item) => {
            if (item) {
                item.descr = descr;
                this.model.update(id, item);
            }
        }
        this.model.read(id, callback);
    }

    deleteImage(id) {
        const callback = () => { this.showAll(); }
        var result = confirm("Are you sure?");
        if (result)
            this.model.delete(id, callback);
    }

}
