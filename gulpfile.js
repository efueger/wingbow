const gulp = require(`gulp`);

const requireDir = require(`require-dir`);
const tasks = requireDir(`./build/tasks`);

gulp.task(`default`, gulp.series(
    tasks.clean.all,
    tasks.test.unit,
    gulp.parallel(
        tasks.build.all,
        tasks.doc.all,
        tasks.lint.all
    )
));
