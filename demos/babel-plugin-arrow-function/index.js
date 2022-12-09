const parser = require('@babel/core');
const fs = require('fs');
const path = require('path');
const arrowFunctionPlugin = require('./arrow-function-plugin');


let sourceCode = fs.readFileSync(path.join(__dirname, './code.js'), {
    encoding: 'utf-8'
});

let { code } = parser.transform(sourceCode, {
    plugins: [ arrowFunctionPlugin ]
});

console.log(code);
