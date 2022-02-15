'use strict';

class Image {
    constructor(id, src, descr, exif) {
        this.id = id;
        this.src = src;
        this.descr = descr;
        this.exif = exif;

    }

    static fromGenericObject(obj) {
        const img = new Image();
        obj.exif = JSON.parse(obj.exif);
        Object.assign(img, obj);
        return img;
    }
}