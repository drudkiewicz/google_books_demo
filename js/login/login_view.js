define(function(require, exports, module) {
    'use strict';

    var $ = require('lib/jquery'),
        Backbone = require('lib/backbone'),
        LoginTemplate = require('text!./login_view.html');

    return Backbone.View.extend({
        events: {
            'click .login-button': 'logIn'
        },
        initialize: function (options) {
            this.goggles = options.goggles;
            this.router = options.router;
        },
        render: function () {
            this.$el.html(LoginTemplate);
        },
        logIn: function () {
            var self = this;

            this.goggles.login().then(function (response) {
                if (response.status.signed_in) {
                    self.router.navigate('/books', true);
                } else {
                    self.$('.error-message').removeClass('hidden');
                }
            });
        }
    });
});
