define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        BookTemplate = require('text!./book_view.html');

    return Backbone.View.extend({
        events: {
            'click .remove-book': 'removeBook',
            'click .add-book': 'addBook'
        },
        tagName: 'tr',
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;
            this.options = options;
        },
        render: function () {
            this.$el.html(BookTemplate);

            this.$('.book-thumbnail img').attr('src', this.model.get('thumbnail'));
            this.$('.title a').attr('href', this.model.get('previewLink')).text(this.model.get('title'));
            this.$('.authors').text(this.model.get('authors').join(', '));
            this.$('.pages').text(this.model.get('pages'));

            if (this.options.allowAdd) {
                this.$el.append('<td><a class="add-book fui-plus-circle"></a></td>');
            }

            if (this.options.allowRemove) {
                this.$el.append('<td><a class="remove-book fui-trash"></a></td>');
            }
        },
        removeBook: function () {
            var self = this;

            this.goggles.then(function (gapi) {
                gapi.client.request({
                    'method': 'POST',
                    'path': '/books/v1/mylibrary/bookshelves/' + self.bookshelfId + '/removeVolume',
                    'params': {
                        'volumeId': self.model.get('id')
                    }
                }).execute(function (response) {
                    if (response && response.error) {
                        
                    } else {
                        self.model.collection.remove(self.model);
                        self.remove();
                    }
                });
            });
        },
        addBook: function () {
            var self = this;

            this.goggles.then(function (gapi) {
                gapi.client.request({
                    'method': 'POST',
                    'path': '/books/v1/mylibrary/bookshelves/' + self.bookshelfId + '/addVolume',
                    'params': {
                        'volumeId': self.model.get('id')
                    }
                }).execute(function (response) {
                    if (response && response.error) {
                        // TODO display some alert
                    } else {
                        self.$el.trigger('bookAdded');
                    }
                });
            });
        }
    });
});
