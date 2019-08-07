const fs = require('fs');
const _ = require('./../src/lib/util');
const compiler = require('vue-template-compiler');
const Stringify = require('../src/index');

const source = fs.readFileSync('./tpl/multiple-styles.vue', 'utf8');
const descriptor = compiler.parseComponent(source) || {};
const oriDescriptor = _.cloneDeep(descriptor);

descriptor.styles.forEach((item) => {
    if(!item.attrs) {
        item.attrs = {};
    }

    item.attrs.lang = 'less';
});

const result = Stringify(descriptor, oriDescriptor);

fs.writeFile('./tpl/multiple-styles_new.vue', result, (err) => {
    console.log(err);
});