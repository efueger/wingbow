const gulp = require(`gulp`);

const doc = require(`./doc`);
const lint = require(`./lint`);
const test = require(`./test`);

const paths = require(`../config/paths`);

exports.all = watchAll;
exports.js = watchJs;
exports.testManual = watchTestManual;
exports.ts = watchTs;

////////////////////

watchAll.displayName = `watch`;
gulp.task(watchAll);
function watchAll(done) {
    gulp.parallel(
        watchJs,
        watchTestManual,
        watchTs
    )(done);
}

watchJs.displayName = `watch:js`;
gulp.task(watchJs);
function watchJs() {
    gulp.watch(paths.watch.js, gulp.series(
        lint.js
    ));
}

watchTestManual.displayName = `watch:test:manual`;
gulp.task(watchTestManual);
function watchTestManual() {
    gulp.watch(paths.watch.testManual, gulp.series(
        test.manual
    ));
}

watchTs.displayName = `watch:ts`;
gulp.task(watchTs);
function watchTs() {
    gulp.watch(paths.watch.ts, gulp.series(
        test.unit,
        lint.ts,
        doc.ts
    ));
}
