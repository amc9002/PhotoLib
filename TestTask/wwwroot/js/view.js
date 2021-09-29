'use strict';

class View {

    constructor() {
        this.$imageList = $('.ImageList');
        this.$currentImage = $('.CurrentImage');
        this.$exif = $('.Exif');
        this.$descr = $('.Descr');
        this.$iframe = $('iframe');
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

        //let exif = '';
        //data.forEach((x) => {
        //    exif += ` <span class="Title"> title </span> "${x.title}", lat "${x.lat}", long "${x.long}" `
        //        + `<br>`;
        //});

        //this.$Exif.attr('style', 'border: 3px dotted blue; color: red'); 
        //this.$Exif.html(exif);


        // bind the 'SelectImage' event
        const handler = handlers['SelectImage'];
        this.$imageList.find('div.item').on('click', (e) => {
            const id = $(e.currentTarget).data('id');
            handler(id);
        });
    }

    editImage(item, handlers) {
        //this.$currentImage.html(item.src);
		// TODO: render everything here:
		// the image, the EXIF info, the map, the description
        let html = `<img class="BigImage" src="${item.src}" />`;
        this.$currentImage.html(html);

        let exif = `<span class="Title"> title </span> "${item.title}", lat "${item.lat}", long "${item.long}" `;
        this.$exif.html(exif);

        let mapUrl = `http://maps.google.com/maps?z=14&t=m&q=loc:${item.lat}+${item.long}&output=embed`;
        this.$iframe.attr('src', mapUrl);

        console.log(mapUrl);
    }
}
