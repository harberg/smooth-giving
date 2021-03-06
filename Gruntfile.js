module.exports = function(grunt) {

    //-------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------

    // Strip comments from JSON file and return JS object
    var _readJsonCfg = function(name) {
        if(!grunt.file.exists(name)) { return "{}"; }
        return JSON.parse(grunt.file.read(name).replace(/\/\/.*\n/g, ""));
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bowerPath: "bower_components",
        libPath: "app/js/libs",
        appPath: "app/js/app",
        distPath: "app/public",

        //-------------------------------------------------------------
        // Clean tasks.
        // ------------------------------------------------------------

        clean: {
            libs: "<%= libPath %>",
            public: "<%= distPath %>"
        },

        //-------------------------------------------------------------
        // Copy tasks.
        // ------------------------------------------------------------

        copy: {
            libs: {
                files: [
                    {
                        cwd: "<%= bowerPath %>",
                        dest: "<%= libPath %>",
                        expand: true,
                        flatten: true,
                        src: [
                            // App libraries
                            "angular/angular.js",
                            "angular-loader/angular-loader.js",
                            "angular-route/angular-route.js",

                            // Testing libraries
                            "chai/chai.js",
                            "mocha/mocha.css",
                            "mocha/mocha.js",

                        ]// end src
                    }
                ]// end files
            },// end lib
            public: {
                files: [
                    {
                        cwd: "<%= bowerPath %>",
                        dest: "<%= distPath %>",
                        expand: true,
                        flatten: true,
                        src: [
                            "requirejs/require.js"
                        ]
                    }
                ]// end files
            }// end public
        },// end copy

        //-------------------------------------------------------------
        // Bundle tasks.
        // ------------------------------------------------------------

        requirejs: {
            app: {
                options: {
                    name: "config",
                    baseUrl: "app/js",
                    mainConfigFile: "app/js/config.js",
                    out: "<%= distPath %>/public.js",
                    optimize: "none"
                }// end options
            }// end app
        },// end requirejs

        //-------------------------------------------------------------
        // Sass compilation.
        // ------------------------------------------------------------

        sass: {
            development: {
                options: {

                },
                files: {

                },
            },
        },

        //-------------------------------------------------------------
        // JSHint.
        // ------------------------------------------------------------

        jshint: {
            client: {
                options: _readJsonCfg(".jshint.json"),
                files: {
                    src: [
                        "app/js/*.js",
                        "app/js/**/*.js",
                        "!app/js/libs/**/*.js",
                        "test/*/js/**/*.js"
                    ]// end src
                }// end files
            }// end client
        },// end jshint

        // ------------------------------------------------------------
        // Express
        // ------------------------------------------------------------

        express: {
            options: {

            },
            dev: {
                options: {
                    script: "server/server.js",
                }
            },
            prod: {
                options: {
                    script: "server/server.js",
                    node_env: "production"
                }
            },
            test: {
                options: {
                    script: "server/server.js"
                }
            }
        }, // end express

        // ------------------------------------------------------------
        // Watch
        // ------------------------------------------------------------

        watch: {
            express: {
                files: [ 'server/server.js' ],
                tasks: [ 'express:dev' ],
                options: {
                    spawn: false
                }
            }, // end express
            options: {
                livereload: true
            },
            scripts: {
                files: [ "app/js/app/**/*.js", "app/js/app/*.js" ],
                tasks: [ "jshint" ],
                options: {
                    spawn: false,
                    reload: true
                },
            }, // end scripts
        }, // end watch

        // ------------------------------------------------------------
        // Tests
        // ------------------------------------------------------------

        casper: {
            acceptance: {
                options: {
                    test:true,
                },
                files: {
                    'test/acceptance/casper-results.xml':['test/acceptance/*_test.js']
                }
            }
        },

    });// end grunt.initConfig

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // ------------------------------------------------------------
    // Task: Build
    // ------------------------------------------------------------

    grunt.registerTask('build', ['clean:libs', 'copy:libs', 'clean:public', 'copy:public', 'requirejs']);

    // ------------------------------------------------------------
    // Task: Test
    // ------------------------------------------------------------

    grunt.registerTask('casper:test', ['express:dev', 'casper']);
    grunt.registerTask("test",        ["casper:test"]);
    grunt.registerTask("check",       ["jshint", "test"]);

    // ------------------------------------------------------------
    // Task: Default
    // ------------------------------------------------------------

    grunt.registerTask('serve', ['build', 'express:dev', 'watch']);
    grunt.registerTask('default', ['build', 'express:dev', 'watch']);















    //-------------------------------------------------------------
    // Clean tasks.
    // ------------------------------------------------------------

    //-------------------------------------------------------------
    // Clean tasks.
    // ------------------------------------------------------------










}// end module.exports(grunt)