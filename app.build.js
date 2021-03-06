require.config({
    baseUrl: 'js',
    paths: {
        'text': '../lib/requirejs-text/text',
        'lib/backbone': '../lib/backbone/backbone',
        'lib/goggles': '../lib/goggles/goggles',
        'lib/jquery': '../lib/jquery/dist/jquery',
        'lib/mustache': '../lib/mustache.js/mustache',
        'lib/underscore': '../lib/underscore/underscore'
    },
    name: 'app',
    shim : {
        'lib/backbone': {
            deps: ['lib/underscore', 'lib/jquery'],
            exports: 'Backbone'
        },
        'lib/goggles': {
            exports: 'Goggles'
        },
        'lib/mustache': {
            exports: 'Mustache'
        },
        'lib/underscore': {
            exports: '_'
        }
    },
    include: [
        'app'
    ],
    removeCombined: true,
    out: 'static/app.js',
    optimize: 'uglify'
});
