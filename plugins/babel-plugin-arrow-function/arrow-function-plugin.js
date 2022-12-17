const { declare } = require('@babel/helper-plugin-utils');
const types = require('@babel/types');

const arrowFunctionPlugin = declare((api, options, dirname) => {
    let thisPaths = [];
    return {
        pre(file) {
            file.set('map', new Map());
            file.set('count', 0);
        },

        visitor: {
            
            ArrowFunctionExpression(path, state) {
                path.node.type = 'FunctionExpression';
                const Body = path.node.body;
                if(!Body?.length) {
                    if(!types.isBlockStatement(Body)) {
                        path.node.body = types.blockStatement([types.returnStatement(path.node.body)]);
                    }
                }

                const Parent = path.findParent((parent) => {
                    return (parent.isFunction() && !path.isArrowFunctionExpression()) ||　parent.isProgram()
                });

                // const countMap = state.file.get('map');
                // const count = state.file.get('count');

                path.traverse({ 
                    ThisExpression(p) {
                        thisPaths.push(p);
                        Parent.scope.push({
                            id: types.identifier("_this"),
                            init: types.thisExpression()
                        });
                    }
                });

            }
        },

        post() {
            thisPaths.forEach((path) => {
                path.replaceWith(types.identifier('_this'));
            });
        }
    }
});

module.exports = arrowFunctionPlugin;