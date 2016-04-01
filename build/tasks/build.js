const gulp = require(`gulp`);

const clean = require(`./clean`);

const paths = require(`../config/paths`);
const compile = require(`../lib/compile`);

exports.all = buildAll;
exports.ts = buildTs;

////////////////////

buildAll.displayName = `build`;
gulp.task(buildAll);
function buildAll(done) {
    gulp.parallel(
        buildTs
    )(done);
}

buildTs.displayName = `build:ts`;
gulp.task(buildTs);
function buildTs(done) {
    gulp.series(
        clean.dist,
        compileBuildTs(paths.compile.src)
    )(done);
}

////////////////////

function compileBuildTs(filesRoot) {
    const fn = function compileBuildTsTask() {
        const filesDest = paths.dist.build;
        const filesGlob = [`${filesRoot}/${paths.build.entry}`];
        const options = {
            outFile: paths.build.exit,
        };
        return compile(filesRoot, filesDest, filesGlob, options);
    };
    fn.displayName = `compile:build:ts:${filesRoot.replace(`/`, `:`)}`;
    return fn;
}
