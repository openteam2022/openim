<template>
    <div class="open-row" ref="openrow">
        <slot></slot>
    </div>
</template>

<script>
    import {eachNodesClass} from '../common/utils.js'
    export default {
        name: 'OpenRow',
        props: {
            gutter: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                gutters: '0px'
            }
        },
        mounted(){
            this.init();
            this.setSpace();
        },
        methods: {
            // 组件初始化，检测子节点是否为open-col
            init(){
                let el = this.$refs.openrow;
                let elc = el.childNodes;//获取子级节点
                eachNodesClass(elc,function(className,node){
                    if(className.match(/'open-col'/)){
                        throw "Error：'<open-row> child node is not <open-col>'，子节点不是<open-col>";
                        return false;
                    }
                })
            },
            // 设置子节点间距
            setSpace(){
                this.gutters = this.gutter + 'px';
            }
        }
    }
</script>

<style scoped>
    .open-row{
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
    }
    :deep(.open-col){
        padding: 0 v-bind(gutters);
    }
</style>