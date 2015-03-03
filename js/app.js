define(function(require, exports, module) {
    'use strict';

    var jQuery = require('lib/jquery'),
        Backbone = require('lib/backbone');

    var LoginPageView = Backbone.View.extend({
        render: function () {
            $(this.el).html('This is login page.');
        }
    });


    var BooksPageView = Backbone.View.extend({
        render: function () {
            $(this.el).html('This is books page.');
        }
    });


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
