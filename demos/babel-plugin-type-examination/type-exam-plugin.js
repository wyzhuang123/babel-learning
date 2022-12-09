const { declare } = require('@babel/helper-plugin-utils');
const { codeFrameColumns } = require('@babel/code-frame');


const typeExamPlugin = declare((api, template, options) => {
    const store = new Map();
    function parseAnnotation(type) {
        if(!type) return;
        switch(type) {
            case 'TSStringKeyword':
                return 'string'

            case 'StringLiteral':
                return 'string'
            
            case 'TSNumberKeyword':
                return 'number'
            
            case 'NumericLiteral':
                return 'number'

            default: 
                return 'any'
        }
    }


    return {
        pre(file) {
            file.set('error', []);
        },

        visitor: {
            VariableDeclaration(path, state) {
                path.traverse({
                    Identifier(p) {
                        store.set(p.node.name, parseAnnotation(p.getTypeAnnotation().type));
                    }
                })
            },

            AssignmentExpression(path, state) {
                const name = path.get('left').node.name;
                const right = path.get('right');
                const code = right.hub.getCode();
                const value = right.node;
                if(store.get(name) === parseAnnotation(value.type)) {
                    // console.log('没问题');
                } else {
                    // const result = codeFrameColumns(code, value.loc, {
                    //     highlightCode: true,
                    //     forceColor: true,
                    //     message: 'type error'
                    // });
                    // console.error(result);
                    const tmp = Error.stackTraceLimit;
                    Error.stackTraceLimit = 0;
                    console.log(right.buildCodeFrameError(`类型错误`));
                    Error.stackTraceLimit = tmp;
                }
            },

            FunctionDeclaration(path, state) {

            },

            CallExpression(path, state) {
                let paramsType = path.node.typeParameters.params.map((item) => {
                    return parseAnnotation(item.type);
                });
                if(paramsType.length < 2) paramsType = paramsType[0];

                const callType = path.node.arguments.map((item) => {
                    return parseAnnotation(item.type);
                });
                // console.log(callType);

                const calleeName = path.get('callee');

                const functionPath = path.scope.getBinding(calleeName).path;

                const declareParamsType = functionPath.get('params').map((item, index) => {
                    return paramsType;
                });

                callType.forEach((item, index) => {
                    if(declareParamsType[index] !== item) {
                        // 追踪错误输出的行数，设为0看起来美观一点
                        const tmp = Error.stackTraceLimit;
                        Error.stackTraceLimit = 0;
                        console.log(path.buildCodeFrameError(`调用函数时传参错误`));
                        Error.stackTraceLimit = tmp;
                    }
                })
            }
        },
    }
});


module.exports = typeExamPlugin;