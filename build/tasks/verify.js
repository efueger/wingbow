const gulp = require(`gulp`);
const $ = require(`gulp-load-plugins`)();
const eslintFriendlyFormatter = require(`eslint-friendly-formatter`);

const paths = require(`../config/paths`);
const plumb = require(`../lib/plumb`);

exports.all = verifyAll;
exports.js = verifyJs;

////////////////////

verifyAll.displayName = `verify`;
gulp.task(verifyAll);
function verifyAll(done) {
    gulp.parallel(
        verifyJs
    )(done);
}

verifyJs.displayName = `verify:js`;
gulp.task(verifyJs);
function verifyJs() {
    return gulp.src(paths.verify.js)
        .pipe($.plumber(plumb))
        .pipe($.eslint())
        .pipe($.eslint.format(eslintFriendlyFormatter))
        .pipe($.eslint.failAfterError());
}
