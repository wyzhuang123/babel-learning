const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const { transformFromAstSync } = require('@babel/core');
const transformPlugin = require('./babel-international-transform-plugin');

const sourceCode = fs.readFileSync(path.join(__dirname, './code.js'), {
    encoding: 'utf-8'
});

const AST = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

const { code } = transformFromAstSync(AST, sourceCode, {
    plugins: [[transformPlugin, {
        outputPath: path.resolve(__dirname, './')
    }]]
});

// console.log(code