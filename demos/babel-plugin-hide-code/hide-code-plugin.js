const { declare } = require('@babel/helper-plugin-utils');

const hideCodePlugin = declare((api, options, dirname) => {
    api.assertVersion(7);

    const parseName = (function() {
        const maps = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_';

        return function(num) {
            let str = '';
            while(num > 0) {
                str = maps[num % 54] + str;
                num = Math.floor(num / 54);
            }

            return str;
        }
    })()

    return {
        pre(file) {
            file.set('id', 0);
        },

        visitor: {
            Scopable(path, state) {
                let uid = state.file.get('id');

                Object.entries(path.scope.bindings).forEach(([key, bind]) => {
                    const newName = path.scope.generateUid(parseName(uid++));
                    bind.path.scope.rename(key, newName);
                });
            }
        }
    }
});

module.exports = hideCodePlugin;