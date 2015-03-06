define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        BooksListTemplate = require('text!./books_list_view.html'),
        BooksCollection = require('main_page/book/books_collection'),
        BookView = require('main_page/book/book_view');

    return Backbone.View.extend({
        initialize: function (options) {
            this.books = new BooksCollection(options.books);
            this.options = options;

            this.books.bind('remove', this.render, this);
        },
        render: function () {
            if (this.books.length) {
                this.$el.html(BooksListTemplate);

                this.renderBooks();
            } else {
                this.$el.html('No results');
            }
        },
        renderBooks: function () {
            var self = this;

            this.books.each(function (book) {
                var bookView = new BookView({
                    el: $('<tr />').appendTo(self.$('tbody')),
                    model: book,
                    allowAdd: self.options.allowAdd,
                    allowRemove: self.options.allowRemove,
                    goggles: self.options.goggles,
                    bookshelfId: self.options.bookshelfId
                });

                bookView.render();
            });
        }
    });
});
