define(function(require, exports, module) {
    'use strict';

    var $ = require('lib/jquery'),
        Backbone = require('lib/backbone'),
        LoginPageView = require('./login/login_view'),
        BooksPageView = require('./books/books_view');


    var Workspace = Backbone.Router.extend({
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
                el: 'body'
            });

            loginPageView.render();
        },

        booksPage: function() {
            var booksPageView = new BooksPageView({
                el: 'body'
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

    new Workspace();
    Backbone.history.start();
});
