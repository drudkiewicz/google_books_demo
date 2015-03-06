define(function(require, exports) {
    'use strict';
    console.log('fdsa')

    // var $ = require('lib/jquery'),
        // app = require('app'),
        // Backbone = require('lib/backbone'),
        // Goggles = require('lib/goggles'),
        // LoginPageView = require('./login/login_view'),
        // BooksPageView = require('./books/books_view'),
        // settings = JSON.parse(require('text!../local_settings.json')),
        // goggles = new Goggles({
        //     apiKey: settings.apiKey,
        //     clientId: settings.clientId,
        //     scope: settings.scope
        // });


                console.log('fdsa')
    return function () {
        module('App', {
            setup: function () {
                console.log('fdsa')
            },
            teardown: function () {
            }
        });

        test('lol', 2, function () {
            console.log('test')
            ok(true)
            ok(false)
        });
    };
});
