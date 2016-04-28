const gulp = require(`gulp`);

exports.all = ciAll;

const doc = require(`./doc`);
const lint = require(`./lint`);
const make = require(`./make`);
const test = require(`./test`);
const verify = require(`./verify`);

////////////////////

ciAll.displayName = `ci`;
gulp.task(ciAll);
function ciAll(done) {
    gulp.series(
        test.all,
        make.all,
        lint.all,
        doc.all,
        verify.all
    )(done);
}
