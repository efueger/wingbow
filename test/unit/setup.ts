Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {};

if (typeof __karma__.error !== 'function') {
    __karma__.error = function (err) {
        throw err;
    };
}

System.config({
    defaultExtensions: true,
    map: {
        src: '/base/.karma/src'
    },
    packages: {
        '/base/.karma/src': {
            format: 'register'
        }
    }
});

Promise.resolve()
.then(function () {
    var imports = Object.keys(window.__karma__.files)
    .filter(function (path) {
        return /.spec\.js$/.test(path);
    })
    .map(function (path) {
        return System.import(path);
    });
    return Promise.all(imports);
})
.then(function () {
    __karma__.start();
})
.catch(function (err) {
    __karma__.error(err.stack || err);
});
