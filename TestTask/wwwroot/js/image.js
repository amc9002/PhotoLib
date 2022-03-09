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
        var group = this.exif.find(g => g.Name === groupName);
        if (group) {
            var tag = group.Tags.find(t => t.TagName === tagName);
            if (tag) return tag.Description;
        } 
        return null;
    }

    getFullExif() {
        if (this.exif)
            return this.exif; 
        
        return null;
    }
}