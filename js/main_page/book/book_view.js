define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
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
            this.$el.after('<tr><td colspan="3">' + AlertMessageTemplate + '</td></tr>');
            this.$el.next().find('.alert').html('Something went wrong...<br>Please refresh the page and try again.');
        }
    });
});
