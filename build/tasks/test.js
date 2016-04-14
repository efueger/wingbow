const path = require(`path`);
const gulp = require(`gulp`);
const KarmaServer = require(`karma`).Server;
const remapIstanbul = require(`remap-istanbul/lib/gulpRemapIstanbul`);
const $ = require(`gulp-load-plugins`)();

const clean = require(`./clean`);
const make = require(`./make`);
const webdriver = require(`./webdriver`);

const paths = require(`../config/paths`);
const compile = require(`../lib/compile`);
const isCI = require(`../lib/is-ci`);
const plumb = require(`../lib/plumb`);

exports.all = testAll;
exports.e2e = testE2E;
exports.manual = testManual;
exports.unit = testUnit;

////////////////////

testAll.displayName = `test`;
gulp.task(testAll);
function testAll(done) {
    gulp.series(
        testE2E,
        testUnit
    )(done);
}

testE2E.displayName = `test:e2e`;
gulp.task(testE2E);
function testE2E(done) {
    gulp.series(
        clean.testE2E,
        gulp.parallel(
            compileTestE2E(paths.compile.src),
            compileTestE2E(paths.compile.testE2E)
        ),
        webdriver.update,
        protractorRun
    )(done);
}

testManual.displayName = `test:manual`;
gulp.task(testManual);
function testManual(done) {
    gulp.series(
        gulp.parallel(
            clean.dist,
            clean.testManual
        ),
        make.ts,
        gulp.parallel(
            copyTestManualDist,
            copyTestManualModules
        )
    )(done);
}

testUnit.displayName = `test:unit`;
gulp.task(testUnit);
function testUnit(done) {
    gulp.series(
        clean.testUnit,
        gulp.parallel(
            compileTestUnit(paths.compile.src),
            compileTestUnit(paths.compile.testUnit)
        ),
        karmaRun,
        karmaRemapCoverage
    )(done);
}

////////////////////

function compileTestE2E(filesRoot) {
    const fn = function compileTestE2ETask() {
        const filesDest = `${paths.tmp.protractor}/${filesRoot}`;
        const filesGlob = [
            `${filesRoot}/**/*.ts`,
        ];
        const options = {
            module: `commonjs`,
        };
        return compile(filesRoot, filesDest, filesGlob, options);
    };
    fn.displayName = `test:compile:${filesRoot.replace(`/`, `:`)}`;
    return fn;
}

function compileTestUnit(filesRoot) {
    const fn = function compileTestUnitTask() {
        const filesDest = `${paths.tmp.karma}/${filesRoot}`;
        const filesGlob = [
            `${filesRoot}/**/*.ts`,
        ];
        const options = {
            compilerOptions: {
                moduleResolution: `classic`,
                baseUrl: `.`,
                paths: {
                    '*': [`*`, `src/*`],
                },
                rootDirs: [
                    `src`,
                    `test`,
                ],
            },
        };
        return compile(filesRoot, filesDest, filesGlob, options);
    };
    fn.displayName = `test:compile:${filesRoot.replace(`/`, `:`)}`;
    return fn;
}

copyTestManualDist.displayName = `test:copy:test:manual:dist`;
function copyTestManualDist() {
    return gulp.src(paths.copy.dist)
        .pipe($.plumber(plumb))
        .pipe(gulp.dest(paths.test.manualDist));
}

copyTestManualModules.displayName = `test:copy:test:manual:modules`;
function copyTestManualModules() {
    return gulp.src(paths.copy.modules)
        .pipe($.plumber(plumb))
        .pipe(gulp.dest(paths.test.manualModules));
}

karmaRemapCoverage.displayName = `test:karma:remap:coverage`;
function karmaRemapCoverage() {
    return gulp.src(paths.coverage.remapPre)
        .pipe($.plumber(plumb))
        .pipe(remapIstanbul({
            reports: {
                html: paths.coverage.html,
                json: paths.coverage.remapPost,
                lcovonly: paths.coverage.lcov,
                'text-summary': null,
            },
        }));
}

karmaRun.displayName = `test:karma:run`;
function karmaRun(done) {
    new KarmaServer({
        configFile: path.join(__dirname, `..`, `..`, `karma.conf.js`),
        singleRun: true,
    }, (err) => {
        done(isCI ? err : null);
    }).start();
}

protractorRun.displayName = `test:protractor:run`;
function protractorRun() {
    return gulp.src(`${paths.tmp.protractor}/test/e2e/specs/**/*.spec.js`)
        .pipe($.plumber(plumb))
        .pipe($.protractor.protractor({
            configFile: `protractor.conf.js`,
        }))
        .on(`error`, (err) => {
            throw err;
        });
}
