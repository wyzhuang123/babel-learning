const { ESLint } = require('eslint');
// const path = require('path');
// const fs = require('fs');

// const code = fs.readFileSync(path.join(__dirname, './code.js'), {
//     encoding: 'utf-8'
// });

// const code = `
// import path from 'path';

// import { a } from './aaa.js';

// import utils from '@/utils/request';
// `;
const engine = new ESLint({
    overrideConfig: {
        parser: '@babel/eslint-parser',
        parserOptions: {
            sourceType: 'unambiguous',
            requireConfigFile: false,
        },
        rules: {
            'split-import-plugin': 'error'
        },
    },
    rulePaths: ['./'],
    useEslintrc: false
});

(
    async function init() {
        const results = await engine.lintText(`
            import path from 'path';
            import { a } from './aaa.js';
            import utils from '@/utils/request';
            import utils from '@/ss/request';
            import utils from 'src/request';
            import utils from '../utils/request';
            import utils from './file/utils/request';
        `);
        // console.log(results); 
    }
)()