const fs = require('fs');
const path = require('path');

module.exports = exports = function logger(filepath) {

    return function(...args) {
        fs.writeFileSync(path.join(__dirname, filepath), '\n' + args.map(arg => '\n' + arg));   
    };

};
