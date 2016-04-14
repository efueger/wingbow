const paths = require(`./build/config/paths`);

exports.config = {
    allScriptsTimeout: 30000,
    baseUrl: `http://localhost:3333`,
    cucumberOpts: {
        format: `progress`,
        require: [
            `${paths.tmp.protractor}/test/e2e/world.js`,
            `${paths.tmp.protractor}/test/e2e/steps/**/*.step.js`,
        ],
    },
    framework: `custom`,
    frameworkPath: require.resolve(`protractor-cucumber-framework`),
    getPageTimeout: 30000,
    multiCapabilities: [
        {
            browserName: `phantomjs`,
            'phantomjs.binary.path': `node_modules/.bin/phantomjs`,
        },
    ],
    specs: [
        `test/e2e/features/**/*.feature`,
    ],
};
