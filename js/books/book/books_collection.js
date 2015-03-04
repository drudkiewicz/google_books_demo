define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone'),
        BookModel = require('./book_model');

    return Backbone.Collection.extend({
        model: BookModel
    });
});
