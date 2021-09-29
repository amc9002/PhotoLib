'use strict';

class Store {
	constructor(name) {
		//this._dbName = name;

		// fake data
		this.data = [
			{
				id: 1,
				src: "img/nintchdbpict000177689785.jpg"
			},
			{
				id: 2,
				src: "img/image_2019_07_24T08_35_23_076Z-1bd827adeaad7c2ad727d015ff388060d71a6647.png"
			},
			{
				id: 3,
				src: "img/EhXMP4JWsAAOX4C.jpg"
			},
			{
				id: 4,
				src: "img/unnamed (1).jpg"
			},
			{
				id: 5,
				src: "img/nintchdbpict000177689785.jpg"
			},
			{
				id: 6,
				src: "img/nintchdbpict000177689785.jpg"
			},
			{
				id: 7,
				src: "img/nintchdbpict000177689785.jpg"
			},
		];
	}

	find (query, callback) {
		if (!callback) {
			return;
		}

		// var todos = JSON.parse(localStorage.getItem(this._dbName));

		callback.call(this, this.data.filter(function (todo) {
			for (var q in query) {
				if (query[q] !== todo[q]) {
					return false;
				}
			}
			return true;
		}));
	}

	findAll (callback) {
		callback = callback || function () { };
		//const data = JSON.parse(localStorage.getItem(this._dbName));
		callback.call(this, this.data);
	}

	save (updateData, callback, id) {
		var todos = JSON.parse(localStorage.getItem(this._dbName));

		callback = callback || function () { };

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}

			localStorage.setItem(this._dbName, JSON.stringify(todos));
			callback.call(this, todos);
		} else {
			// Generate an ID
			updateData.id = new Date().getTime();

			todos.push(updateData);
			localStorage.setItem(this._dbName, JSON.stringify(todos));
			callback.call(this, [updateData]);
		}
	}

	delete (id, callback) {
		var todos = JSON.parse(localStorage.getItem(this._dbName));

		for (var i = 0; i < todos.length; i++) {
			if (todos[i].id == id) {
				todos.splice(i, 1);
				break;
			}
		}

		localStorage.setItem(this._dbName, JSON.stringify(todos));
		callback.call(this, todos);
	}

	drop (callback) {
		var todos = [];
		localStorage.setItem(this._dbName, JSON.stringify(todos));
		callback.call(this, todos);
	}
}
