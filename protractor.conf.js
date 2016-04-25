const chromeBinary = require(`chromedriver`).path;
const cucumberPath = require.resolve(`protractor-cucumber-framework`);
const phantomjsBinary = require(`phantomjs-prebuilt`).path;

const isCI = require(`./build/lib/is-ci`);
const paths = require(`./build/config/paths`);

const protractorConf = {
    allScriptsTimeout: 30000,
    cucumberOpts: {
        format: `progress`,
        require: [
            `${paths.tmp.protractor}/${paths.test.e2eWorld}`,
            `${paths.tmp.protractor}/${paths.test.e2eSteps}`,
        ],
    },
    framework: `custom`,
    frameworkPath: cucumberPath,
    getPageTimeout: 30000,
    multiCapabilities: [
        {
            browserName: `chrome`,
            chromeOptions: {
                args: [`show-fps-counter=true`],
            },
            'chrome.binary.path': chromeBinary,
        },
    ],
    specs: [
        `${paths.test.e2eFeatures}`,
    ],
};

if (isCI) {
    protractorConf.multiCapabilities = [
        {
            browserName: `phantomjs`,
            'phantomjs.binary.path': phantomjsBinary,
        },
    ];
}

exports.config = protractorConf;
