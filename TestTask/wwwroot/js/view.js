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
        this.$btn = $('.Btn');
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
        this.$btn.attr('data-id', item.id);

        // bind the 'EditDescription' event
        const handler = handlers['EditDescription'];
        this.$btn.off('click');
        this.$btn.on('click', (e) => {
            const id = $(e.currentTarget).attr('data-id');
            handler(id, this.$simplemde.value());
        });

        

        console.log(mapUrl);
    }
}
