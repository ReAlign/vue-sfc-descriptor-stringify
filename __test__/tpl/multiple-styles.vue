
<template>
    <div id="app">
        <el-menu
            router
            mode="horizontal"
            :default-active="activeIndex"
            :class="defaultClass">
            <el-menu-item index="/">
            物料堆页面
            <el-tooltip
                effect="light"
                placement="right-end">
                <div slot="content">
                    <p class="m-custom-tips">
                        1. 选择需要的区块，点击按钮添加到预览区<br>
                        2. 拖拽预览区的区块，进行排序<br>
                        3. 需要的区块添加完成，点击右上角进行其他信息编辑<br>
                        4. 完善路由、文件路径等信息<br>
                        5. 点击“开始创建”，完成后点击在编辑器中打开
                    </p>
                </div>
                <i class="el-icon-question"></i>
            </el-tooltip>
            </el-menu-item>
        </el-menu>
        <div class="g-body">
            <router-view></router-view>
        </div>
    </div>
</template>



<script>
    export default {
        name: 'app',
        data() {
            return {
                defaultClass: 'g-el-menu-fix-top',
                activeIndex: '/',
            };
        },
    }
</script>

<style lang="scss" type="text/less">
html,
body,
#app {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
#app {
    font-family: sans-serif, Helvetica, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
}
.el-menu.g-el-menu-fix-top {
    position: sticky;
    top: 0;
    z-index: 10;
}
.g-body {
    position: relative;
    height: calc(100% - 65px);
}
.m-custom-tips {
    margin: 0 4px;
    line-height: 20px;
}

$scrollbar-w: 8px;
$scrollbar-h: 8px;
$scrollbar-color: #aaa;
* {
    ::-webkit-scrollbar {
        width: $scrollbar-w;
        height: $scrollbar-h;
        background: #efefef;
    }
    ::-webkit-scrollbar-thumb {
        background: $scrollbar-color;
        border-radius: $scrollbar-w / 2;
    }
}
</style>
