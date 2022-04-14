'use strict';

class Model {
    constructor(image) {
        // fake data
        this.data = [
            {
                id: 1,
                src: "img/nintchdbpict000177689785.jpg",
                descr: "Queen Elizabeth II",

            },
            {
                id: 2,
                src: "img/Queen-Mary-Ship2-678x399.jpg",
                descr: "Queen Mary",
            },
            {
                id: 3,
                src: "img/1024px-The_Cutty_Sark_2005-01-24.jpg",
                descr: "Cutty Sark",
            },
            {
                id: 4,
                src: "img/Dar-Pomorza.jpg",
                descr: "Dar Pomorza",
            },
            {
                id: 5,
                src: "img/Royal-Yacht-Britannia-e1593443668468-1024x500.jpg",
                descr: "The Royal Yacht Britannia",
            },
            {
                id: 6,
                src: "img/Discovery.jpg",
                descr: "Discovery",
            },
            {
                id: 7,
                src: "img/uss-constitution-167366cf2fa4cd30.jpg",
                descr: "Constitution",
            },
            {
                id: 8,
                src: "img/Japanese_battleship_Mikasa_in_Yokohama.jpg",
                descr: "Mikasa",
            },
            {
                id: 9,
                src: "img/main-qimg-5052ea1fb9f097167cee4763009d5f06.jfif",
                descr: "United States",
            },
        ];
    }


    create(data, errorHandler, callback) {
        if (document.location.href.indexOf(`github.io`) !== -1
            || window.location.origin === `file://`) {

            this.createFake(data.get(`NewFile`).name);
            callback();
        }
        else {
            let url = `${document.location.href}test_task`;
            fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                body: data
            })
                .then(response => {
                    if (response.status == 200) {
                        response.json()
                            .then(data => callback(data))
                    }

                    else {
                        response.text()
                            .then(text => {
                                errorHandler(text);
                            })
                            .catch(error => {
                                errorHandler(error);
                                console.log('caught it! 1', error);
                            });
                    }
                })
                .catch(error => {
                    errorHandler(error);
                    console.log('caught it! 2', error);
                });

        }
    }

    createFake(name) {
        const id = Date.now();
        this.data.push({
            id: id,
            src: `img / ${name}`,
            descr: `File ${name}`,
        });
    }

    read(id, callback) {

        if (document.location.href.indexOf(`github.io`) !== -1
            || window.location.origin === `file://`) {

            var obj;
            if (id === null) obj = this.data;
            else obj = this.data.find(d => d.id === id);

            callback(obj);
        }
        else {
            let url = `${document.location.href}testtask`;
            if (id !== null) {
                url += `/${id}`;
            }

            fetch(url, callback)
                .then(response => response.json())
                .then(data => {
                    const obj = (id !== null) ? Image.fromGenericObject(data) : data.map((ob) => Image.fromGenericObject(ob));
                    callback(obj);
                });
        }
    }

    update(id, item) {
        if (document.location.href.indexOf(`github.io`) !== -1
            || window.location.origin === `file://`) {

            var index = this.data.findIndex(x => x.id.toString() === id.toString());
            if (index !== -1) {
                this.data[index] = item;
            }
        }
        else {
            let url = `${document.location.href}testtask`;
            const itemCopy = {
                id: item.id,
                descr: item.descr
            };
            fetch(url, {
                method: 'PUT',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemCopy)
            });
        }

    }

    delete(id, callback) {
        if (document.location.href.indexOf(`github.io`) !== -1
            || window.location.origin === `file://`) {

            this.data.delete(d => d.id == id);
            callback();
        }
        else {
            let url = `${document.location.href}testtask` + `/${id}`;
            fetch(url, {
                method: 'DELETE',
                cache: 'no-cache'
            })
                .then(() => callback());
        }

    }
}
