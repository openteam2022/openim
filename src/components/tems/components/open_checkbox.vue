<template>
    <div class="open-checkbox" ref="opencheckbox">
        <label class="open-checkbox-main">
            <span class="open-checkbox-main-checkbox">
                <input class="ocmc-input"  type="checkbox" :name="name" :value="label" :checked="modelValue"
                @change="change($event)">
                <span class="ocmc-cover" v-if="!modelValue">
                </span>
                <i class="bi bi-check-square-fill ocmc-checked" v-if="modelValue"></i>
            </span>
            <span :class="['open-checkbox-main-label',isCheck]"><slot>{{label}}</slot></span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'OpenCheckbox',
        props: {
            name: {
                type: String,
                default: '' 
            },
            label: {
                type: String,
                default: 'checkbox'
            },
            checked: {
                type: Boolean,
                default: false,
            }
        },
        emits: ['update:modelValue'],
        data() {
            return {
                modelValue: this.checked,
                isCheck: 'default',
                isCheckboxGroup: false,
                item: 0,
            }
        },
        mounted(){
            const _this = this;
            let el = _this.$refs.opencheckbox;
            let pel = el.parentNode;
            let className = pel.getAttribute('class');
            if(className == 'open-checkbox-group'){
                _this.isCheckboxGroup = true;
            }
            setTimeout(()=>{
                _this.item = el.dataset.item;
            },200)
        },
        methods: {
            change(e){
                this.modelValue = e.target.checked;
                if(this.modelValue){
                    this.$emit('update:modelValue', e.target.value);
                }else{
                    this.$emit('update:modelValue', '');
                }
                this.modelValue ? this.isCheck = "select" : this.isCheck = 'default';
                if(this.isCheckboxGroup){
                     if(this.modelValue){
                        Open.emit('checkboxChange',{name: this.item,value: e.target.value});
                    }else{
                        Open.emit('checkboxChange',{name: this.item,value: ''});
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .open-checkbox{
        display: inline-block;
        user-select: none;
        margin-right: 20px;
    }
    .open-checkbox-main{
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
    }
    .open-checkbox-main-checkbox{
        position: relative;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        box-sizing: border-box;
    }
    .ocmc-input{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        width: 15px;
        height: 15px;
        opacity: 0;
        margin: 0!important;
        cursor: pointer;
    }
    .ocmc-cover{
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        border-radius: 2px;
        width: 13px;
        height: 13px;
        border: 1px #999999 solid;
        z-index: 2;
        cursor: pointer;
    }
    .open-checkbox-main-checkbox:hover .ocmc-cover{
        border: 1px #1890ff solid!important;
    }
    .ocmc-checked{
        position: absolute;
        top: -3px;
        left: 0;
        width: 15px!important;
        height: 15px!important;
        color: #1890ff;
        vertical-align: top;
    }
    .ocmc-cover i{
        display: inline-block;
        width: 12px!important;
        height: 12px!important;
    }
    .open-checkbox-main-label{
        font-size: 14px;
        color: #555555;
    }
    .default{
        color: #333333;
    }
    .select{
        color: #1890ff;
        font-size: 14px;
    }
</style>