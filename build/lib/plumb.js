const isCI = require(`./is-ci`);

module.exports = {
    errorHandler: !isCI,
};
