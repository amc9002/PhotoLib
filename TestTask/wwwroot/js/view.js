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

        this.$exif.html(this.getExif(item));

        html = `<button class="Btn Delete">Delete image</button>`;
        this.$btnDelete.html(html);

        this.$iframe.attr('src', this.mapUrl(item, 17)); //Geolocation on Google Map

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

    //getting location
    getLocation(item) {
        var latitude = item.getExif('GPS', 'GPS Latitude');
        var longitude = item.getExif('GPS', 'GPS Longitude');

        return [latitude, longitude];
    }

    //conversion DD MM SS,SS to DD.DDDDD format
    latLongConvert(data) {
        var dataString = data.replace(/\s+/g, '').trim();
        dataString = dataString.replace(/[^-,0-9,\s]/g, ' ');
        var dataArray = dataString.split(' ');
        let convertedData = parseInt(dataArray[0], 10) + parseInt(dataArray[1], 10) / 60 + parseFloat(dataArray[2]) / 3600;
        return convertedData;
    }

    //creating URL for Google Maps 
    mapUrl(item, zoomLevel) {
        const [latitude, longitude] = this.getLocation(item);
        let latitudeGrad = this.latLongConvert(latitude);
        let longitudeGrad = this.latLongConvert(longitude);
        return `https://maps.google.com/maps?z=${zoomLevel}&t=k&q=loc:${latitudeGrad}` + `,` + `${longitudeGrad}&output=embed`;
    }

    getDevice(item) {
        let make = item.getExif('Exif IFD0', 'Make');
        let model = item.getExif('Exif IFD0', 'Model');
        let soft = item.getExif('Exif IFD0', 'Software');
        return ` <span class="Name">Manufacturer</span> ${make} <br> 
                        <span class="Name">Model</span> ${model} <br> 
                        <span class="Name">Software</span> ${soft} <br> `;
    }

    getDateTime(item) {
        let date = item.getExif('Exif SubIFD', 'Date/Time Original');
        return ` <span class="Name">Date and time</span> ${date} <br> `;
    }

    getCompression(item) {
        let comp = item.getExif('JPEG', 'Compression Type');
        return ` <span class="Name">Compression</span> ${comp} <br> `;
    }

    getExposureTime(item) {
        let exp = item.getExif('Exif SubIFD', 'Exposure Time');
        return ` <span class="Name">Exposure time</span> ${exp} <br> `;
    }

    getVersion(item) {
        let version = item.getExif('Exif SubIFD', 'Exif Version');
        return ` <span class="Name">Exif Version</span> ${version} <br> `;
    }

    //forming of EXIF string
    getExif(item) {
        let exifString = `<span class="Name"> Image Info </span> <br> <br>`;
        exifString += this.getDevice(item);
        exifString += this.getDateTime(item);
        exifString += this.getCompression(item);
        exifString += this.getExposureTime(item);
        exifString += this.getVersion(item);
        exifString += `<div><span><button class="BtnMore">More</button></span></div>`;

        return exifString;
    }
}
