Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = () => {};

if (typeof __karma__.error !== `function`) {
    __karma__.error = err => {
        throw err;
    };
}

const paths = {
    tmp: {
        karma: `.karma`,
    },
};

System.config({
    map: {
        src: `/base/${paths.tmp.karma}/src`,
    },
    packages: {
        [`/base/${paths.tmp.karma}/src`]: {
            defaultExtensions: true,
        },
    },
});

Promise.resolve()
.then(() => {
    return Promise.all(Object.keys(window.__karma__.files)
    .filter(path => /.spec\.js$/.test(path))
    .map(path => System.import(path)));
})
.then(() => {
    __karma__.start();
})
.catch(err => {
    __karma__.error(err.stack || err);
});
