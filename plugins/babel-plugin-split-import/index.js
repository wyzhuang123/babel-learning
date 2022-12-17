const { transform } = require('@babel/core');
const splitImportPlugin = require('./split-import-plugin');
const fs = require('fs');
const path = require('path');


const { code } = transform(`
    import path from 'path';
    import { a } from './aaa.js';
    import utils from '@/utils/request';
    import utils1 from '@/ss/request';
    import utils2 from 'src/request';
    import utils3 from '../utils/request';
    import utils4 from './file/utils/request';
`, {
    plugins: [ splitImportPlugin ]
});

console.log(code);