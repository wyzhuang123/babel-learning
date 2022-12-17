

const testPlugin = (api, options) => {
    return {
        visitor: {
            Program: {
                enter() {
                    console.log('enter');
                },
    
                exit() {
                    console.log('exit');
                }
            },

            /*
                specifiers表示import导入变量组成的数组，source表示导出模块的来源节点 
                specifiers 下的import是导出的变量名， local是导入的变量名 比如 import ddd as dddd from 'xxx.js'
            */
            ImportDeclaration(path, state) {
                // console.log(path.node);
                console.log(path.node.specifiers);
            },

            FunctionDeclaration(path) {
                const updateVisitor = {
                    Identifier(path) {
                        if(path.node.name === 'n') {
                            path.node.name = 'x';
                        }
                    }
                }
            }
        }
    }
}


module.exports = testPlugin;