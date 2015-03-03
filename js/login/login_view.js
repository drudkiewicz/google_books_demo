define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone');

    return Backbone.View.extend({
        render: function () {
            $(this.el).html('This is login page.');
        }
    });

});