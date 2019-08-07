const _ = {
    typeOf(o) {
        return o == null ? String(o) : ({}).toString.call(o).slice(8, -1).toLowerCase();
    },
    get(obj = {}, path = '', {
        defaVal
    } = {
        defaVal: ''
    }) {
        let _res = (Array.isArray(path) ?
            path :
            path.replace(/\[/g, '.').replace(/'|"|\]/g, '').split('.'))
            .reduce((total, curVal) => (total || {})[curVal], obj);

        return _.typeOf(_res) === 'undefined' ? defaVal : _res;
    },
    cloneDeep(obj) {
        var cloneObj = function (obj) {
            var result = {},
                item, type;
            for (var i in obj) {
                item = obj[i];
                type = _.typeOf(item);
                if (type === 'object') {
                    result[i] = cloneObj(item);
                } else if (type === 'array') {
                    result[i] = cloneArray(item);
                } else {
                    result[i] = item;
                }
            }
            return result;
        };
        var cloneArray = function (obj) {
            var result = [],
                item, type;
            for (var i = 0; i < obj.length; i++) {
                item = obj[i];
                type = _.typeOf(item);
                if (type === 'object') {
                    result[i] = cloneObj(item);
                } else if (type === 'array') {
                    result[i] = cloneArray(item);
                } else if (typeof item !== 'object') {
                    result[i] = item;
                }
            }
            return result;
        };
        var type = _.typeOf(obj);
        switch (type) {

        case 'object':
            return cloneObj(obj);
        case 'array':
            return cloneArray(obj);
        default:
            return obj;
        }
    }
};

module.exports = _;