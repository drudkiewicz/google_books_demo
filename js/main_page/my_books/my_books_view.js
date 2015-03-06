define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        MyBooksTemplate = require('text!./my_books_view.html'),
        BooksListView = require('books/books_list/books_list_view');

    return Backbone.View.extend({
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;
        },
        render: function () {
            var self = this;

            this.$el.html(MyBooksTemplate);
            this.goggles.then(function (gapi) {
                gapi.client.request({
                    'path': '/books/v1/mylibrary/bookshelves/' + self.bookshelfId + '/volumes'
                }).execute(_.bind(self.renderMyBooksList, self));
            });
        },
        renderMyBooksList: function (response) {
            if (response.error) {
                this.$('.books-list').text('Something went wrong, please refresh the page');
            } else {
                this.booksListView = new BooksListView({
                    el: this.$('.books-list'),
                    books: response.items,
                    allowRemove: true,
                    goggles: this.goggles,
                    bookshelfId: this.bookshelfId
                });

                this.booksListView.render();
            }
        }
    });
});
