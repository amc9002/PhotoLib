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

    getExif(groupName, tagName) {

        var group, data;

        for (let i = 0; i < this.exif.length; i++) {
            if (this.exif[i].Name === groupName) {
                group = this.exif[i];
                for (let j = 0; j < group.Tags.length; j++) {
                    if (group.Tags[j].TagName === tagName) {
                        data = group.Tags[j].Description;
                        return data;
                    }
                }
            }
        }
        return "";
    }


    //    return this.exif
    //        .filter(e => e === groupName)
    //        .filter(t => t === tagName)
    //        .filter(key => key === "Description");
    //}
}