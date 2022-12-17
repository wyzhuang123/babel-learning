function parseFunction(obj) {
    let str = '';
    if(obj.params.length) {
        str += '\n';
        str += '###' + obj.name;
        str += '\n';
        str += '|' + 'name' + '|' + 'type';
        str += '\n';
        str += '| --- | --- |';
        str += '\n';
        obj.params.forEach((pItem) => {
            str += '|' + pItem.name + '|' + pItem.type + '|';
            str += '\n';
        });
    };
    str += '返回值类型' + obj.return + '\n';
    return str;
}


module.exports = function(docs) {
    let res = '';
    docs.forEach((item) => {
        if(item.type === 'Function') {
            res += parseFunction(item);
        } else {
            res += '\n';
            res += '### 类' + item.name + '\n';
            res += '#### 类方法' + '\n';
            item.methods.forEach((method) => {
                res += parseFunction(method);
            });
            res += '#### 类变量' + '\n';
            res += '|' + 'name' + '|' + 'type';
            res += '\n';
            res += '| --- | --- |';
            res += '\n';
            item.property.forEach((pItem) => {
                res += '|' + pItem.name + '|' + pItem.type + '|';
                res += '\n';
            });
        }
    });

    return res;
}


