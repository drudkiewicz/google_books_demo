/*global module:false*/
module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
    // Task configuration.
        karma: {
            options: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                singleRun: true,
                reporters: ['progress', 'coverage']
            },
            dev: {
                coverageReporter: {
                    type: 'html',
                    dir: 'coverage/'
                },
                preprocessors: {
                    'js/**/*.js': 'coverage'
                }
            }
        },
        connect: {
            server:{
                options:{
                    port: 9998,
                    hostname: 'localhost',
                    base: ''
                }
            }
        },
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
                    src: ['js/**/*.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['connect:server', 'karma:dev']);
}
