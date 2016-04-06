const path = require(`path`);
const merge = require(`merge2`);
const gulp = require(`gulp`);
const $ = require(`gulp-load-plugins`)();
const tsc = require(`typescript`);

const plumb = require(`./plumb`);

const paths = require(`../config/paths`);

module.exports = function compile(filesRoot, filesDest, filesGlob, options) {
    const title = filesRoot.replace(`/`, `:`);
    const config = Object.assign({
        declaration: true,
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
        }))
        .pipe($.size({
            title: `${title}/*.ts`,
        }))
        .pipe(gulp.dest(filesDest))
        .pipe($.connect.reload());
    const dts = result.dts
        .pipe($.size({
            title: `${title}/*.d.ts`,
        }))
        .pipe(gulp.dest(filesDest));
    return merge(js, dts);
};
