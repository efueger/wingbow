const gulp = require(`gulp`);

exports.all = ciAll;

const doc = require(`./doc`);
const lint = require(`./lint`);
const test = require(`./test`);
const verify = require(`./verify`);

////////////////////

ciAll.displayName = `ci`;
gulp.task(ciAll);
function ciAll(done) {
    gulp.series(
        test.all,
        lint.all,
        doc.all,
        verify.all
    )(done);
}
