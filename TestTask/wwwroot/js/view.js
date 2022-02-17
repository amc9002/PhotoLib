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
        this.$btnDelete = $(`.DeleteImage`);
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
        this.cleanImage();
    }

    editImage(item, handlers) {
        // TODO: render everything here:
        // the image, the EXIF info, the map, the description
        let html = `<img class="BigImage" src="${item.src}" />`;
        this.$currentImage.html(html);

        var latitude = item.getExif('GPS', 'GPS Latitude');
        var refLatitude = item.getExif('GPS', 'GPS Latitude Ref');
        var longitude = item.getExif('GPS', 'GPS Longitude');
        var refLongitude = item.getExif('GPS', 'GPS Longitude Ref');

        let exif = ` lat ${latitude}${refLatitude} <br> long ${longitude}${refLongitude} `;
        this.$exif.html(exif);

        html = `<button class="Btn Delete">Delete image</button>`;
        this.$btnDelete.html(html);

        var zoomLevel = 17;

        let latitudeGrad = this.latLongConvert(latitude);
        let longitudeGrad = this.latLongConvert(longitude);

        let mapUrl = `https://maps.google.com/maps?z=${zoomLevel}&t=k&q=loc:${latitudeGrad}` + ` ` + `${longitudeGrad}&output=embed`;
        this.$iframe.attr('src', mapUrl);

        this.$simplemde.value(item.descr);
        this.$btnSave.attr('data-id', item.id);
        this.$btnDelete.attr('data-id', item.id);

        // bind the 'EditDescription' event
        const handlerEdit = handlers['EditDescription'];
        this.$btnSave.off('click');
        this.$btnSave.on('click', (e) => {
            const id = $(e.currentTarget).attr('data-id');
            handlerEdit(id, this.$simplemde.value());
        });

        // bind the 'DeleteImage' event
        const handlerDelete = handlers['DeleteImage'];
        this.$btnDelete.off('click');
        this.$btnDelete.on('click', (e) => {
            const id = $(e.currentTarget).attr('data-id');
            handlerDelete(id);
        });

    }

    cleanImage() {
        this.$currentImage.html("");
        this.$iframe.attr('src', ``);
        this.$exif.html("");
        this.$simplemde.value("");
        this.$fileupload.html("");
    }

    latLongConvert(data) {
        var dataString = data.replace(/[^0-9,\s]/g, ' ');
        var dataArray = dataString.split(' ');
        let convertedData = parseInt(dataArray[0], 10) + parseInt(dataArray[1], 10) / 60 + parseInt(dataArray[2], 10) / 3600;
        return convertedData;
    }

}
