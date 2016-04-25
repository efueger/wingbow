const gulp = require(`gulp`);
const $ = require(`gulp-load-plugins`)();
const webdriver = $.protractor.webdriver_update;

exports.all = webdriverAll;
exports.update = webdriverUpdate;

////////////////////

webdriverAll.displayName = `webdriver`;
gulp.task(webdriverAll);
function webdriverAll(done) {
    gulp.series(
        webdriverUpdate
    )(done);
}

webdriverUpdate.displayName = `webdriver:update`;
gulp.task(webdriverUpdate);
function webdriverUpdate(done) {
    webdriver({}, done);
}
