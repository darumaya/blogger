module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var fs = require('fs');
    var path = require('path');

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        less: {
            'blog': {
                options: {
                    strictMath: true,
                    sourceMap: false
                },
                files: [{
                    expand: true, // 展開を有効に
                    cwd: 'src/less/',
                    src: ['styles.less'],
                    dest: 'css/',
                    ext: ".css"
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 8',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            dist: {
                options: {
                    map: false
                },
                src: ['css/styles.css']
            }
        },

        csscomb: {
            dist: {
                expand: true,
                cwd: 'css/',
                src: ['styles.css'],
                dest: 'css/'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true
            },
            dist: {
                files: [{
                    expand: true, // 展開を有効に
                    cwd: 'css/',
                    src: ['styles.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            'dist-css': {
                files: 'src/less/*.less',
                tasks: 'dist-css'
            }
        }
    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    //require('time-grunt')(grunt);

    var runSubset = function (subset) {
        return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
    };
    var isUndefOrNonZero = function (val) {
        return val === undefined || val !== '0';
    };

    // CSS distribution task.
    grunt.registerTask('dist-css', ['less', 'autoprefixer', 'csscomb', 'cssmin']);

    // Default task.
    grunt.registerTask('default', ['dist-css']);
};
