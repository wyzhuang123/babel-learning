const { declare } = require('@babel/helper-plugin-utils');

const noConsolePlugin = declare((api) => {
    let map = new Map();  // line - disabled
    return {
        visitor: {
            Program: {
                enter(path) {
                    path.node.body.forEach((item) => {
                        const comment = item.leadingComments;
                        if(comment?.length) {
                            comment.forEach((Item) => {
                                const len = (Item.value.match('eslint-console-disabled') || Item.value.match('eslint-disabled'))?.length;
                                if(len) {
                                    map.set(item.loc.start.line, true);
                                }
                            });
                        }
                    });
                }
            },    
            CallExpression(path) {
                let callType = '';
                path.traverse({
                    MemberExpression(p) {
                        if(p.node.object) callType = p.node.object.name;
                    }
                });
                let insideComment = path.findParent(() => {
                    return true;
                }).node.leadingComments;
                insideComment = insideComment?.length && insideComment[0];
                const isInsideQuit = (insideComment?.value.match('eslint-console-disabled') || insideComment?.value.match('eslint-disabled'))?.length !== 0;
                // 删除console
                const isQuit = map.get(path.node.loc.start.line); // 判断是否有eslint
                if(callType === 'console' && !isQuit && !isInsideQuit) path.remove();
            },
        }
    }
});


module.exports = noConsolePlugin;