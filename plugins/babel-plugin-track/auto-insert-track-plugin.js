// const { declare } = require('@babel/helper-plugin-utils');
const importModule = require('@babel/helper-module-imports');

const autoInsertTrackPlugin = (api, options, dirname) => {
    api.assertVersion(7);

    return {
        // Babel 采取递归的方式访问 AST 的每个节点
        visitor: {
            Identifier(path, state) {
                if(path.node.name === 'bb') {
                    path.node.name = '替换';
                }
            },
            Program: {
                enter (path, state) {
                    if (!state.trackerImportId) {
                        state.trackerImportId  = importModule.addDefault(path, 'tracker',{
                            nameHint: path.scope.generateUid('tracker')
                        }).name;
                        // state.consoleAST = api.template.statement('涉及版权问题请联系hzk13612359831')();
                        // state.trackerAST = api.template.statement(`${state.trackerImportId}()`)();
                    }
                }
            },
            'ClassMethod|FunctionExpression|FunctionDeclaration'(path, state) {
                const bodyPath = path.get('body');
                if (bodyPath.isBlockStatement()) {
                    bodyPath.node.body.unshift(state.trackerAST);
                    bodyPath.node.body.unshift(state.consoleAST);
                } else {
                    // const ast = api.template.statement(`{${state.trackerImportId}();return PREV_BODY;}`)({PREV_BODY: bodyPath.node});
                }
            }
        }
    }
}

module.exports = autoInsertTrackPlugin;