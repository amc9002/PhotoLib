'use strict';

class Image {
    constructor(id, src, descr, lat, long) {
        this.id = id;
        this.src = src;
        this.descr = descr;
        this.lat = lat;
        this.long = long;
    }

    static fromGenericObject(obj) {
        const img = new Image();
        Object.assign(img, obj);
        return img;
    }
}