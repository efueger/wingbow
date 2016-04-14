const del = require(`del`);
const gulp = require(`gulp`);
const $ = require(`gulp-load-plugins`)();

const clean = require(`./clean`);

const paths = require(`../config/paths`);
const plumb = require(`../lib/plumb`);

exports.all = docAll;
exports.ts = docTs;

////////////////////

docAll.displayName = `doc`;
gulp.task(docAll);
function docAll(done) {
    gulp.series(
        clean.docs,
        docTs
    )(done);
}

docTs.displayName = `doc:ts`;
gulp.task(docTs);
function docTs(done) {
    gulp.series(
        fixLib,
        docTsAll
    )(done);
}

////////////////////

// https://github.com/sebastian-lenz/typedoc/issues/162#issuecomment-195573919
fixLib.displayName = `doc:ts:fix-lib`;
function fixLib() {
    return del(`node_modules/typedoc/node_modules/typescript`);
}

docTsAll.displayName = `doc:ts:all`;
function docTsAll() {
    return gulp.src([...paths.docs.all, ...paths.typings.all])
        .pipe($.plumber(plumb))
        .pipe($.typedoc({
            module: `commonjs`,
            target: `ES5`,
            experimentalDecorators: true,
            out: paths.docs.dist,
        }));
}
