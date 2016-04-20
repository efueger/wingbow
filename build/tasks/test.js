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
            testE2ECompile(paths.compile.src),
            testE2ECompile(paths.compile.testE2E)
        ),
        webdriver.update,
        testE2EProtractorRun
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
        gulp.parallel(
            make.ts
        ),
        gulp.parallel(
            testManualCopyDist,
            testManualCopyModules
        )
    )(done);
}

testUnit.displayName = `test:unit`;
gulp.task(testUnit);
function testUnit(done) {
    gulp.series(
        clean.testUnit,
        gulp.parallel(
            testUnitCompile(paths.compile.src),
            testUnitCompile(paths.compile.testUnit)
        ),
        testUnitKarmaRun,
        testUnitKarmaCoverage
    )(done);
}

////////////////////

testE2EProtractorRun.displayName = `test:e2e:protractor:run`;
function testE2EProtractorRun() {
    return gulp.src(`${paths.tmp.protractor}/test/e2e/specs/**/*.spec.js`)
        .pipe($.plumber(plumb))
        .pipe($.protractor.protractor({
            configFile: `protractor.conf.js`,
        }))
        .on(`error`, (err) => {
            throw err;
        });
}

testManualCopyDist.displayName = `test:manual:copy:dist`;
function testManualCopyDist() {
    return gulp.src(paths.copy.dist)
        .pipe($.plumber(plumb))
        .pipe(gulp.dest(paths.test.manualDist));
}

testManualCopyModules.displayName = `test:manual:copy:modules`;
function testManualCopyModules() {
    return gulp.src(paths.copy.modules)
        .pipe($.plumber(plumb))
        .pipe(gulp.dest(paths.test.manualModules));
}

testUnitKarmaCoverage.displayName = `test:unit:karma:coverage`;
function testUnitKarmaCoverage() {
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

testUnitKarmaRun.displayName = `test:unit:karma:run`;
function testUnitKarmaRun(done) {
    new KarmaServer({
        configFile: path.join(__dirname, `..`, `..`, `karma.conf.js`),
        singleRun: true,
    }, (err) => {
        done(isCI ? err : null);
    }).start();
}

////////////////////

function testE2ECompile(filesRoot) {
    const fn = function testE2ECompileTask() {
        const filesDest = `${paths.tmp.protractor}/${filesRoot}`;
        const filesGlob = [
            `${filesRoot}/**/*.ts`,
        ];
        const options = {
            module: `commonjs`,
        };
        return compile(filesRoot, filesDest, filesGlob, options);
    };
    fn.displayName = `test:e2e:compile:${path.dirname(filesRoot)}`;
    return fn;
}

function testUnitCompile(filesRoot) {
    const fn = function testUnitCompileTask() {
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
    fn.displayName = `test:unit:compile:${path.dirname(filesRoot)}`;
    return fn;
}
