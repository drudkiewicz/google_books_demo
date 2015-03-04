define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        BooksListTemplate = require('text!./books_list_view.html'),
        BooksCollection = require('books/book/books_collection'),
        BookView = require('books/book/book_view');

    return Backbone.View.extend({
        initialize: function (options) {
            this.books = new BooksCollection(options.books);
        },
        render: function () {
            this.$el.html(BooksListTemplate);

            this.renderBooks();
        },
        renderBooks: function () {
            var self = this;

            this.books.each(function (book) {
                var bookView = new BookView({
                    el: $('<tr />').appendTo(self.$('tbody')),
                    model: book
                });

                bookView.render();
            });
        }
    });
});
