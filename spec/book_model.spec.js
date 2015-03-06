/* global describe, it, beforeEach, expect, jasmine */
define(function(require, exports, module) {
    'use strict';

    var BookModel = require('main_page/book/book_model');

    describe('Initialize BookModel with thumbnail', function() {
        var options,
            bookModel;

        beforeEach(function () {
            options = {
                id: '2',
                volumeInfo: {
                    title: 'book',
                    authors: ['John Smith', 'Peter Duck'],
                    previewLink: 'some_link',
                    imageLinks: {
                        smallThumbnail: 'thumbnail'
                    }
                }
            };

            bookModel = new BookModel(options);
        });

        it('should exists', function () {
            expect(bookModel).toBeDefined();
        });

        it('should have proper properties', function () {
            expect(bookModel.get('authors')).toBeDefined();
            expect(bookModel.get('authors')).toEqual(jasmine.any(Array));
            expect(bookModel.get('authors')).toEqual(options.volumeInfo.authors);

            expect(bookModel.get('thumbnail')).toBeDefined();
            expect(bookModel.get('thumbnail')).toEqual(jasmine.any(String));
            expect(bookModel.get('thumbnail')).toEqual(options.volumeInfo.imageLinks.smallThumbnail);

            expect(bookModel.get('title')).toBeDefined();
            expect(bookModel.get('title')).toEqual(jasmine.any(String));
            expect(bookModel.get('title')).toEqual(options.volumeInfo.title);

            expect(bookModel.get('previewLink')).toBeDefined();
            expect(bookModel.get('previewLink')).toEqual(jasmine.any(String));
            expect(bookModel.get('previewLink')).toEqual(options.volumeInfo.previewLink);
        });
    });

    describe('Initialize BookModel without thumbnail', function() {
        var options,
            bookModel;

        beforeEach(function () {
            options = {
                id: '2',
                volumeInfo: {
                    title: 'book',
                    authors: ['John Smith', 'Peter Duck'],
                    previewLink: 'some_link'
                }
            };

            bookModel = new BookModel(options);
        });

        it('should exists', function () {
            expect(bookModel).toBeDefined();
        });

        it('should have proper properties', function () {
            expect(bookModel.get('thumbnail')).toBeDefined();
            expect(bookModel.get('thumbnail')).toEqual(jasmine.any(String));
            expect(bookModel.get('thumbnail')).toEqual('/images/no_image.jpg');
        });
    });
});
