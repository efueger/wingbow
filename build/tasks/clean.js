const gulp = require(`gulp`);
const del = require(`del`);

const paths = require(`../config/paths`);

exports.all = cleanAll;
exports.dist = cleanDist;
exports.docs = cleanDocs;
exports.test = cleanTest;
exports.testE2E = cleanTestE2E;
exports.testManual = cleanTestManual;
exports.testUnit = cleanTestUnit;

////////////////////

cleanAll.displayName = `clean`;
gulp.task(cleanAll);
function cleanAll(done) {
    gulp.parallel(
        cleanDocs,
        cleanDist,
        cleanTest
    )(done);
}

cleanDist.displayName = `clean:dist`;
gulp.task(cleanDist);
function cleanDist() {
    return del(paths.clean.dist);
}

cleanDocs.displayName = `clean:docs`;
gulp.task(cleanDocs);
function cleanDocs() {
    return del(paths.clean.docs);
}

cleanTest.displayName = `clean:test`;
gulp.task(cleanTest);
function cleanTest() {
    return del(paths.clean.test);
}

cleanTestE2E.displayName = `clean:test:e2e`;
gulp.task(cleanTestE2E);
function cleanTestE2E() {
    return del(paths.clean.testE2E);
}

cleanTestManual.displayName = `clean:test:manual`;
gulp.task(cleanTestManual);
function cleanTestManual() {
    return del(paths.clean.testManual);
}

cleanTestUnit.displayName = `clean:test:unit`;
gulp.task(cleanTestUnit);
function cleanTestUnit() {
    return del(paths.clean.testUnit);
}
