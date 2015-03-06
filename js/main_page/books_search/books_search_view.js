define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        BooksSearchTemplate = require('text!./books_search_view.html'),
        BooksListView = require('books/books_list/books_list_view');

    return Backbone.View.extend({
        events: {
            'click .search-button': 'searchBooks',
            'keyup input[name="title"], input[name="author"]': 'enterKeyHandler'
        },
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;
        },
        render: function () {
            this.$el.html(BooksSearchTemplate);
        },
        searchBooks: function () {
            var self = this,
                title = this.$('input[name="title"]').val(),
                author = this.$('input[name="author"]').val(),
                queryString = '',
                queryItems = [];

            // building query string
            if (title) {
                queryItems.push('intitle:' + title);
            }

            if (author) {
                queryItems.push('inauthor:' + author);
            }

            queryString = queryItems.join('+');

            // if query string is empty we don't call the API
            if (!queryString) {
                return;
            }

            this.goggles.then(function (gapi) {
                gapi.client.request({
                    'path' : '/books/v1/volumes',
                    'params': {
                        'q': queryString
                    }
                }).execute(_.bind(function (response) {
                    if (response.error) {
                        // TODO display error
                    } else {
                        this.renderBookSearchResults(response.items);
                    }
                }, self));
            });
        },
        enterKeyHandler: function (event) {
            if (event.keyCode === 13) {
                this.searchBooks();
            }
        },
        renderBookSearchResults: function (books) {
            this.booksListView = new BooksListView({
                el: this.$('.books-list'),
                books: books,
                allowAdd: true,
                goggles: this.goggles,
                bookshelfId: this.bookshelfId
            });

            this.booksListView.render();
        }
    });
});
