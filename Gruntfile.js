/*global module:false*/
module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
    // Task configuration.
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: 'app.build.js'
                }
            }
        },
        jshint: {
            mainjsfiles: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: 'jslint',
                    reporterOutput: 'jshint.xml',
                    force: true
                },
                files: {
                    src: ['js/**/!(require.conf).js']
                }
            }
        },
        jasmine : {
            src : 'js/**/*.js',
            options : {
                specs : 'spec/**/*spec.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: ['js/require.conf.js'],
                    requireConfig: {
                        baseUrl: 'js'
                    }
                }
            }
       }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jshint', 'jasmine']);
}
