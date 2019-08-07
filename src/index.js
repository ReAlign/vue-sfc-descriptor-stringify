/**
 * @name    vue-sfc-descriptor-stringify
 * @author  ReAlign
 * @date    2019-08-07
 */
const _ = require('./lib/util');
const indentString = require('indent-string');

const Stringify = {};

/**
 * @name    获取起始标签
 * @param   block   模块
 */
Stringify._getOpenTag = (block = {}) => {
    const {
        type = '',
        attrs = {},
    } = block;

    // 属性字符串
    let _attrsKVStr = Object.keys(attrs)
        // template -> script -> style
        .sort()
        // 填充：k=v
        .map(name => {
            const value = attrs[name];

            return value === true ? name : `${name}="${value}"`;
        })
        // join by ' '
        .join(' ');
    _attrsKVStr = _attrsKVStr.length ? ` ${_attrsKVStr}` : _attrsKVStr;

    return `<${type}${_attrsKVStr}>`;
};

/**
 * @name    获取结束标签
 * @param   block   模块
 */
Stringify._getCloseTag = (block = {}) => {
    const {
        type = '',
    } = block;

    return `</${type}>\n`;
};

/**
 * @name    根据类型查找配置
 * @param
 *  type            类型
 *  sfcWithConfig   数据源
 *  opts            配置数据
 *      index       ${type} 的索引
 */
Stringify._$findConfigByType = (type = '', sfcWithConfig = {}, opts = {}) => {
    const {
        index = 0,
    } = opts;
    const typesIndex = {};
    let _conf = null;

    sfcWithConfig.some(item => {
        if(typesIndex[item.type] === undefined) {
            typesIndex[item.type] = -1;
        }
        typesIndex[item.type]++;
        //            同类型              && 同下标
        const _flag = item.type === type && index === typesIndex[item.type];
        if(_flag) {
            _conf = item.__data__;
        }

        return _flag;
    });
    // console.log(type, _conf);

    return _conf;
};

/**
 * @name    获取缩进配置
 * @param   options     全局配置
 */
Stringify._$getIndents = (options = {}) => {
    const {
        indents = {},
    } = options;

    return Object.assign({
        template: 2,
        script: 0,
        style: 0
    }, indents);
};


/**
 * @name    SFC 基础解析
 * @param   sfc     sfc对象
 * @returns blockList
 */
Stringify._$baseParse = (sfc = {} /*, options = {} */) => {
    const {
        template,
        script,
        styles,
        customBlocks,
    } = sfc;

    const blocks = [
        template,
        script,
        ...styles,
        ...customBlocks,
    ];

    return blocks
        // 过滤掉不存在的部分
        .filter(block => block !== null)
        // 根据原文件的位置排序
        .sort((a, b) => a.start - b.start)
        // 算出准确的源位置的块
        .map((block = {}) => {
            const openTag = Stringify._getOpenTag(block);
            const closeTag = Stringify._getCloseTag(block);

            return Object.assign({}, block, {
                openTag,
                closeTag,

                startOfOpenTag: Math.max(block.start - openTag.length, 0),
                endOfOpenTag: block.start,

                startOfCloseTag: block.end,
                endOfCloseTag: block.end + closeTag.length
            });
        });
};

/**
 * @name    sfc转字符串
 * @param   sfcDescriptor   sfc 对象
 * @param   options         全局配置
 * @param   sfcWithConfig   sfc 带有处理之后的配置项
 */
Stringify._$toStr = (sfcDescriptor = {}, options = {}, sfcWithConfig = {}) => {
    const newIndents = Stringify._$getIndents(options);
    const _sfcBlocks = Stringify._$baseParse(sfcDescriptor, options);

    // 生成 sfc
    return _sfcBlocks.reduce((sfcCode, block) => {
        const cusData = Stringify._$findConfigByType(block.type, sfcWithConfig);
        const emptyLines = _.get(cusData, 'emptyLinesBefore', 0);
        const indent = _.get(newIndents, `${block.type}`, 0);

        return [
            sfcCode,
            '\n'.repeat(emptyLines),
            block.openTag,
            indentString(block.content, indent),
            block.closeTag
        ].join('');
    }, '');
};

/**
 * @name    给原始sfc添加属性
 */
Stringify._$appendConfigOriginSFC = (originSfcDescriptor = {}, options = {}) => {
    const ori = Stringify._$baseParse(originSfcDescriptor, options);

    ori.forEach((block, index, array) => {
        block.__data__ = {};

        // 获取模块之前的空行
        const _getEmptyLinesBeforeBlock = (block, index, array) => {
            return index === 0
                ? block.startOfOpenTag
                : block.startOfOpenTag - array[index - 1].endOfCloseTag;
        };
        block.__data__.emptyLinesBefore = _getEmptyLinesBeforeBlock(block, index, array);
    });

    return ori;
};

/**
 * @name    VueSFC to String
 * @param
 *  sfcDescriptor       需要转换成string 的 sfc
 *  originSfcDescriptor 原始 sfc，如果没有对 sfc 处理的话，跟 sfcDescriptor 是一样的
 *  options             配置
 *      indents         缩进
 *          template:   2,
 *          script:     0,
 *          style:      0,
 */
Stringify.toString = (sfcDescriptor = {}, originSfcDescriptor = {}, options = {}) => {
    const sfcWithConfig = Stringify._$appendConfigOriginSFC(originSfcDescriptor, options);
    // console.log(sfcWithConfig);
    return Stringify._$toStr(sfcDescriptor, options, sfcWithConfig);
};

module.exports = Stringify.toString;