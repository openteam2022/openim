<template>
    <div class="open-radio" ref="openradio">
        <label class="open-radio-main">
            <span class="open-radio-main-radio">
                <input class="ocmc-input"  type="radio" :name="name" :value="label" :checked="modelValue"
                @click="change($event)">
                <span class="ocmc-cover" v-if="!modelValue">
                </span>
                <i class="bi bi-record-circle-fill ocmc-checked" v-if="modelValue"></i>
            </span>
            <span :class="['open-radio-main-label',isCheck]"><slot>{{label}}</slot></span>
        </label>
    </div>
</template>

<script>
    import Open from '../library/open_comm.js'
    export default {
        name: 'OpenRadio',
        props: {
            name: {
                type: String,
                default: '' 
            },
            label: {
                type: String,
                default: 'radio'
            },
            checked: {
                type: Boolean,
                default: false,
            }
        },
        emits: ['update:modelValue','change'],
        data() {
            return {
                modelValue: this.checked,
                isCheck: 'default',
                isRadioGroup: false,
                item: 0,
            }
        },
        mounted(){
            const _this = this;
            let el = _this.$refs.openradio;
            let pel = el.parentNode;
            let className = pel.getAttribute('class');
            if(className == 'open-radio-group'){
                _this.isRadioGroup = true;
            }
            setTimeout(()=>{
                _this.item = el.dataset.radioItem;
                if(_this.item == 1){
                    this.modelValue = true;
                    this.isCheck = "select"
                    this.$emit('update:modelValue', this.label);
                    this.$emit('change', this.label);
                    if(this.isRadioGroup){
                        Open.emit('radioChange',{name: this.item,value: this.label});
                    }
                }
            },200)
            Open.on('radioValue',res=>{
                if(this.item != res){
                    this.modelValue = false;
                    this.isCheck = 'default';
                }
            })
        },
        methods: {
            change(e){
                this.modelValue ? this.modelValue = false : this.modelValue = true;
                if(this.modelValue){
                    this.$emit('update:modelValue', e.target.value);
                    this.$emit('change', e.target.value);
                }else{
                    this.$emit('update:modelValue', '');
                    this.$emit('change', '');
                }
                this.modelValue ? this.isCheck = "select" : this.isCheck = 'default';
                if(this.isRadioGroup){
                    if(this.modelValue){
                        Open.emit('radioChange',{name: this.item,value: e.target.value});
                    }else{
                        Open.emit('radioChange',{name: this.item,value: ''});
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .open-radio{
        display: inline-block;
        user-select: none;
        margin-right: 20px;
    }
    .open-radio-main{
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
    }
    .open-radio-main-radio{
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
        border-radius: 50%;
        width: 13px;
        height: 13px;
        border: 1px #999999 solid;
        z-index: 2;
        cursor: pointer;
    }
    .open-radio-main-radio:hover .ocmc-cover{
        border: 1px #1890ff solid!important;
    }
    .ocmc-checked{
        position: absolute;
        top: -3px;
        left: 0;
        width: 15px!important;
        height: 15px!important;
        border-radius: 50%;
        color: #1890ff;
        vertical-align: top;
    }
    .ocmc-cover i{
        display: inline-block;
        width: 12px!important;
        height: 12px!important;
    }
    .open-radio-main-label{
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