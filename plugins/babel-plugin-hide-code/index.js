const parser = require('@babel/parser');
const path = require('path');
const fs = require('fs');
const { transformFromAstSync } = require('@babel/core');
const hideCodePlugin = require('./hide-code-plugin');

const sourceCode = fs.readFileSync(path.join(__dirname, './code.js'), {
    encoding: 'utf-8'
});

const AST = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

const { code } = transformFromAstSync(AST, sourceCode, {
    plugins: [[ hideCodePlugin, {
        outputPath: path.join(__dirname, './file')
    }]]
});

console.log(code);