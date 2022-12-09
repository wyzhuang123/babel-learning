const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const { transformFromAstSync } = require('@babel/core');
const apiDocsPlugin = require('./api-docs-plugin');

const sourceCode = fs.readFileSync(path.join(__dirname, './code.ts'),{
    encoding: 'utf-8'
});

const AST = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['typescript']
});

const { code } = transformFromAstSync(AST, sourceCode, {
    plugins: [[ apiDocsPlugin, {
        outputDir: path.resolve(__dirname, './docs'),
        format: 'markdown'
    }]]
});
