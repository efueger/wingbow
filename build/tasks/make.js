const gulp = require(`gulp`);

const clean = require(`./clean`);

const paths = require(`../config/paths`);
const compile = require(`../lib/compile`);

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
        compileMakeTs(paths.compile.src)
    )(done);
}

////////////////////

function compileMakeTs(filesRoot) {
    const fn = function compileMakeTsTask() {
        const filesDest = paths.dist.make;
        const filesGlob = [`${filesRoot}/${paths.make.entry}`];
        const options = {
            outFile: paths.make.exit,
        };
        return compile(filesRoot, filesDest, filesGlob, options);
    };
    fn.displayName = `compile:make:ts:${filesRoot.replace(`/`, `:`)}`;
    return fn;
}
