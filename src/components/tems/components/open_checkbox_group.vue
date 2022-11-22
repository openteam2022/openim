<template>
    <div class="open-checkbox-group" ref="opencheckboxgroup" >
        <slot>
            <open-checkbox label="白色"></open-checkbox>
            <open-checkbox label="黑色"></open-checkbox>
            <open-checkbox label="红色"></open-checkbox>
        </slot>
    </div>
</template>

<script>
    import {eachNodesClass} from '../common/utils.js'
    import Open from '../library/open_comm.js'
    export default {
        name: 'OpenCheckboxGroup',
        emits: ['update:modelValue','change'],
        data() {
            return {
                checkbox: [],
                modelValue:[]
            }
        },
        mounted(){
            const _this = this;
            let el = this.$refs.opencheckboxgroup;
            let cel = el.childNodes;
            eachNodesClass(cel,function(className,node){
                if(className != 'open-checkbox'){
                    throw 'Error: childNodes is not checkbox;报错：子组件不是checkbox;';
                    return false;
                }
            })
            Open.on('checkboxChange',res=>{
                let name = res.name;
                let value = res.value;
                _this.checkbox[name] = value;
                let arr = [];
                for(let i = 0;i < _this.checkbox.length;i ++){
                    if(_this.checkbox[i]){
                        arr.push(_this.checkbox[i])
                    }
                }
                _this.modelValue = arr;
                _this.handleChange(_this);
            })
        },
        methods: {
            handleChange(self){
                self.$emit('update:modelValue',self.modelValue);
                self.$emit('change',self.modelValue);
            }
        }

    }
</script>

<style scoped>
    
</style>