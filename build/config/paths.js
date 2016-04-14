const dirs = {
    build: `build`,
    buildConfig: `build/config`,
    buildLib: `build/lib`,
    buildTasks: `build/tasks`,
    coverage: `coverage`,
    dist: `dist`,
    docs: `docs`,
    karma: `.karma`,
    nodeModules: `node_modules`,
    protractor: `.protractor`,
    src: `src`,
    test: `test`,
    testE2E: `test/e2e`,
    testManual: `test/manual`,
    testManualDist: `test/manual/dist`,
    testManualModules: `test/manual/node_modules`,
    testUnit: `test/unit`,
    typings: `typings`,
};

const globs = {
    all: `**/*`,
    gz: `**/*.gz`,
    js: `**/*.js`,
    map: `**/*.map`,
    ts: `**/*.ts`,
};

const files = {
    eslintrc: `.eslintrc`,
    gulpfile: `gulpfile.js`,
    karmaConf: `karma.conf.js`,
    pkg: `package.json`,
    protractorConf: `protractor.conf.js`,
    travis: `.travis.yml`,
    tsconfig: `tsconfig.json`,
    tslint: `tslint.json`,
    typings: `typings.json`,
};

exports.clean = {
    coverage: [
        `${dirs.coverage}`,
    ],
    dist: [
        `${dirs.dist}/${globs.gz}`,
        `${dirs.dist}/${globs.js}`,
        `${dirs.dist}/${globs.map}`,
        `${dirs.dist}/${globs.ts}`,
    ],
    docs: [
        `${dirs.docs}`,
    ],
    testE2E: [
        `${dirs.protractor}`,
    ],
    testManual: [
        `${dirs.testManualDist}`,
        `${dirs.testManualModules}`,
    ],
    testUnit: [
        `${dirs.karma}`,
        `${dirs.coverage}`,
    ],
};

exports.clean.test = [
    ...exports.clean.testE2E,
    ...exports.clean.testManual,
    ...exports.clean.testUnit,
];

exports.compile = {
    src: `${dirs.src}`,
    testE2E: `${dirs.testE2E}`,
    testUnit: `${dirs.testUnit}`,
};

exports.copy = {
    dist: [
        `${dirs.dist}/${globs.all}`,
    ],
    modules: [
        `${dirs.nodeModules}/{es6-shim,es7-shim,moment}/${globs.all}`,
    ],
};

exports.coverage = {
    html: `${dirs.coverage}/html`,
    lcov: `${dirs.coverage}/lcov/lcov.info`,
    remapPre: `${dirs.coverage}/json/coverage-pre.json`,
    remapPost: `${dirs.coverage}/json/coverage-post.json`,
};

exports.dist = {
    docs: `${dirs.docs}`,
    make: `${dirs.dist}`,
    coverage: `${dirs.coverage}`,
    testManual: `${dirs.testManual}`,
    testManualDist: `${dirs.testManualDist}`,
    testManualModules: `${dirs.testManualModules}`,
    testUnit: `${dirs.testUnit}`,
};

exports.docs = {
    all: [
        `${dirs.src}/${globs.ts}`,
    ],
};

exports.lint = {
    js: [
        `${dirs.build}/${globs.js}`,
        `${dirs.testE2E}/${globs.js}`,
        `${dirs.testUnit}/${globs.js}`,
        `${files.gulpfile}`,
        `${files.karmaConf}`,
        `${files.protractorConf}`,
    ],
    json: [
        `${dirs.testE2E}/${files.eslintrc}`,
        `${dirs.testUnit}/${files.eslintrc}`,
        `${dirs.test}/${files.eslintrc}`,
        `${files.eslintrc}`,
        `${files.pkg}`,
        `${files.tsconfig}`,
        `${files.tslint}`,
        `${files.typings}`,
    ],
    ts: [
        `${dirs.src}/${globs.ts}`,
        `${dirs.testUnit}/${globs.ts}`,
    ],
    yml: [
        `${files.travis}`,
    ],
};

exports.make = {
    entry: `${dirs.src}/wingbow.ts`,
    exit: `${dirs.dist}`,
    file: `wingbow.js`,
};

exports.release = {
    src: `${dirs.src}`,
};

exports.tmp = {
    karma: `${dirs.karma}`,
    protractor: `${dirs.protractor}`,
};

exports.typings = {
    all: [
        `${dirs.typings}/main.d.ts`,
        `${dirs.buildConfig}/ext.d.ts`,
    ],
};

exports.verify = {
    js: [
        `${dirs.dist}/${globs.js}`,
    ],
};

exports.watch = {
    js: [
        `${dirs.build}/${globs.js}`,
        `${dirs.testE2E}/${globs.js}`,
        `${files.gulpfile}`,
        `${files.karmaConf}`,
    ],
    testManual: [
        `${dirs.testManual}/index.html`,
    ],
    ts: [
        `${dirs.src}/${globs.ts}`,
        `${dirs.testUnit}/${globs.ts}`,
    ],
};
