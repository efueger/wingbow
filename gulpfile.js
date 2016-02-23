var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var del = require('del');
var path = require('path');
var KarmaServer = require('karma').Server;
var merge = require('merge-stream');
var history = require('connect-history-api-fallback');
var webdriver = require('gulp-protractor').webdriver_update;
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

var port = 3333;


/**
 * Public Tasks
 */

gulp.task('clean', cleanAll);

gulp.task('build', gulp.series(
    cleanAll,
    buildTsSrc
));

gulp.task('serve', gulp.series(
    gulp.parallel(watch, serveDist)
));

gulp.task('test:e2e', gulp.series(
    cleanProtractor,
    protractorTsSpec,
    protractorUpdate,
    protractorRun,
    cleanProtractor
));

gulp.task('test:manual', gulp.series(
    cleanAll,
    buildTsSrc,
    gulp.parallel(copyDistTestManual, copyModulesTestManual),
    gulp.parallel(watch, serveManual)
));

gulp.task('test:unit', gulp.series(
    cleanKarma,
    karmaTsSrc,
    karmaTsSpec,
    karmaRun,
    karmaRemapCoverage,
    cleanKarma
));

/**
 * Definitions
 */

function cleanAll() {
    return del(['docs', 'coverage', 'dist', 'test/manual/dist', 'test/manual/node_modules', '.karma', '.protractor']);
}

function cleanKarma() {
    return del(['.karma']);
}

function cleanProtractor() {
    return del(['.protractor']);
}

function copyDistTestManual() {
    return gulp.src(['dist/**/*'])
        .pipe(gulp.dest('test/manual/dist'));
}

function copyModulesTestManual() {
    return gulp.src(['node_modules/systemjs/**/*'])
        .pipe(gulp.dest('test/manual/node_modules/systemjs'));
}

function doc() {
    return gulp.src(['src/**/*.ts'])
        .pipe($.typedoc({
            module: 'commonjs',
            target: 'ES5',
            experimentalDecorators: true,
            out: 'docs'
        }));
}

function ts(title, filesRoot, filesGlob, filesDest, tsProject) {

    var result = gulp.src([...filesGlob])
        .pipe($.tslint())
        .pipe($.tslint.report('verbose'))
        .pipe($.preprocess())
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject));

    return result.js
        // .pipe($.uglify({
        //     mangle: false
        // }))
        .pipe($.sourcemaps.write('./'))
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
        typescript: require('typescript')
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
    return new KarmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
}

function karmaRemapCoverage() {
    return gulp.src('coverage/json/coverage-js.json')
        .pipe(remapIstanbul({
            reports: {
                json: 'coverage/json/coverage-ts.json',
                html: 'coverage/html-report'
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
        .pipe($.protractor.protractor({
            configFile: 'protractor.conf.js'
        }))
        .on('error', e => { throw e })
}

function watch() {
    gulp.watch(['wingbow.ts', 'src/**/*.ts', 'test/manual/index.html'], gulp.series(buildTsSrc, copyDistTestManual, copyModulesTestManual));
    // gulp.watch(['wingbow.ts', 'src/**/*.ts', 'test/manual/index.html'], gulp.series(buildTsSrc, 'test:unit'));
    // gulp.watch(['test/unit/**/*.ts'], gulp.series('test:unit'));
}

function serveDist() {
    return livereload('dist');
}

function serveManual() {
    return livereload('test/manual');
}

function livereload(root) {
    return $.connect.server({
        root: root,
        livereload: true,
        port: port,
        middleware: (connect, opt) => [history()]
    });
}
