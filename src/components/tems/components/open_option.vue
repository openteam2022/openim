<template>
    <div :class="['open-option',disabled ? 'isDisabled':'']" @click.stop="onSelect"  ref="openoption">{{value}}</div>
</template>

<script>
    import Open from '../library/open_comm.js'
    export default {
        name: 'OpenOption',
        props: {
            value: {
                type: String,
                default: 'Option'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onSelect(){
                if(this.disabled){
                    return false;
                }
                let el = this.$refs.openoption;
                let index = el.dataset.selectItem;
                Open.emit('selectChange',{name:index,value:this.value});
            }
        }
    }
</script>

<style scoped>
    .open-option{
        box-sizing: border-box;
        width: 100%;
        height: 34px;
        line-height: 34px;
        padding: 0 20px;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
    }
    .open-option:hover{
        background: #f4f4f4;
    }
    .open-select-active{
        color: #1890ff;
    }
    .isDisabled{
        color: #999999;
        cursor: not-allowed;
    }
    .isDisabled:hover{
        background: none;
    }
</style>