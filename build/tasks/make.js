const gulp = require(`gulp`);

const clean = require(`./clean`);

const paths = require(`../config/paths`);
const release = require(`../lib/release`);

exports.all = makeAll;
exports.ts = makeTs;

////////////////////

makeAll.displayName = `make`;
gulp.task(makeAll);
function makeAll(done) {
    gulp.series(
        clean.dist,
        gulp.parallel(
            makeTs
        )
    )(done);
}

makeTs.displayName = `make:ts`;
gulp.task(makeTs);
function makeTs(done) {
    gulp.series(
        makeTsRelease(paths.make.entry)
    )(done);
}

////////////////////

function makeTsRelease(filesRoot) {
    const fn = function makeTsReleaseTask() {
        const filesDest = paths.make.exit;
        const filesGlob = [
            filesRoot,
        ];
        const options = {
            outFile: paths.make.file,
        };
        return release(filesRoot, filesDest, filesGlob, options);
    };
    fn.displayName = `make:ts:release`;
    return fn;
}
