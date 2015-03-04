define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        BooksTemplate = require('text!./my_books_view.html'),
        BooksListView = require('books/books_list/books_list_view');

    return Backbone.View.extend({
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;
        },
        render: function () {
            var self = this;

            this.$el.html(BooksTemplate);
            this.goggles.then(function (gapi) {
                gapi.client.request({
                    'path': '/books/v1/mylibrary/bookshelves/' + self.bookshelfId + '/volumes'
                }).execute(_.bind(self.renderMyBooksList, self));
            });
        },
        renderMyBooksList: function (response) {
            this.booksListView = new BooksListView({
                el: this.$('.books-list'),
                books: response.items
            });

            this.booksListView.render();
        }
    });
});
