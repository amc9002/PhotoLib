'use strict';

class Model {
    constructor() {
        // fake data
		this.data = [
			{
				id: 1,
				src: "img/nintchdbpict000177689785.jpg",
				title: "title_1",
				lat: 25.15,
				long: 34.25
			},
			{
				id: 2,
				src: "img/image_2019_07_24T08_35_23_076Z-1bd827adeaad7c2ad727d015ff388060d71a6647.png",
				title: "title_2",
				lat: 45.15,
				long: 20.25
			},
			{
				id: 3,
				src: "img/EhXMP4JWsAAOX4C.jpg",
				title: "title_3",
				lat: 60.15,
				long: 70.25
			},
			{
				id: 4,
				src: "img/unnamed (1).jpg",
				title: "title_4",
				lat: 33.15,
				long: 38.25
			},
			{
				id: 5,
				src: "img/nintchdbpict000177689785.jpg",
				title: "title_5",
				lat: 48.15,
				long: 50.25
			},
			{
				id: 6,
				src: "img/nintchdbpict000177689785.jpg",
				title: "title_6",
				lat: 42.15,
				long: 60.25
			},
			{
				id: 7,
				src: "img/nintchdbpict000177689785.jpg",
				title: "title_7",
				lat: 55.15,
				long: 92.25
			},
		];
    }

    create(title, callback) {
        title = title || '';
        callback = callback || function () { };

        var newItem = {
            title: title.trim(),
            completed: false
        };

        this.storage.save(newItem, callback);
    }

    read(id) {
        if (typeof id === 'undefined') {
            return this.data;
        }
        else {
            return this.data.find((x) => x.id === id);
        }
    }

    update(id, data, callback) {
        this.storage.save(data, callback, id);
    }

    delete(id, callback) {
        this.storage.delete(id, callback);
    }
}
