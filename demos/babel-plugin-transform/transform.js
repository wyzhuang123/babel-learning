const languagePackage = require('./language_package');

const transform = function(key, ...args) {
    let index = 0;
    return languagePackage[key].replace(/\{location\}/, () => args[index++]);
}

module.exports = transform;