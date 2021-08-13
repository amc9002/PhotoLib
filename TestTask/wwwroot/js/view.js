'use strict';

class View {

    constructor(template) {
        this.template = template;

        this.ENTER_KEY = 13;
        this.ESCAPE_KEY = 27;

        this.$todoList = $('.MultiCarousel-inner');
        this.$main = $('.main');
        this.$newTodo = $('.new-todo');
    }

    _removeItem (id) {
        var elem = $('[data-id="' + id + '"]');

        if (elem) {
            this.$todoList.removeChild(elem);
        }
    }

    _editItem (id, title) {
        var listItem = $('[data-id="' + id + '"]');

        if (!listItem) {
            return;
        }

        listItem.className = listItem.className + ' editing';

        var input = document.createElement('input');
        input.className = 'edit';

        listItem.appendChild(input);
        input.focus();
        input.value = title;
    }

    _editItemDone (id, title) {
        var listItem = $('[data-id="' + id + '"]');

        if (!listItem) {
            return;
        }

        var input = $(listitem).find('input.edit');
        listItem.removeChild(input);

        listItem.className = listItem.className.replace('editing', '');

        $(listitem).find('label').forEach(function (label) {
            label.textContent = title;
        });
    }

    render (viewCmd, parameter) {
        var self = this;
        var viewCommands = {
            showEntries: function () {
                self.$todoList.html(self.template.show(parameter));
                $(window).trigger('resize');	// resize the carousel
            },
            removeItem: function () {
                self._removeItem(parameter);
            },
            clearNewTodo: function () {
                self.$newTodo.value = '';
            },
            editItem: function () {
                self._editItem(parameter.id, parameter.title);
            },
            editItemDone: function () {
                self._editItemDone(parameter.id, parameter.title);
            }
        };

        viewCommands[viewCmd]();
    }

    _itemId (element) {
        var li = $(element).closest('li');
        return parseInt(li.dataset.id, 10);
    }

    _bindItemEditDone (handler) {
        var self = this;
        self.$todoList.find('li .edit').on('blur', function () {
            if (!this.dataset.iscanceled) {
                handler({
                    id: self._itemId(this),
                    title: this.value
                });
            }
        });

        self.$todoList.find('li .edit').on('keypress', function (event) {
            if (event.keyCode === self.ENTER_KEY) {
                // Remove the cursor from the input when you hit enter just like if it
                // were a real form
                this.blur();
            }
        });
    }

    _bindItemEditCancel (handler) {
        var self = this;
        self.$todoList.find('li .edit').on('keyup', function (event) {
            if (event.keyCode === self.ESCAPE_KEY) {
                this.dataset.iscanceled = true;
                this.blur();

                handler({ id: self._itemId(this) });
            }
        });
    }

    bind (event, handler) {
        var self = this;
        if (event === 'itemAdd') {
            self.$newTodo.on('change', function () {
                handler(self.$newTodo.value);
            });

        } else if (event === 'itemEdit') {
            self.$todoList.find('li label').on('dblclick', function () {
                handler({ id: self._itemId(this) });
            });

        } else if (event === 'itemRemove') {
            self.$todoList.find('.destroy').on('click', function () {
                handler({ id: self._itemId(this) });
            });

        } else if (event === 'itemEditDone') {
            self._bindItemEditDone(handler);

        } else if (event === 'itemEditCancel') {
            self._bindItemEditCancel(handler);
        }
    }
}

