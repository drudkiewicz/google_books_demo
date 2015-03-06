/* global describe, it, beforeEach, expect, spyOn */
define(function(require, exports, module) {
    'use strict';

    var Backbone = require('lib/backbone'),
        BooksListView = require('main_page/books_list/books_list_view'),
        Goggles = require('lib/goggles');

    describe('Initialize BooksListView', function() {
        var options,
            booksListView,
            goggles;

        beforeEach(function () {
            goggles = new Goggles({
                apiKey: 'someApiKey',
                clientId: 'someClientId',
                scope: ['someScope']
            });

            options = {
                goggles: goggles,
                bookshelfId: 0,
                books: [{
                    id: '1',
                    volumeInfo: {
                        title: 'book',
                        authors: ['John Smith']
                    } 
                }, {
                    id: '2',
                    volumeInfo: {
                        title: 'book2',
                        authors: ['Peter Smith', 'John Kent']
                    } 
                }],
                allowAdd: true
            };

            booksListView = new BooksListView(options);
        });

        it('should exists', function () {
            expect(booksListView).toBeDefined();
        });

        it('should have proper properties', function () {
            expect(booksListView.books).toBeDefined();
            expect(booksListView.books instanceof Backbone.Collection).toBeTruthy();
            expect(booksListView.books.length).toEqual(2);

            expect(booksListView.options).toBeDefined();
            expect(booksListView.options).toEqual(options);            
        });

        describe('Renders BooksListView', function () {
            beforeEach(function () {
                spyOn(booksListView, 'renderBooks');
            });

            it('should call renderBooks method if there are some books', function () {
                booksListView.render();

                expect(booksListView.books.length).toEqual(2);
                expect(booksListView.renderBooks).toHaveBeenCalled();
            });

            it('should not call renderBooks method if there are no books', function () {
                booksListView.books.reset();
                booksListView.render();

                expect(booksListView.books.length).toEqual(0);
                expect(booksListView.renderBooks).not.toHaveBeenCalled();

                expect(booksListView.$el.text()).toEqual('No results');
            });
        });
    });
});
