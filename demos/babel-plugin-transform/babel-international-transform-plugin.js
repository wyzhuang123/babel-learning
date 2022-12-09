const { declare } = require('@babel/helper-plugin-utils');
const fs = require('fs');
const path = require('path');


// 国际化插件
const interNationalTransformPlugin = declare((api, options) => {
    let imported = false;

    let transformKey = 0;

    let transformLanguagePackage = {};

    function getKey() {
        return 'transform' + transformKey++;
    }

    function save(file, key, value) {
        const allText = file.get('allText');
        allText.push({
            key,
            value
        });
        file.set('allText', allText);
    }

    function replaceAST(path, state) {
        let key = getKey();
        let AST = api.template.ast(`tranform('${key}')`);
        save(state.file, key, path.node.value);
        path.replaceWith(AST);
        path.skip();
    }

    return {
        visitor: {
            ImportDeclaration(path) {
                const source = path.node.source.value;
                if(source === 'transform') {
                    imported = true;
                }
            },

            Program: {
                enter(path) {
                    path.traverse({
                        ImportDeclaration(p) {
                            const source = p.node.source.value;
                            // console.log(source);
                            if(source === './transform.js') {
                                imported = true;
                            }
                        },
                    });
                    if(!imported) {
                        const uid = path.scope.generateUid('transform')
                        const importAST = api.template.ast(`import ${uid} from './transform.js'`);
                        path.node.body.unshift(importAST);
                    }
                }
            },

            StringLiteral(path, state) {
                if(path.node.value !== './transform.js') {
                    replaceAST(path, state);
                }
            },

            TemplateLiteral(path, state) {
                const value = path.get('quasis').map(item => item.node.value.raw).join('{placeholder}');
                if(value) {
                    replaceAST(path, state);
                }
            }
        },

        pre(file) {
            file.set('allText', []);
        },

        post(file) {
            const allText = file.get('allText');
            const res = {};
            allText.forEach((item) => {
                res[item.key] = item.value;
            })
            const content = `const obj = ${JSON.stringify(res)};\nmodule.exports = obj;`;
            fs.writeFileSync(path.join(options.outputPath, 'language_package.js'), content);
        }
    }
});

module.exports = interNationalTransformPlugin;