# vue-sfc-descriptor-stringify

> Translate Vue SFC descriptor to String.
> 将 vue-sfc 描述 转为 字符串。

## Scene

需要操作 `vue` 文件，进行 `属性` 或者 `内容` 的更改，类似 `babel`。

## Usage

### Install

```bash
# install
$ npm i vue-sfc-descriptor-stringify -D
```

### Call

```js
const Stringify = require('vue-sfc-descriptor-stringify');

/**
 * @name    Stringify
 * @param
 *  sfcDescriptor       需要转换成 string 的 sfc
 *  originSfcDescriptor 原始 sfc，如果没有对 sfcDescriptor 处理的话，跟 sfcDescriptor 是一样的
 *  options             配置
 *      indents         缩进
 *          template:   2 // 默认
 *          script:     0 // 默认
 *          style:      0 // 默认
 * @returns String      转换之后的 vue-sfc 内容
 */
const str = Stringify(sfcDescriptor, originSfcDescriptor, options);
```
