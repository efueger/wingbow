const isCI = require(`./isCI`);

module.exports = {
    errorHandler: !isCI,
};
