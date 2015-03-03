var require = {
        deps: ['app'],
        paths: {
            'text': 'lib/requirejs-text/require.text',
            'lib/backbone': '../lib/backbone/backbone',
            'lib/jquery': '../lib/jquery/dist/jquery',
            'lib/underscore': '../lib/underscore/underscore'
        },
        shim : {
            'lib/backbone': {
                deps: ['lib/underscore', 'lib/jquery'],
                exports: 'Backbone'
            },
            'lib/underscore' : {
                exports: '_'
            }
        }
    };
