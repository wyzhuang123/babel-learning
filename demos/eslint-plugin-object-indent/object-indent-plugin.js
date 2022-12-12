const os = require('os');

module.exports = {
    create(context) {

        return {
            ObjectExpression(node) {
                for(let i = 0; i < node.properties.length + 1; i++) {
                    if(node.properties[i]?.loc.start.line !== node.properties[i + 1]?.loc.start.line - 1) {
                        context.report({
                            node,
                            message: '对象属性之间不能有空行',
                            loc: node.properties[i]?.loc
                        })
                    }

                    if(node.properties[i]?.loc.start.column !== 4) {
                        context.report({
                            node,
                            message: '代码缩进应该是4格',
                            loc: node.properties[i]?.loc
                        })
                    }
                }
            }
        }
    }
}