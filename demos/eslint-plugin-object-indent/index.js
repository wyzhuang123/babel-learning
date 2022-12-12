const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, './code.js'), {
    encoding: 'utf-8'
});

console.log(code);

const engine = new ESLint({
    fix: false,
    overrideConfig: {
        parser: '@babel/eslint-parser',
        parserOptions: {
            sourceType: 'unambiguous',
            requireConfigFile: false,
        },
        rules: {
            'object-indent-plugin': 'error'
        }
    },
    rulePaths: ['./'],
    useEslintrc: false
});


(async function main() {
    const results = await engine.lintText(code);
    const formatter = await engine.loadFormatter("stylish");
    const resultText = formatter.format(results);
    // console.log(results);
    console.log(resultText);
})()
