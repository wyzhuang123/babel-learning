const { declare } = require('@babel/helper-plugin-utils');
const types = require('babel-types');

const splitImportPlugin = declare((api) => {
    api.assertVersion(7);

    const valueMap = [
        '@',
        './',
        '../',
    ];

    let parent;

    return {
        pre(file) {
            file.set('imports', []);
        },

        visitor: {
            ImportDeclaration(path, state) {
                const value = path.node.source.value;
                const paths = state.file.get('imports');
                let mapType = 3;
                valueMap.forEach((item, index) => {
                    if(value.indexOf(item) !== -1) {
                        mapType = index;
                    }
                })
                if(!paths[mapType]) {
                    paths[mapType] = [path.node];
                } else {
                    paths[mapType].push(path.node);
                }
                path.remove();
                parent = path.findParent(() => true);
                state.file.set('imports', paths);
            }
        },
        post(file) {
            const paths = file.get('imports').filter((item) => {
                return item && item.length;
            }).flat();
            
            paths.forEach((item) => {
                parent.node.body.push(types.identifier('\n'));
                parent.node.body.push(item);
            });
        }
    }
});

module.exports = splitImportPlugin;