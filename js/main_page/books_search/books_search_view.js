define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        BooksSearchTemplate = require('text!./books_search_view.html'),
        AlertMessageTemplate = require('text!alert_message.html'),
        BooksListView = require('main_page/books_list/books_list_view');

    return Backbone.View.extend({
        lastQueryString: '',
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
                queryString = this.buildQueryString();

            // if query string is empty or it was previously searched, we don't call the API
            if (!queryString || queryString === this.lastQueryString) {
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
                        this.$('.books-list').html(AlertMessageTemplate);
                        this.$('.alert').html('Something went wrong...<br>Please try again.');
                    } else {
                        this.renderBookSearchResults(response.items);
                        this.lastQueryString = queryString
                    }
                }, self));
            });
        },
        buildQueryString: function () {
            var title = this.$('input[name="title"]').val(),
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
            
            return queryString;
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
