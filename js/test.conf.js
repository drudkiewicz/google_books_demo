/*global requirejs, QUnit */
var qUnitElement = document.createElement('div'),
    allTestFiles = [],
    TEST_REGEXP = /test\.js$/i;

    console.log('tests')

var pathToModule = function (path) {
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});


/* Test Configuration and set-up */
QUnit.config.autostart = false;
qUnitElement.id = "qunit-fixture";
document.body.appendChild(qUnitElement);

requirejs.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: 'js/',

    paths: {
        'text': '../lib/requirejs-text/text',
        'lib/backbone': '../lib/backbone/backbone',
        'lib/goggles': '../lib/goggles/goggles',
        'lib/jquery': '../lib/jquery/dist/jquery',
        'lib/underscore': '../lib/underscore/underscore'
    },

    shim : {
        'lib/backbone': {
            deps: ['lib/underscore', 'lib/jquery'],
            exports: 'Backbone'
        },
        'lib/goggles': {
            exports: 'Goggles'
        },
        'lib/underscore': {
            exports: '_'
        }
    },
    // include: [
    //     'app.test'
    // ]

    // load test file
    deps: ['app.test'],

    callback: window.__karma__.start
});
