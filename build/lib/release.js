const fs = require(`fs`);
const path = require(`path`);
const merge = require(`merge2`);
const gulp = require(`gulp`);
const $ = require(`gulp-load-plugins`)();
const tsc = require(`typescript`);

const getSha = require(`./get-sha`);

const pkg = require(`../../package.json`);

const paths = require(`../config/paths`);

const header = fs.readFileSync(`build/includes/header.ejs`);
const footer = fs.readFileSync(`build/includes/footer.ejs`);

const filterGzip = $.filter([`**/*`, `!**/*.map`], {restore: true});
const filterMaps = $.filter([`**/*`, `!**/*.map`], {restore: true});
const removeMaps = $.filter([`**/*`, `!**/*.map`]);
const sourceRoot = path.join(__dirname, `..`, `..`, paths.release.src);

module.exports = release;

////////////////////

function release(filesRoot, filesDest, filesGlob, options) {
    return getSha().then(sha => {
        const stamp = {
            pkg,
            sha,
        };
        const nameTs = path.basename(filesRoot);
        const nameNoExt = nameTs.replace(/\.ts$/, ``);
        const config = Object.assign({
            declaration: true,
            typescript: tsc,
        }, options);
        const tsProject = $.typescript.createProject(`tsconfig.json`, config);
        const result = gulp.src([...filesGlob, ...paths.typings.all])
            .pipe($.sourcemaps.init())
            .pipe($.typescript(tsProject));
        const js = result.js
            .pipe($.stripDebug())
            .pipe($.amdcleaner({
                escodegen: {
                    format: {
                        indent: {
                            style: `    `,
                        },
                    },
                },
                optimize: `none`,
                prefixMode: `camelCase`,
            }))
            .pipe($.header(header, stamp))
            .pipe($.footer(footer, stamp))
            .pipe($.size({
                showFiles: true,
            }))
            .pipe($.sourcemaps.write(`./`, {
                sourceRoot,
            }))
            .pipe(gulp.dest(filesDest))
            .pipe(filterMaps)
            .pipe($.uglify())
            .pipe(filterMaps.restore)
            .pipe($.rename(obj => {
                /* eslint no-param-reassign: ["off"] */
                obj.basename = obj.basename.replace(
                    nameNoExt,
                    `${nameNoExt}.min`
                );
            }))
            .pipe(removeMaps)
            .pipe($.sourcemaps.write(`./`, {
                sourceRoot,
            }))
            .pipe(filterGzip)
            .pipe(gulp.dest(filesDest))
            .pipe($.size({
                showFiles: true,
            }))
            .pipe($.gzip())
            .pipe($.size({
                showFiles: true,
            }))
            .pipe(filterGzip.restore);
        const dts = result.dts
            .pipe($.size({
                showFiles: true,
            }));
        return merge(js, dts)
        .pipe(gulp.dest(filesDest));
    });
}
