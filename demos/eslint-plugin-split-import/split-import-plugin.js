module.exports = {
    meta: {

    },

    create: function(context) {
        const paths = [];
        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const valueMap = {
                    '@': 1,
                    './': 2,
                    '../': 3,
                };

                const mapType = value.match(valueMap[value]) ? valueMap[value] : 0;
                if(!paths[mapType]?.length) {
                    paths[mapType] = [node];
                } else {
                    paths[mapType].push(node);
                }
            }
        }
    },

    exit: function() {

    }
}