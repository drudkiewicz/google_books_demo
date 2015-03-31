define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone'),
        Mustache = require('lib/mustache'),
        AlertMessageTemplate = require('text!alert_message.html'),
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
                /*jshint camelcase: false */
                if (response.status.signed_in) {
                    self.router.navigate('/books', true);
                } else {
                    self.$('.tile').append(Mustache.render(AlertMessageTemplate, {
                        error: 'Login failed. Please try again.'
                    }));
                }
            });
        }
    });
});
