(function (window) {
	'use strict';

	/**
	     * View that abstracts away the browser's DOM completely.
	     * It has two simple entry points:
	     *
	     *   - bind(eventName, handler)
	     *     Takes a todo application event and registers the handler
	     *   - render(command, parameterObject)
	     *     Renders the given command with the options
	     */
	function View(template) {
		this.template = template;

		this.ENTER_KEY = 13;
		this.ESCAPE_KEY = 27;

		this.$todoList = $('.MultiCarousel-inner');
		this.$main = $('.main');
		this.$newTodo = $('.new-todo');
	}

	View.prototype._removeItem = function (id) {
		var elem = $('[data-id="' + id + '"]');

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	};

	View.prototype._editItem = function (id, title) {
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
	};

	View.prototype._editItemDone = function (id, title) {
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
	};

	View.prototype.render = function (viewCmd, parameter) {
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
	};

	View.prototype._itemId = function (element) {
		var li = $(element).closest('li');
		return parseInt(li.dataset.id, 10);
	};

	View.prototype._bindItemEditDone = function (handler) {
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
	};

	View.prototype._bindItemEditCancel = function (handler) {
		var self = this;
		self.$todoList.find('li .edit').on('keyup', function (event) {
			if (event.keyCode === self.ESCAPE_KEY) {
				this.dataset.iscanceled = true;
				this.blur();

				handler({id: self._itemId(this)});
			}
		});
	};

	View.prototype.bind = function (event, handler) {
		var self = this;
		if (event === 'itemAdd') {
			self.$newTodo.on('change', function () {
				handler(self.$newTodo.value);
			});

		} else if (event === 'itemEdit') {
			self.$todoList.find('li label').on('dblclick', function () {
				handler({id: self._itemId(this)});
			});

		} else if (event === 'itemRemove') {
			self.$todoList.find('.destroy').on('click', function () {
				handler({id: self._itemId(this)});
			});

		} else if (event === 'itemEditDone') {
			self._bindItemEditDone(handler);

		} else if (event === 'itemEditCancel') {
			self._bindItemEditCancel(handler);
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.View = View;
}(window));
