// Karma configuration
// Generated on Thu Mar 10 2016 06:26:49 GMT+1100 (AEDT)
var path = require('path');

module.exports = function (karma) {

    var config = {

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'PhantomJS2'
        ],

        // the maximum bootup time for a browser
        captureTimeout: 10000,

        // enable / disable colours in the output (reporters and logs)
        colors: true,

        //  concurrency level
        // how many browser should be started simultaneously
        concurrency: Infinity,

        // configure custom launchers
        customLaunchers: {
            ChromeTravisCI: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        // list of files to exclude
        exclude: [
        ],

        // list of files / patterns to load in the browser
        files: [
            // files loaded by Karma
            {pattern: 'node_modules/es6-shim/es6-shim.js', included: true},
            {pattern: 'node_modules/systemjs/dist/system-polyfills.src.js', included: true},
            {pattern: 'node_modules/systemjs/dist/system.src.js', included: true},
            {pattern: '.karma/test/unit/setup.js', included: true},

            // files loaded via module imports
            {pattern: '.karma/src/**/*.js', included: false},

            // files loaded for unit tests
            {pattern: '.karma/test/unit/specs/**/*.spec.js', included: false},

            // map files to prevent 404's
            {pattern: 'node_modules/systemjs/dist/*.map', included: false},
            {pattern: '.karma/**/*.map', included: false},
        ],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'jasmine',
        ],

        // level of logging
        // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
        logLevel: karma.LOG_INFO,

        // web server port
        port: 9876,

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '.karma/src/**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'dots',
            'coverage',
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // singleRun: true, // Passed in via gulpfile

        ////////////////////////////////////////
        //                                    //
        //             REPORTERS              //
        //                                    //
        ////////////////////////////////////////

        // coverage reporter
        // https://github.com/karma-runner/karma-coverage
        // configure the where we want the report to be saved
        coverageReporter: {
            dir: 'coverage',
            includeAllSources: true,
            reporters: [
                {
                    file: 'coverage-js.json',
                    subdir: 'json',
                    type: 'json'
                }
            ],
        },

    };

    /**
     * `PhantomJS2` support is limited in Travis CI so we use `Chrome` instead.
     * Note that we also need to configure Travis so it enables Chrome.
     * See `before_script` in the `.travis.yml` file.
     */
    if (process.env.TRAVIS) {
        config.browsers = ['ChromeTravisCI'];
    }

    karma.set(config);

};

/* vim: set cc=0 : */
