'use strict';

class Model {
    constructor() {
        // fake data
        this.data = [
            {
                id: 1,
                src: "img/nintchdbpict000177689785.jpg",
                descr: "Queen Elizabeth II",
                lat: 25.262283665613012,
                long: 55.28102574386779
            },
            {
                id: 2,
                src: "img/Queen-Mary-Ship2-678x399.jpg",
                descr: "Queen Mary",
                lat: 33.7528882877576,
                long: -118.18976604985308
            },
            {
                id: 3,
                src: "img/1024px-The_Cutty_Sark_2005-01-24.jpg",
                descr: "Cutty Sark",
                lat: 51.48288562451109,
                long: -0.009602016066953408
            },
            {
                id: 4,
                src: "img/Dar-Pomorza.jpg",
                descr: "Dar Pomorza",
                lat: 54.51963008070638,
                long: 18.55284670392696
            },
            {
                id: 5,
                src: "img/Royal-Yacht-Britannia-e1593443668468-1024x500.jpg",
                descr: "The Royal Yacht Britannia",
                lat: 55.98231143951744,
                long: -3.1772518154134617
            },
            {
                id: 6,
                src: "img/Discovery.jpg",
                descr: "Discovery",
                lat: 56.45692619861102,
                long: -2.9679623365134353
            },
            {
                id: 7,
                src: "img/uss-constitution-167366cf2fa4cd30.jpg",
                descr: "Constitution",
                lat: 42.37246479091648,
                long: -71.0565651081412
            },
            {
                id: 8,
                src: "img/Japanese_battleship_Mikasa_in_Yokohama.jpg",
                descr: "Mikasa",
                lat: 35.285225496055794,
                long: 139.67435824746588
            },
            {
                id: 9,
                src: "img/main-qimg-5052ea1fb9f097167cee4763009d5f06.jfif",
                descr: "United States",
                lat: 39.91853499023072,
                long: -75.13661747002956
            },
        ];

        this.image = image;
    }


    create(descr, callback) {
        descr = descr || '';
        callback = callback || function () { };

        var newItem = {
            descr: descr.trim(),
            completed: false
        };

        this.storage.save(newItem, callback);
    }

    createFake(name) {
        const id = Date.now();
        this.data.push({
            id: id,
            src: `img / ${name}`,
            descr: `File ${name}`,
            lat: Math.random() * 180.0 - 90.0,
            long: Math.random() * 360.0 - 180.0
        });
    }



    read(id, callback) {

        let url = `${document.location.href}testtask`;
        if (id !== null) {
            url += `/${id}`;
        }

        fetch(url)
            .then(response => {
                const obj = response.json();
                return (id !== null) ? Image.fromGenericObject(obj) : obj.map((ob) => Image.fromGenericObject(ob));
            })
            .then(data => callback(data));
    }

    update(id, item) {
        var index = this.data.findIndex(x => x.id.toString() === id.toString());
        if (index !== -1) {
            this.data[index] = item;
        }
    }

    delete(id, callback) {
        this.storage.delete(id, callback);
    }
}
