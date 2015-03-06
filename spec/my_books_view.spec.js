/* global describe, it, beforeEach, expect, jasmine, spyOn */
define(function(require, exports, module) {
    'use strict';

    var MyBooksView = require('main_page/my_books/my_books_view'),
        Goggles = require('lib/goggles');

    describe('Initialize BooksSearchView', function() {
        var options,
            myBooksView,
            goggles;

        beforeEach(function () {
            goggles = new Goggles({
                apiKey: 'someApiKey',
                clientId: 'someClientId',
                scope: ['someScope']
            });

            options = {
                goggles: goggles,
                bookshelfId: 0
            };

            myBooksView = new MyBooksView(options);
        });

        it('should exists', function () {
            expect(myBooksView).toBeDefined();
        });

        it('should have proper properties', function () {
            expect(myBooksView.goggles).toBeDefined();
            expect(myBooksView.goggles).toEqual(jasmine.any(Object));
            expect(myBooksView.goggles).toBe(options.goggles);
            
            expect(myBooksView.bookshelfId).toBeDefined();
            expect(myBooksView.bookshelfId).toEqual(jasmine.any(Number));
            expect(myBooksView.bookshelfId).toBe(options.bookshelfId);
        });

        describe('Renders MyBooksView', function () {
            beforeEach(function () {
                spyOn(myBooksView.goggles, 'then');

                myBooksView.render();
            });

            it('should render proper content', function () {
                expect(myBooksView.$('.books-list').length).toEqual(1);
            });

            it('should send request for my books', function () {
                expect(myBooksView.goggles.then).toHaveBeenCalled();
            });
        });
        
        describe('Renders My Books List', function () {
            var response;

            beforeEach(function () {
                response = { 
                    result: {
                        items: [{
                            id: '2',
                            volumeInfo: {
                                title: 'book',
                                authors: ['John Smith', 'Peter Duck'],
                                previewLink: 'some_link',
                                imageLinks: {
                                    smallThumbnail: 'thumbnail'
                                }
                            }
                        }]
                    }
                };
                    
                myBooksView.renderMyBooksList(response);
            });

            it('should render BooksListView', function () {
                expect(myBooksView.booksListView).toBeDefined();
                expect(myBooksView.booksListView.$el).toEqual(myBooksView.$('.books-list'));
                expect(myBooksView.booksListView.options.books).toEqual(response.result.items);
            });
        });
    });
});
