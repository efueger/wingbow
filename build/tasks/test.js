const path = require(`path`);
const gulp = require(`gulp`);
const KarmaServer = require(`karma`).Server;
const remapIstanbul = require(`remap-istanbul/lib/gulpRemapIstanbul`);
const $ = require(`gulp-load-plugins`)();
const webdriver = require(`gulp-protractor`).webdriver_update;

const build = require(`./build`);
const clean = require(`./clean`);

const paths = require(`../config/paths`);
const compile = require(`../lib/compile`);
const isCI = require(`../lib/isCI`);
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
        webdriverUpdate,
        gulp.parallel(
            compileTestE2E(paths.compile.src),
            compileTestE2E(paths.compile.testE2E)
        ),
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
        build.ts,
        gulp.parallel(
            copyDist,
            copyModules
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
    fn.displayName = `compile:test:e2e:${filesRoot.replace(`/`, `:`)}`;
    return fn;
}

function compileTestUnit(filesRoot) {
    const fn = function compileTestUnitTask() {
        const filesDest = `${paths.tmp.karma}/${filesRoot}`;
        const filesGlob = [`${filesRoot}/**/*.ts`];
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
    fn.displayName = `compile:test:unit:${filesRoot.replace(`/`, `:`)}`;
    return fn;
}

copyDist.displayName = `copy:dist`;
function copyDist() {
    return gulp.src(paths.copy.dist)
        .pipe($.plumber(plumb))
        .pipe(gulp.dest(paths.dist.testManualDist));
}

copyModules.displayName = `copy:modules`;
function copyModules() {
    return gulp.src(paths.copy.modules)
        .pipe($.plumber(plumb))
        .pipe(gulp.dest(paths.dist.testManualModules));
}

karmaRemapCoverage.displayName = `karma:remap:coverage`;
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

karmaRun.displayName = `karma:run`;
function karmaRun(done) {
    new KarmaServer({
        configFile: path.join(__dirname, `..`, `..`, `karma.conf.js`),
        singleRun: true,
    }, (err) => {
        done(isCI ? err : null);
    }).start();
}

protractorRun.displayName = `protractor:run`;
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

webdriverUpdate.displayName = `webdriver:update`;
function webdriverUpdate(done) {
    webdriver({}, done);
}
