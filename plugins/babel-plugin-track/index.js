const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const { transformFromAstSync, transform } = require('@babel/core');
const autoInsertTrackPlugin = require('./auto-insert-track-plugin');
const testPlugin = require('./test-plugin');

const sourceCode = fs.readFileSync(path.join(__dirname, './code.js'), {
    encoding: 'utf-8'
});

const AST = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

const { code } = transformFromAstSync(AST, sourceCode, {
    // plugins: [[autoInsertTrackPlugin, {
    //     name: 'tracker'
    // }], [testPlugin]]
    plugins: [[testPlugin]]
});
console.log(code);