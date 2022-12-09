const { declare } = require('@babel/helper-plugin-utils');
const types = require('@babel/types');
const arrowFunctionPlugin = declare((api, options, dirname) => {
    return {
        visitor: {
            
            ArrowFunctionExpression(path, state) {
                path.node.type = 'FunctionExpression';
                const Body = path.get('body');
                if(!Body.node.body?.length) {
                    const returnAST = types.returnStatement(Body.node);
                    // console.log(path.node.body);
                    path.node.body.body = [returnAST];
                }
            }
        }
    }
});

module.exports = arrowFunctionPlugin;