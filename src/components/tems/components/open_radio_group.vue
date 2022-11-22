<template>
    <div class="open-radio-group" ref="openradiogroup">
        <slot>
            <open-radio v-model="a" label="白色" @change="change">白色</open-radio>
            <open-radio v-model="a" label="黑色" @change="change">黑色</open-radio>
        </slot>
    </div>
</template>

<script>
    import {eachNodesClass} from '../common/utils.js'
    import Open from '../library/open_comm.js'
    export default {
        name: 'OpenRadioGroup',
        emits: ['update:modelValue','change'],
        data() {
            return {
                modelValue:''
            }
        },
        mounted(){
            let el = this.$refs.openradiogroup;
            let cel = el.childNodes;
            eachNodesClass(cel,function(className,node,i){
                if(className != 'open-radio'){
                    throw 'Error: childNodes is not open-radio;报错：子组件不是open-radio;';
                    return false;
                }else{
                    node.setAttribute('data-radio-item',i)
                }
            })
            Open.on('radioChange',res=>{
                this.modelValue = res.value;
                this.$emit('update:modelValue',this.modelValue)
                this.$emit('change',this.modelValue)
                Open.emit('radioValue',res.name)
            })
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .open-radio-group{

    }
</style>