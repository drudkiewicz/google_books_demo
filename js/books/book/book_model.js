define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone');

    return Backbone.Model.extend({
        initialize: function (options) {
            this.set('authors', options.volumeInfo.authors);
            this.set('thumbnail', options.volumeInfo.imageLinks.smallThumbnail);
            this.set('title', options.volumeInfo.title);
            this.set('previewLink', options.volumeInfo.previewLink);
        }
    });
});
