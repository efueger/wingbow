var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path = require('path');

var del = require('del');
var history = require('connect-history-api-fallback');
var KarmaServer = require('karma').Server;
var merge = require('merge-stream');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var webdriver = require('gulp-protractor').webdriver_update;

var port = 3333;
var paths = require('./build/config/paths');

var isCI = 'CI' in process.env;

/**
 * Public Tasks
 */

gulp.task('clean', cleanAll);

gulp.task('build', gulp.series(
    cleanDist,
    buildTsSrc
));

gulp.task('doc', gulp.series(
    cleanDocs,
    docTsSrc
));

gulp.task('test:e2e', gulp.series(
    cleanTestE2E,
    protractorTsSpec,
    protractorUpdate,
    protractorRun,
    cleanTestE2E
));

gulp.task('test:manual', gulp.series(
    cleanDist,
    cleanTestManual,
    buildTsSrc,
    gulp.parallel(copyDistTestManual, copyModulesTestManual)
));

gulp.task('test:unit', gulp.series(
    cleanCoverage,
    cleanTestUnit,
    karmaTsSrc,
    karmaTsSpec,
    karmaRun,
    karmaRemapCoverage
));

gulp.task('serve', gulp.series(
    'build',
    gulp.parallel(watch, liveReloadDist)
));

gulp.task('serve:coverage', gulp.series(
    'test:unit',
    gulp.parallel(watch, liveReloadCoverage)
));

gulp.task('serve:manual', gulp.series(
    'test:manual',
    gulp.parallel(watch, liveReloadManual)
));

/**
 * Definitions
 */

function cleanAll() {
    return del(['docs', 'coverage', 'dist', 'test/manual/dist', 'test/manual/node_modules', '.karma', '.protractor']);
}

function cleanCoverage() {
    return del(['coverage']);
}

function cleanDist() {
    return del(['dist']);
}

function cleanDocs() {
    return del(['docs']);
}

function cleanTestE2E() {
    return del(['.protractor']);
}

function cleanTestManual() {
    return del(['test/manual/dist', 'test/manual/node_modules']);
}

function cleanTestUnit() {
    return del(['.karma']);
}

function copyDistTestManual() {
    return gulp.src(['dist/**/*'])
        .pipe($.plumber())
        .pipe(gulp.dest('test/manual/dist'));
}

function copyModulesTestManual() {
    return gulp.src(['node_modules/{es6-shim,es7-shim,systemjs}/**/*'])
        .pipe($.plumber())
        .pipe(gulp.dest('test/manual/node_modules/'));
}

function docTsSrc() {
    return gulp.src(['src/**/*.ts', ...paths.typings])
        .pipe($.plumber())
        .pipe($.typedoc({
            module: 'commonjs',
            target: 'ES5',
            experimentalDecorators: true,
            out: 'docs'
        }));
}

function ts(title, filesRoot, filesGlob, filesDest, tsProject) {

    var result = gulp.src([...filesGlob, ...paths.typings])
        .pipe($.plumber())
        .pipe($.tslint())
        .pipe($.tslint.report('verbose'))
        .pipe($.preprocess())
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject));

    return result.js
        // .pipe($.uglify({
        //     mangle: false
        // }))
        .pipe($.sourcemaps.write('./', {
            sourceRoot: path.join(__dirname, '/src')
        }))
        .pipe($.size({
            title
        }))
        .pipe(gulp.dest(filesDest))
        .pipe($.connect.reload());
}

function buildTsSrc() {

    var filesRoot = 'src';
    var filesDest = 'dist';
    var filesGlob = [
        `${filesRoot}/wingbow.ts`
    ];

    var srcTsProject = $.typescript.createProject('tsconfig.json', {
        typescript: require('typescript'),
        outFile: 'wingbow.js'
    });

    return ts('src', filesRoot, filesGlob, filesDest, srcTsProject);
}

function karmaTs(root) {

    var filesRoot = root;
    var filesDest = `.karma/${root}`;
    var filesGlob = [
        `${root}/**/*.ts`
    ];

    var karmaTsProject = $.typescript.createProject('tsconfig.json', {
        typescript: require('typescript'),
        compilerOptions: {
            moduleResolution: 'classic',
            baseUrl: '.',
            paths: {
                '*': ['*', 'src/*']
            },
            rootDirs: [
                'src',
                'test'
            ],
        }
    });

    return ts('karma', filesRoot, filesGlob, filesDest, karmaTsProject);

}

function karmaTsSrc() {
    return karmaTs('src');
}

function karmaTsSpec() {
    return karmaTs('test/unit');
}

function karmaRun(done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
    }, function (err) {
        done(isCI ? err : null);
    }).start();
}

function karmaRemapCoverage() {
    return gulp.src('coverage/json/coverage-js.json')
        .pipe($.plumber())
        .pipe(remapIstanbul({
            reports: {
                html: 'coverage/html-report',
                json: 'coverage/json/coverage-ts.json',
                lcovonly: 'coverage/lcov/lcov.info',
                'text-summary': null,
            }
        }));
}

function protractorTsSpec() {

    var filesRoot = 'test/e2e';
    var filesDest = `.protractor/${filesRoot}`;
    var filesGlob = [
        `${filesRoot}/**/*.ts`
    ];

    var protractorTsProject = $.typescript.createProject('tsconfig.json', {
        typescript: require('typescript'),
        module: 'commonjs'
    });

    return ts('protractor', filesRoot, filesGlob, filesDest, protractorTsProject);
}

function protractorUpdate(done) {
    webdriver({}, done);
}

function protractorRun() {
    return gulp.src('.protractor/test/e2e/**/*.spec.js')
        .pipe($.plumber())
        .pipe($.protractor.protractor({
            configFile: 'protractor.conf.js'
        }))
        .on('error', e => { throw e })
}

function watch() {
    gulp.watch(['src/**/*.ts', 'test/manual/index.html'], gulp.series('test:manual', 'test:unit'));
    gulp.watch(['test/unit/**/*.ts'], gulp.series('test:unit'));
}

function liveReloadCoverage() {
    return liveReload('coverage/html-report');
}

function liveReloadDist() {
    return liveReload('dist');
}

function liveReloadManual() {
    return liveReload('test/manual');
}

function liveReload(root) {
    return $.connect.server({
        root: root,
        livereload: true,
        port: port,
        middleware: (connect, opt) => [history()]
    });
}
