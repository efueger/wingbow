const gulp = require(`gulp`);
const log = require(`@whitneyit/log`);
const $ = require(`gulp-load-plugins`)();

const paths = require(`../config/paths`);
const plumb = require(`../lib/plumb`);

exports.all = lintAll;
exports.js = lintJs;
exports.json = lintJson;
exports.ts = lintTs;
exports.yml = lintYml;

////////////////////

lintAll.displayName = `lint`;
gulp.task(lintAll);
function lintAll(done) {
    gulp.parallel(
        lintJs,
        lintJson,
        lintTs,
        lintYml
    )(done);
}

lintJs.displayName = `lint:js`;
gulp.task(lintJs);
function lintJs() {
    return gulp.src(paths.lint.js)
        .pipe($.plumber(plumb))
        .pipe($.eslint())
        .pipe($.eslint.format(require(`eslint-friendly-formatter`)))
        .pipe($.eslint.failAfterError());
}

lintJson.displayName = `lint:json`;
gulp.task(lintJson);
function lintJson() {
    return gulp.src(paths.lint.json)
        .pipe($.plumber(plumb))
        .pipe($.stripJsonComments())
        .pipe($.jsonlint())
        .pipe($.jsonlint.failAfterError())
        .pipe($.jsonlint.reporter(file => {
            log.err(`File "${file.path}" is not valid JSON`);
        }));
}

lintTs.displayName = `lint:ts`;
gulp.task(lintTs);
function lintTs() {
    return gulp.src(paths.lint.ts)
        .pipe($.plumber(plumb))
        .pipe($.tslint())
        .pipe($.tslint.report(`verbose`));
}

lintYml.displayName = `lint:yml`;
gulp.task(lintYml);
function lintYml() {
    return gulp.src(paths.lint.yml)
        .pipe($.plumber(plumb))
        .pipe($.yamlValidate());
}
