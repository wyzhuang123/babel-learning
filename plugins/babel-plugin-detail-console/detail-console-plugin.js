const { declare } = require('@babel/helper-plugin-utils');
const types = require('@babel/types');
const paths = require('path');

const detailConsolePlugin = declare((api, options, dirname) => {
    return {
        visitor: {
            CallExpression(path, state) {
                const isConsole = path.node.callee && types.isMemberExpression(path.node.callee) && path.node.call?.object.name === 'console';
                if(isConsole) {
                    const { start } = path.node.callee.loc;
                    let filename = state.file.get('name');
                    if(!filename) {
                        filename = paths.relative(__dirname, state.file.opts.filename);
                        state.file.set('name', filename);
                    }
                    path.node.arguments.push(types.stringLiteral(`console at line ${start.line} in file ${filename}`));
                }
            }
        }
    }
});

module.exports = detailConsolePlugin;