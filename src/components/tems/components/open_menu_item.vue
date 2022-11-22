<template>
    <li class="open-menu-item" ref="openmenuitem">
        <div class="open-menu-item-title"><slot>吃饭</slot></div>
    </li>
</template>

<script>
    export default {
        name: 'OpenMenuItem',
        data() {
            return {
                paddingLeft: '20px'
            }
        },
        mounted(){
            let el = this.$refs.openmenuitem;
            let pel = el.parentNode;
            if(pel.getAttribute('class') == 'open-sub-menu-list'){
                this.paddingLeft = '40px'
            }
            let ppel = pel.parentNode.parentNode;
            if(ppel.getAttribute('class') == 'open-sub-menu-list'){
                this.paddingLeft = '60px'
            }
        }
    }
</script>

<style scoped>
    .open-menu-item{
        width: inherit;
    }
    .open-menu-item-title{
        width: inherit;
        box-sizing: border-box;
        padding: 0 20px 0 v-bind(paddingLeft);
        height: 50px;
        line-height: 50px;
        cursor: pointer;
    }
    .open-menu-item-title:hover{
        background: #dddddd;
        color: #1890ff;
    }
</style>