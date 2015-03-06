define(function(require, exports, module) {
    'use strict';

    var BooksSearchView = require('main_page/books_search/books_search_view'),
        Goggles = require('lib/goggles'),
        BooksSearchTemplate = require('text!main_page/books_search/books_search_view.html');

    describe('Initialize BooksSearchView', function() {
        var options,
            booksSearchView,
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

            booksSearchView = new BooksSearchView(options);
        });

        it('should exists', function () {
            expect(booksSearchView).toBeDefined();
        });

        it('should have proper properties', function () {
            expect(booksSearchView.goggles).toBeDefined();
            expect(booksSearchView.goggles).toEqual(jasmine.any(Object));
            expect(booksSearchView.goggles).toBe(options.goggles);
            
            expect(booksSearchView.bookshelfId).toBeDefined();
            expect(booksSearchView.bookshelfId).toEqual(jasmine.any(Number));
            expect(booksSearchView.bookshelfId).toBe(options.bookshelfId);
        });

        describe('Renders BooksSearchView', function () {
            beforeEach(function () {
                booksSearchView.render();
            });

            it('should render proper content', function () {
                expect(booksSearchView.$el.html()).toEqual(BooksSearchTemplate);
            });
        });
        
        describe('Triggering pressing enter in search fields', function () {
            beforeEach(function () {
                spyOn(booksSearchView, 'enterKeyHandler');

                booksSearchView.render();
                booksSearchView.delegateEvents();
            });

            it('should call enterKeyHandler method after pressing key in "title" field', function () {
                booksSearchView.$('input[name="title"]').trigger($.Event('keyup', { keyCode: 13 }));

                expect(booksSearchView.enterKeyHandler).toHaveBeenCalled();
            });

            it('should call enterKeyHandler method after pressing key in "author" field', function () {
                booksSearchView.$('input[name="author"]').trigger($.Event('keyup', { keyCode: 10 }));

                expect(booksSearchView.enterKeyHandler).toHaveBeenCalled();
            });
        });

        describe('Triggering books search', function () {
            beforeEach(function () {
                spyOn(booksSearchView, 'searchBooks');

                booksSearchView.render();
                booksSearchView.delegateEvents();
            });

            it('should call searchBooks method after click', function () {
                booksSearchView.$('.search-button').trigger('click');

                expect(booksSearchView.searchBooks).toHaveBeenCalled();
            });

            it('should call searchBooks method after pressing enter in "title" field', function () {
                booksSearchView.$('input[name="title"]').trigger($.Event('keyup', { keyCode: 13 }));
                expect(booksSearchView.searchBooks).toHaveBeenCalled();
            });


            it('should call searchBooks method after pressing enter in "author" field', function () {
                booksSearchView.$('input[name="author"]').trigger($.Event('keyup', { keyCode: 13 }));

                expect(booksSearchView.searchBooks).toHaveBeenCalled();
            });

            it('should call searchBooks method after pressing another key in "title" or "author" fields', function () {
                booksSearchView.$('input[name="title"]').trigger($.Event('keyup', { keyCode: 10 }));
                expect(booksSearchView.searchBooks).not.toHaveBeenCalled();
                
                booksSearchView.$('input[name="author"]').trigger($.Event('keyup', { keyCode: 10 }));
                expect(booksSearchView.searchBooks).not.toHaveBeenCalled();
            });
        });

        describe('Performing books search', function () {
            beforeEach(function () {
                spyOn(booksSearchView.goggles, 'then');

                booksSearchView.render();
                booksSearchView.delegateEvents();
            });

            it('should not perform a search without any params', function () {
                booksSearchView.$('.search-button').trigger('click');

                expect(booksSearchView.goggles.then).not.toHaveBeenCalled();
            });

            it('should not perform a search when query were last searched', function () {
                booksSearchView.lastQueryString = 'intitle:test';
                booksSearchView.$('input[name="title"]').val('test');

                booksSearchView.$('.search-button').trigger('click');

                expect(booksSearchView.goggles.then).not.toHaveBeenCalled();
            });

            it('should perform a search when query was changed', function () {
                booksSearchView.$('input[name="title"]').val('test');

                booksSearchView.$('.search-button').trigger('click');

                expect(booksSearchView.goggles.then).toHaveBeenCalled();
            });
        });
        
        describe('Gets search response', function () {
            beforeEach(function () {
                booksSearchView.render();
                booksSearchView.delegateEvents();
            });

            it('should perform a search when query was changed', function () {
                booksSearchView.$('input[name="title"]').val('test');

                booksSearchView.$('.search-button').trigger('click');
            });
        });
    });
});
