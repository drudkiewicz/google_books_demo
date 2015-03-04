define(function(require, exports, module) {
    'use strict';

    var _ = require('lib/underscore'),
        Backbone = require('lib/backbone'),
        BookTemplate = require('text!./book_view.html');

    return Backbone.View.extend({
        tagName: 'tr',
        initialize: function (options) {
            this.goggles = options.goggles;
            this.bookshelfId = options.bookshelfId;
        },
        render: function () {
            this.$el.html(BookTemplate);

            this.$('.thumbnail img').attr('src', this.model.get('thumbnail'));
            this.$('.title a').attr('href', this.model.get('previewLink')).text(this.model.get('title'));
            this.$('.authors').text(this.model.get('authors').join(', '));
        }
    });
});
