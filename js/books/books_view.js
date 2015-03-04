define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone'),
        BooksTemplate = require('text!./books_view.html'),
        MyBooksView = require('./my_books/my_books_view');

    return Backbone.View.extend({
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;
        },
        render: function () {
            $(this.el).html(BooksTemplate);

            this.renderMyBooksView();
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
