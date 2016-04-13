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
    gulp.parallel(
        makeTs
    )(done);
}

makeTs.displayName = `make:ts`;
gulp.task(makeTs);
function makeTs(done) {
    gulp.series(
        clean.dist,
        releaseMakeSrc(paths.make.entry)
    )(done);
}

////////////////////

function releaseMakeSrc(filesRoot) {
    const fn = function releaseMakeSrcTask() {
        const filesDest = paths.make.exit;
        const filesGlob = [
            filesRoot,
        ];
        const options = {
            outFile: paths.make.file,
        };
        return release(filesRoot, filesDest, filesGlob, options);
    };
    fn.displayName = `make:release:${filesRoot.replace(`/`, `:`)}`;
    return fn;
}
