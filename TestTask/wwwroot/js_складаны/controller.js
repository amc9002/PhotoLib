'use strict';

class Controller {

    constructor(model, view) {
        var self = this;
        self.model = model;
        self.view = view;

        // self.view.bind('itemAdd', function (title) {
        //     self.addItem(title);
        // });
		//
        // self.view.bind('itemEdit', function (item) {
        //     self.editItem(item.id);
        // });
		//
        // self.view.bind('itemEditDone', function (item) {
        //     self.editItemSave(item.id, item.title);
        // });
		//
        // self.view.bind('itemEditCancel', function (item) {
        //     self.editItemCancel(item.id);
        // });
		//
        // self.view.bind('itemRemove', function (item) {
        //     self.removeItem(item.id);
        // });
    }

    showAll() {
        var self = this;
        self.model.read(function (data) {
            self.view.render('showEntries', data);
			self.view.bind('itemEdit', function (id) {
				self.editItem(id);
			});
        });
    }

    /**
    * An event to fire whenever you want to add an item. Simply pass in the event
    * object and it'll handle the DOM insertion and saving of the new item.
    */
    addItem(title) {
        var self = this;

        if (title.trim() === '') {
            return;
        }

        self.model.create(title, function () {
            self.view.render('clearNewTodo');
        });
    }

    /*
    * Triggers the item editing mode.
    */
    editItem(id) {
        var self = this;
        self.model.read(id, function (item) {
            self.view.render('editItem', item);
        });
    }

    /*
     * Finishes the item editing mode successfully.
     */
    editItemSave(id, title) {
        var self = this;
        title = title.trim();

        if (title.length !== 0) {
            self.model.update(id, { title: title }, function () {
                self.view.render('editItemDone', { id: id, title: title });
            });
        } else {
            self.removeItem(id);
        }
    }

    editItemCancel(id) {
        var self = this;
        self.model.read(id, function (data) {
            self.view.render('editItemDone', { id: id, title: data[0].title });
        });
    }

    /**
     * By giving it an ID it'll find the DOM element matching that ID,
     * remove it from the DOM and also remove it from storage.
     *
     * @param {number} id The ID of the item to remove from the DOM and
     * storage
     */
    removeItem(id) {
        var self = this;
        self.model.delete(id, function () {
            self.view.render('removeItem', id);
        });
    }
}
