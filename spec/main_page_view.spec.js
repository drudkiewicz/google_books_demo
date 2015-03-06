define(function(require, exports, module) {
    'use strict';

    var MainPageView = require('main_page/main_page_view'),
        Goggles = require('lib/goggles');

    describe('Initialize MainPageView', function() {
        var options,
            mainPageView,
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

            mainPageView = new MainPageView(options);
        });

        it('should exists', function () {
            expect(mainPageView).toBeDefined();
            expect(mainPageView.renderBooksSearchView).toBeDefined();
        });

        it('should have proper properties', function () {
            expect(mainPageView.goggles).toBeDefined();
            expect(mainPageView.goggles).toEqual(jasmine.any(Object));
            expect(mainPageView.goggles).toBe(options.goggles);
            
            expect(mainPageView.bookshelfId).toBeDefined();
            expect(mainPageView.bookshelfId).toEqual(jasmine.any(Number));
            expect(mainPageView.bookshelfId).toBe(options.bookshelfId);
        });

        describe('Renders MainPageView', function() {
            beforeEach(function () {
                spyOn(mainPageView, 'renderBooksSearchView');
                spyOn(mainPageView, 'renderMyBooksView');

                mainPageView.render();
            });

            it('should call renderBooksSearchView', function () {
                expect(mainPageView.renderBooksSearchView).toHaveBeenCalled();
            });


            it('should call renderMyBooksView', function () {
                expect(mainPageView.renderMyBooksView).toHaveBeenCalled();
            });

        });
        
        describe('Renders BooksSearchView', function () {
            beforeEach(function () {
                mainPageView.renderBooksSearchView();
            });

            it('should create BooksSearchView', function () {
                expect(mainPageView.booksSearchView).toBeDefined();                    
                expect(mainPageView.booksSearchView.$el).toEqual(mainPageView.$('.books-search'));
            });
        });

        describe('Renders MyBooksView', function () {
            beforeEach(function () {
                mainPageView.renderMyBooksView();
            });

            it('should create MyBooksView', function () {
                expect(mainPageView.myBooksView).toBeDefined();                    
                expect(mainPageView.myBooksView.$el).toEqual(mainPageView.$('.my-books'));
            });
        });
    });
});
