define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone');

    return Backbone.Model.extend({
        initialize: function (options) {
            var authors = options.volumeInfo.authors ? options.volumeInfo.authors : ['Unknown Author'],
                thumbnail = options.volumeInfo.imageLinks ? options.volumeInfo.imageLinks.smallThumbnail : '/images/no_image.jpg';

            this.set('authors', authors)
                .set('thumbnail', thumbnail)
                .set('title', options.volumeInfo.title)
                .set('previewLink', options.volumeInfo.previewLink);
        }
    });
});
