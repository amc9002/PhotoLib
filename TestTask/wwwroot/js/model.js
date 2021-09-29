'use strict';

class Model {
    constructor() {
        // fake data
		this.data = [
			{
				id: 1,
				src: "img/nintchdbpict000177689785.jpg",
				title: "Queen Elizabeth II",
				lat: 25.15,
				long: 34.25
			},
			{
				id: 2,
				src: "img/image_2019_07_24T08_35_23_076Z-1bd827adeaad7c2ad727d015ff388060d71a6647.png",
				title: "Kiebicz and Czarnamyrdzin",
				//title: "Кебіч і Чарнамырдзін: Пане, дапамажы выжыць сярод гэтай сьмяротнай любові!",
				lat: 45.15,
				long: 20.25
			},
			{
				id: 3,
				src: "img/EhXMP4JWsAAOX4C.jpg",
				//title: "Бордэр-коллі - страшнейшага зьвяра няма!",
				title: "Border-colli",
				lat: 60.15,
				long: 70.25
			},
			{
				id: 4,
				src: "img/unnamed (1).jpg",
				//title: "Карона для правінцыі",
				title: "Uniform",
				lat: 33.15,
				long: 38.25
			},
			{
				id: 5,
				src: "img/22_d716f10c63465a523b294f9320b49650_839.jpg",
				//title: "Ды каб ты зубы сьцёр!",
				title: "Lukaszenka",
				lat: 48.15,
				long: 50.25
			},
			{
				id: 6,
				src: "img/205429-1.jpg",
				//title: "Вой, коцікі!!",
				title: "Cats",
				lat: 42.15,
				long: 60.25
			},
			{
				id: 7,
				src: "img/120097761_2981974798575404_3906031215242602525_o.jpg",
				//title: "Сьцяпан Бандэра сустракаецца з Рыбэнтропам. А не, гэта ж Молатаў!",
				title: "Molotov and Ribbentrop",
				lat: 62.15,
				long: 13.25
			},
			{
				id: 8,
				src: "img/132621084_3517441275014469_1135871548250275265_o.jpg",
				//title: "Вясёлых Калядаў!",
				title: "Merry Christmas!",
				lat: 48.15,
				long: 22.25
			},
			{
				id: 9,
				src: "img/main-qimg-5052ea1fb9f097167cee4763009d5f06.jfif",
				//title: "United States'. Апошні ўладальнік 'Блакітнай стужкі",
				title: "United States",
				lat: 65.15,
				long: 18.25
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
