define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        Mustache = require('lib/mustache'),
        BookTemplate = require('text!./book_view.html'),
        AlertMessageTemplate = require('text!alert_message.html');

    return Backbone.View.extend({
        events: {
            'click .remove-book': 'removeBook',
            'click .add-book': 'addBook'
        },
        tagName: 'tr',
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;

            this.modelview = {
                thumbnail: this.model.get('thumbnail'),
                previewLink: this.model.get('previewLink'),
                title: this.model.get('title'),
                authors: this.model.get('authors').join(', '),
                allowAdd: options.allowAdd,
                allowRemove: options.allowRemove
            };
        },
        render: function () {
            this.$el.html(Mustache.render(BookTemplate, this.modelview));
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
                }).then(_.bind(function (response) {
                    this.model.collection.remove(this.model);
                    this.remove();
                }, self), _.bind(self.renderError, self));
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
                }).then(function (response) {
                    self.$el.trigger('bookAdded');
                }, _.bind(self.renderError, self));
            });
        },
        renderError: function () {
            var errorMessage = Mustache.render(AlertMessageTemplate, {
                error: 'Something went wrong...<br>Please refresh the page and try again.'
            });

            this.$el.after('<tr><td colspan="3">' + errorMessage + '</td></tr>');
        }
    });
});
