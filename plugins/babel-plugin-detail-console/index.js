const { transform } = require('@babel/core');
const fs = require('fs');
const path = require('path');
const detailConsolePlugin = require('./detail-console-plugin');
const noConsolePlugin = require('./no-console-plugin');


const sourceCode = fs.readFileSync(path.resolve(__dirname, './code.js'), {
    encoding: 'utf-8'
});


const { code } = transform(sourceCode, {
    plugins: [ detailConsolePlugin, noConsolePlugin ],
    filename: 'code.js'
});

console.log(code);