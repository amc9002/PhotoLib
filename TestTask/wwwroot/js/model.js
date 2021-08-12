class Model {
    constructor(storage) {
        this.storage = storage;

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

    read(query, callback) {
        var queryType = typeof query;
        callback = callback || function () { };

        if (queryType === 'function') {
            callback = query;
            return this.storage.findAll(callback);
        } else if (queryType === 'string' || queryType === 'number') {
            query = parseInt(query, 10);
            this.storage.find({ id: query }, callback);
        } else {
            this.storage.find(query, callback);
        }
    }

    update(id, data, callback) {
        this.storage.save(data, callback, id);
    }

    delete(id, callback) {
        this.storage.delete(id, callback);
    }
}

