define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone'),
        Goggles = require('lib/goggles'),
        LoginPageView = require('./login/login_view'),
        MainPageView = require('./main_page/main_page_view'),
        settings = JSON.parse(require('text!../local_settings.json')),
        goggles = new Goggles({
            apiKey: settings.apiKey,
            clientId: settings.clientId,
            scope: settings.scope
        }),
        Router;

    Router = Backbone.Router.extend({
        routes: {
            // Default path.
            '': 'loginPage',

            'login': 'loginPage',

            'books': 'mainPage'
        },

        loginPage: function() {
            var loginPageView = new LoginPageView({
                el: '.container',
                goggles: goggles,
                router: this
            });

            loginPageView.render();
        },

        mainPage: function() {
            var mainPageView = new MainPageView({
                el: '.container',
                goggles: goggles,
                bookshelfId: settings.bookshelfId
            });

            mainPageView.render();
        }
    });

    /*jshint nonew: false */
    new Router();
    Backbone.history.start();
});
