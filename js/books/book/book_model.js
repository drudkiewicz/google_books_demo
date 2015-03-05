define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone');

    return Backbone.Model.extend({
        initialize: function (options) {
            this.set('authors', options.volumeInfo.authors);
            if (options.volumeInfo.imageLinks) {
                this.set('thumbnail', options.volumeInfo.imageLinks.smallThumbnail);
            } else {
                // TODO add placeholder
                this.set('thumbnail', '');
            }
            this.set('title', options.volumeInfo.title);
            this.set('pages', options.volumeInfo.pageCount);
            this.set('previewLink', options.volumeInfo.previewLink);
        }
    });
});
