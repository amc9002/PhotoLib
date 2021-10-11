'use strict';

//import * as simplemdeMin from "../lib/simplemende/simplemde.min";

class View {

    constructor() {
        this.$imageList = $('.ImageList');
        this.$currentImage = $('.CurrentImage');
        this.$exif = $('.Exif');
        this.$iframe = $('iframe');
        this.$simplemde = new SimpleMDE(
            {
                element: $(".Descr textarea")[0],
                spellChecker: false,
                status: false
            });
        this.$btnSave = $('.Save');
        this.$btnUpload = $('.Upload');
        this.$fileupload = $('.custom-file-input');
    }

    bind(handlers) {
        //bind the 'UploadFile' event
        const handler = handlers['UploadFile'];
        this.$btnUpload.off('click');
        this.$btnUpload.on('click', (e) => {
            handler(this.$fileupload[0]);
        });

        //bind the 'ShowFileName' event
        $('input[type="file"]').change(function (e) {
            var fileName = e.target.files[0].name;
            $('.custom-file-label').html(fileName);
        });
    }

    showImages(data, handlers) {
        // create images
        let html = '';
        data.forEach((x) => {
            html += `<div class="item" data-id="${x.id}">`
                + `<img src="${x.src}">`
                + `</div>`;
        });
        this.$imageList.html(html);

        // bind the 'SelectImage' event
        const handler = handlers['SelectImage'];
        this.$imageList.find('div.item').on('click', (e) => {
            const id = $(e.currentTarget).data('id');
            handler(id);
        });
    }

    editImage(item, handlers) {
        // TODO: render everything here:
        // the image, the EXIF info, the map, the description
        let html = `<img class="BigImage" src="${item.src}" />`;
        this.$currentImage.html(html);

        let exif = ` lat "${item.lat}" <br> long "${item.long}" `;
        this.$exif.html(exif);

        var zoomLevel = 17;
        let mapUrl = `http://maps.google.com/maps?z=${zoomLevel}&t=k&q=loc:${item.lat}+${item.long}&output=embed`;
        this.$iframe.attr('src', mapUrl);
        this.$simplemde.value(item.descr);
        this.$btnSave.attr('data-id', item.id);

        // bind the 'EditDescription' event
        const handler = handlers['EditDescription'];
        this.$btnSave.off('click');
        this.$btnSave.on('click', (e) => {
            const id = $(e.currentTarget).attr('data-id');
            handler(id, this.$simplemde.value());
        });
    }


}
