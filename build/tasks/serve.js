const gulp = require(`gulp`);
const $ = require(`gulp-load-plugins`)();

const history = require(`connect-history-api-fallback`);
const port = 3333;

const build = require(`./build`);
const doc = require(`./doc`);
const test = require(`./test`);
const watch = require(`./watch`);

const paths = require(`../config/paths`);

exports.coverage = serveCoverage;
exports.dist = serveDist;
exports.docs = serveDocs;
exports.manual = serveManual;

////////////////////

serveCoverage.displayName = `serve:coverage`;
gulp.task(serveCoverage);
function serveCoverage(done) {
    gulp.series(
        test.unit,
        gulp.parallel(
            watch.all,
            livereload(paths.coverage.html)
        )
    )(done);
}

serveDist.displayName = `serve:dist`;
gulp.task(serveDist);
function serveDist(done) {
    gulp.series(
        build.all,
        gulp.parallel(
            watch.all,
            livereload(paths.dist.build)
        )
    )(done);
}

serveDocs.displayName = `serve:docs`;
gulp.task(serveDocs);
function serveDocs(done) {
    gulp.series(
        doc.all,
        gulp.parallel(
            watch.all,
            livereload(paths.dist.docs)
        )
    )(done);
}

serveManual.displayName = `serve:manual`;
gulp.task(serveManual);
function serveManual(done) {
    gulp.series(
        test.manual,
        gulp.parallel(
            watch.all,
            livereload(paths.dist.testManual)
        )
    )(done);
}

////////////////////

function livereload(root) {
    const fn = function livereloadTask() {
        return $.connect.server({
            root,
            port,
            livereload: true,
            middleware: () => [history()],
        });
    };
    fn.displayName = `livereload:${root.replace(`/`, `:`)}`;
    return fn;
}
