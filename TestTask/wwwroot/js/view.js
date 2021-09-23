'use strict';

class View {

    constructor() {
        this.$imageList = $('.ImageList');
        this.$currentImage = $('.CurrentImage');
        this.$Exif = $('.Exif');
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

        let exif = '';
        data.forEach((x) => {
            exif += ` <span class="Title"> title </span> "${x.title}", lat "${x.lat}", long "${x.long}" `
                + `<br>`;
        });

        this.$Exif.attr('style', 'border: 3px dotted blue; color: red');
        this.$Exif.html(exif);


        // bind the 'click' event
        const handler = handlers['click'];
        this.$imageList.find('div.item').on('click', (e) => {
            const id = $(e.currentTarget).data('id');
            handler(id);
        });
    }

    editImage(item, handlers) {
        this.$currentImage.html(item.src);
		// TODO: render everything here:
		// the image, the EXIF info, the map, the description
        
    }
}
