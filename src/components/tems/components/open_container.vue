<template>
    <div :class="['open-container',direction]" ref="opencontainer" :style="setSize()">
        <slot></slot>
    </div>
</template>

<script>
    import {eachNodesClass} from '../common/utils.js'
    export default{
        name: 'OpenContainer',
        data(){
            return {
                isHeader: false,
                isAside: false,
                asideWidth: 0,
                headerHeight: 0,
                direction: ''

            }
        },
        mounted(){
            this.getElement();
        },
        methods:{
            // 获取同级节点
            getElement(){
                const _this = this;
                let el = _this.$refs.opencontainer; //获取当前main节点
                let ep = el.parentNode; //获取父节点
                let epc = ep.childNodes;//获取同级节点
                eachNodesClass(epc,function(className,node){
                    if(className == 'open-header'){
                        _this.headerHeight = node.offsetHeight;
                        _this.isHeader = true;
                    }
                    if(className == 'open-aside'){
                        _this.asideWidth = node.offsetWidth;
                        _this.isAside = true;
                        _this.direction = 'vertical'
                    }
                })
                if(ep.className !== 'open-container'){
                    _this.direction = 'vertical'
                }
            },
            // 设置container尺寸
            setSize(){
                let h = "100%";
                let w = "100%";
                let aw = this.asideWidth + 'px';
                let hh = this.headerHeight + 'px';
                if(this.isAside){
                    return { height: `calc(${h} - 0px)` ,width: `calc(${w} - ${aw})` };
                }else if(this.isHeader){
                    return { height:`calc(${h} - ${hh})` ,width: `calc(${w} - 0px})` };
                }
            },

        }
    }
</script>

<style>
    .open-container{
        display: flex;
        flex: 1;
        flex-basis: auto;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .vertical{
        flex-direction: column;
    }
</style>