define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        BooksSearchTemplate = require('text!./books_search_view.html'),
        BooksListView = require('books/books_list/books_list_view');

    return Backbone.View.extend({
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;
        },
        render: function () {
            this.$el.html(BooksSearchTemplate);
        }
    });
});
