const path = require(`path`);
const merge = require(`merge2`);
const gulp = require(`gulp`);
const $ = require(`gulp-load-plugins`)();
const tsc = require(`typescript`);

const plumb = require(`./plumb`);

const paths = require(`../config/paths`);

module.exports = function compile(filesRoot, filesDest, filesGlob, options) {
    const config = Object.assign({
        typescript: tsc,
    }, options);
    const tsProject = $.typescript.createProject(`tsconfig.json`, config);
    const result = gulp.src([...filesGlob, ...paths.typings.all])
        .pipe($.plumber(plumb))
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject));
    const js = result.js
        .pipe($.sourcemaps.write(`./`, {
            sourceRoot: path.join(__dirname, `..`, `..`, paths.compile.src),
        }));
    const dts = result.dts;
    return merge(js, dts)
        .pipe(gulp.dest(filesDest))
        .pipe($.connect.reload());
};
