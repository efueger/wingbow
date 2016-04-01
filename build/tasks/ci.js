const gulp = require(`gulp`);

exports.all = ciAll;

const doc = require(`./doc`);
const lint = require(`./lint`);
const test = require(`./test`);

////////////////////

ciAll.displayName = `ci`;
gulp.task(ciAll);
function ciAll(done) {
    gulp.series(
        test.unit,
        lint.all,
        doc.all
    )(done);
}
