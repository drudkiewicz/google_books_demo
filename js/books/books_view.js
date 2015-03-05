define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone'),
        BooksTemplate = require('text!./books_view.html'),
        MyBooksView = require('./my_books/my_books_view'),
        BooksSearchView = require('./books_search/books_search_view');

    return Backbone.View.extend({
        events: {
            'bookAdded': 'renderMyBooksView'
        },
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;
        },
        render: function () {
            $(this.el).html(BooksTemplate);

            this.renderBooksSearchView();
            this.renderMyBooksView();
        },
        renderBooksSearchView: function () {
            this.booksSearchView = new BooksSearchView({
                el: this.$('.books-search'),
                goggles: this.goggles,
                bookshelfId: this.bookshelfId
            });

            this.booksSearchView.render();
        },
        renderMyBooksView: function () {
            this.myBooksView = new MyBooksView({
                el: this.$('.my-books'),
                goggles: this.goggles,
                bookshelfId: this.bookshelfId
            });

            this.myBooksView.render();
        }
    });
});
