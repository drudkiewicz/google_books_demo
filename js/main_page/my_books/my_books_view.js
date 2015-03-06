define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        MyBooksTemplate = require('text!./my_books_view.html'),
        AlertMessageTemplate = require('text!alert_message.html'),
        BooksListView = require('main_page/books_list/books_list_view');

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
                }).then(_.bind(self.renderMyBooksList, self), _.bind(function () {
                    this.$('.books-list').html(AlertMessageTemplate);
                    this.$('.alert').html('Something went wrong...<br>Please refresh the page.');
                }, self));
            });
        },
        renderMyBooksList: function (response) {
            this.booksListView = new BooksListView({
                el: this.$('.books-list'),
                books: response.result.items,
                allowRemove: true,
                goggles: this.goggles,
                bookshelfId: this.bookshelfId
            });

            this.booksListView.render();
        }
    });
});
