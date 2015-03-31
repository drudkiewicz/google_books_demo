/* global describe, it, beforeEach, expect, spyOn, jasmine */
define(function(require, exports, module) {
    'use strict';

    var BookView = require('main_page/book/book_view'),
        BookModel = require('main_page/book/book_model'),
        Goggles = require('lib/goggles');

    describe('Initialize BooksListView', function() {
        var options,
            bookView,
            goggles,
            bookModel,
            modelview;

        beforeEach(function () {
            goggles = new Goggles({
                apiKey: 'someApiKey',
                clientId: 'someClientId',
                scope: ['someScope']
            });

            bookModel = new BookModel({
                id: '1',
                volumeInfo: {
                    title: 'book',
                    authors: ['John Smith', 'Peter Duck'],
                    previewLink: 'some_link',
                    imageLinks: {
                        smallThumbnail: 'thumbnail'
                    }
                }
            });

            options = {
                goggles: goggles,
                bookshelfId: 0,
                allowAdd: true,
                allowRemove: true,
                model: bookModel
            };

            modelview = {
                thumbnail: 'thumbnail',
                previewLink: 'some_link',
                title: 'book',
                authors: 'John Smith, Peter Duck',
                allowAdd: true,
                allowRemove: true
            };

            bookView = new BookView(options);
        });

        it('should exists', function () {
            expect(bookView).toBeDefined();
        });

        it('should have proper properties', function () {
            expect(bookView.goggles).toBeDefined();
            expect(bookView.goggles).toEqual(jasmine.any(Object));
            expect(bookView.goggles).toBe(options.goggles);
            
            expect(bookView.bookshelfId).toBeDefined();
            expect(bookView.bookshelfId).toEqual(jasmine.any(Number));
            expect(bookView.bookshelfId).toBe(options.bookshelfId);

            expect(bookView.modelview).toBeDefined();
            expect(bookView.modelview).toEqual(modelview);            
        });

        describe('Renders BookView', function () {
            beforeEach(function () {
                bookView.render();
            });

            it('should render proper content', function () {
                expect(bookView.$('.book-thumbnail img').attr('src')).toBe(modelview.thumbnail);
                expect(bookView.$('.title a').attr('href')).toEqual(modelview.previewLink);
                expect(bookView.$('.title a').text()).toEqual(modelview.title);
                expect(bookView.$('.authors').text()).toEqual(modelview.authors);

                expect(bookView.$('.add-book').length).toEqual(1);
                expect(bookView.$('.remove-book').length).toEqual(1);
            });
        });

        describe('Click on "remove-book" and "add-book" icons', function () {
            beforeEach(function () {
                spyOn(bookView, 'removeBook');
                spyOn(bookView, 'addBook');
                
                bookView.render();
                bookView.delegateEvents();
            });

            it('should trigger removeBook on click "remove-book" icon', function () {
                bookView.$('.remove-book').trigger('click');

                expect(bookView.removeBook).toHaveBeenCalled();
            });

            it('should trigger addBook on click "add-book" icon', function () {
                bookView.$('.add-book').trigger('click');

                expect(bookView.addBook).toHaveBeenCalled();
            });
        });
    });
});
