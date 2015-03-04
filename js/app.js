define(function(require, exports, module) {
    'use strict';

    var $ = require('lib/jquery'),
        Backbone = require('lib/backbone'),
        Goggles = require('lib/goggles'),
        LoginPageView = require('./login/login_view'),
        BooksPageView = require('./books/books_view'),
        settings = JSON.parse(require('text!../local_settings.json')),
        goggles = new Goggles({
            apiKey: settings.apiKey,
            clientId: settings.clientId,
            scope: settings.scope
        });


    var Router = Backbone.Router.extend({
        routes: {
            // Default path.
            '': 'loginPage',

            'login': 'loginPage',

            'books': 'booksPage',

            // Usage of fragment parameter.
            'invoice/:id': 'invoicePage'
        },

        loginPage: function() {
            var loginPageView = new LoginPageView({
                el: 'body',
                goggles: goggles,
                router: this
            });

            loginPageView.render();
        },

        booksPage: function() {
            var booksPageView = new BooksPageView({
                el: 'body',
                goggles: goggles,
                bookshelfId: settings.bookshelfId
            });

            booksPageView.render();
        },

        // Shows invoice page.
        invoicePage: function(id) {
          var invoicePageView = new InvoicePageView({
            el: 'body',

            // Pass parameter to the view.
            id: id
          });
          invoicePageView.render();
        }
    });

    new Router;
    Backbone.history.start();
});
