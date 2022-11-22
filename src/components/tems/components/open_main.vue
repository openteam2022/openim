<template>
    <div class="open-main" ref="openmain" :style="setSize()">
        <slot></slot>
    </div>
</template>

<script>
    import {eachNodesClass} from '../common/utils.js'
    export default{
        name: 'OpenMain',
        props:{

        },
        data(){
            return{
                isHeader: false,
                isFooter: false,
                isAside: false,
                asideWidth: [],
                headerHeight: 0,
                footerHeight: 0
            }
        },
        mounted(){
            this.getElement();
        },
        methods:{
            // 获取同级节点
            getElement(){
                const _this = this;
                let el = _this.$refs.openmain; //获取当前main节点
                let ep = el.parentNode; //获取父节点
                let epc = ep.childNodes;//再从父节点获取子节点，相当于当前元素的同级节点
                // 遍历同级元素数组对象
                eachNodesClass(epc,function(className,node){
                    switch(className){
                        case 'open-header':
                            _this.isHeader = true;
                            _this.headerHeight = node.offsetHeight;
                            break;
                        case 'open-footer':
                            _this.isFooter = true;
                            _this.footerHeight = node.offsetHeight;
                            break;
                        case 'open-aside':
                            _this.asideWidth.push(node.offsetWidth);
                            _this.isAside = true;
                            break;
                    }
                })
            },
            // 设置main的高度
            setSize(){
                let h  = "100%",
                    w  = "100%",
                    hh = this.headerHeight + 'px',
                    fh = this.footerHeight + 'px',
                    fhh = this.footerHeight + this.headerHeight +'px',
                    aw = 0;
                this.asideWidth.forEach(item=>{
                    aw += item;
                })
                aw = aw + 'px';
                if(this.isFooter && this.isHeader && this.isAside){
                    return { height: `calc(${h} - ${fhh})` ,width: `calc(${w} - ${aw})` };
                }else if(this.isFooter && this.isHeader){
                    return { height: `calc(${h} - ${fhh})` ,width: `calc(${w} - ${aw})` };
                }else if(this.isFooter && this.isAside){
                    return { height: `calc(${h} - ${fh})` ,width: `calc(${w} - ${aw})` };
                }else if(this.isAside){
                    return { height: `100%` ,width: `calc(${w} - ${aw})` };
                }else if(this.isHeader){
                    return { height: `calc(${h} - ${hh})`,width: `calc(${w} - ${aw})` };
                }else if(this.isFooter){
                    return { height: `calc(${h} - ${fh})`,width: `calc(${w} - ${aw})` };
                }
            },
            

        }
    }
</script>

<style scoped>
    .open-main{
        width: inherit;
        box-sizing: border-box;
        overflow-y: auto;
    } 
</style>