const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const { transformFromAstSync } = require('@babel/core');
const typeExamPlugin = require('./type-exam-plugin');

const sourceCode = fs.readFileSync(path.join(__dirname, './code.ts'), {
    encoding: 'utf-8'
});


const AST = parser.parse(sourceCode, {
    plugins: ['typescript']
});

const { code } = transformFromAstSync(AST, sourceCode, {
    plugins: [[typeExamPlugin]]
});
