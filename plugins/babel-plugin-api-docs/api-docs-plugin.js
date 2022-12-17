const {　declare } = require('@babel/helper-plugin-utils');
const doctrine = require('doctrine');
const fse = require('fs-extra');
const path = require('path');
const operate = require('./operate');

const apiDocsPlugin = declare((api, options, dirname) => {

    // TSStringKeyword
    // TSNumberKeyword
    // TSBooleanKeyword
    function getType(type) {
        if(!type) return '';
        switch(type) {
            case 'TSStringKeyword':
                return 'String';

            case 'TSNumberKeyword':
                return 'Number';

            case 'TSBooleanKeyword':
                return 'Boolean';

            default:
                return 'any';
        }
    }

    // 解析注释
    function parseComment(str) {
        if(!str) {
            return;
        }

        return doctrine.parse(str, { unwrap: true});
    }

    return {
        pre(file) {
            file.set('docs', []);
        },
        visitor: {
            FunctionDeclaration(path, state) {
                const docs = state.file.get('docs');
                const dci = { name: path.get('id').toString(), params: []};
                dci.params = 
                    path.get('params').map((item) => {
                        return {
                            name: item.toString(),
                            type: getType(item.getTypeAnnotation().type)
                        }
                    });
                dci.return = getType(path.get('returnType').getTypeAnnotation());
                dci.docs = parseComment(path.node.leadingComments && path.node.leadingComments[0].value);
                dci.type = 'Function';
                docs.push(dci);
                state.file.set('docs', docs);
            },

            ClassDeclaration(path, state) {
                const docs = state.file.get('docs');
                const dci = { 
                    name: path.get('id').toString(),
                    type: 'Class',
                    property: [],
                    methods: []
                };
                dci.docs = parseComment(path.node.leadingComments[0].value);
                path.traverse({
                    ClassProperty(path) {
                        dci.property.push({
                            name: path.get('key').node.name,
                            type: getType(path.getTypeAnnotation().type)
                        })
                    },

                    ClassMethod(path) {
                        if(path.get('key').node.name !== 'constructor') {
                            const newDci = {
                                name: path.get('key').node.name,
                                return: getType(path.get('returnType').getTypeAnnotation()),
                                params: [],
                                docs: ''
                            };
                            newDci.docs = parseComment(path.node.leadingComments[0].value);
                            newDci.params = path.get('params').map((item) => {
                                return {
                                    name: item.toString(),
                                    type: getType(item.getTypeAnnotation().type)
                                }
                            })
                            console.log(newDci);
                            dci.methods.push(newDci);
                        }
                    }
                });
                docs.push(dci);
                state.file.set('docs', docs);
            }
        },

        post(file) {
            const docs = file.get('docs');
            // console.log(docs);
            fse.ensureDirSync(options.outputDir);
            fse.writeFileSync(path.join(options.outputDir, 'docs.md'), operate(docs));
        }
    }
});

module.exports = apiDocsPlugin;