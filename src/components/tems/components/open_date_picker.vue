<template>
    <div class="open-date-picker">
         <div :class="['open-date-picker-main',isClick]" @click.stop="onClick">
            <span class="open-date-picker-main-icon"><i class="bi bi-calendar4"></i></span>
            <input type="text" :value="modelValue" placeholder="Picker a day" class="open-date-picker-main-input">
         </div>
         <div class="open-date-picker-list" ref="openselectlist">
             <open-calendar @change="selectDate"></open-calendar>
         </div>
    </div>
</template>

<script>
    import Open from '../library/open_comm.js'
    export default {
        name: 'OpenSelect',
        data() {
            return {
                modelValue: 'Pick a day',
                isClick: '',
                listHeight: 0
            }
        },
        emits:['update:modelValue'],
        mounted(){
            const _this = this;
            // 获取select列表dom对象
            let el = _this.$refs.openselectlist;
            _this.initSelect(_this,el);
            // 监听页面点击事件，如果select列表展开则关闭
            window.addEventListener('click',function(){
                _this.hideSelect();
            });
        },
        methods:{
            selectDate(day){
                this.modelValue = day;
                this.$emit('update:modelValue',this.modelValue);
                this.$emit('change',this.modelValue)

            },
            onClick(){
                if(this.isClick == ''){
                    this.isClick = 'isClickStyle';
                    this.heightDown(this);
                }
            },
             // 初始化select列表
            initSelect(_this,el){
                _this.listHeight = el.offsetHeight;
                el.style.height = '0px';
                el.style.display = 'none';
            },
            // 隐藏下拉列表
            hideList(_this){
                _this.isClick = '';
                _this.heightUp(_this);
            },
            heightUp(_this){
                let el = _this.$refs.openselectlist;
                let height = _this.listHeight;
                let time;
                time = setInterval(()=>{
                    height -= 10;
                    if(height <= 10){
                        el.style.display = 'none';
                        clearInterval(time);
                        return false;
                    }
                    el.style.height = height + 'px';
                },10)
            },
            heightDown(_this){
                let el = _this.$refs.openselectlist;
                let height = _this.listHeight;
                let h = 0;
                let time;
                el.style.display = 'block';
                time = setInterval(()=>{
                    h += 10;
                    if(h >= height){
                        clearInterval(time);
                        return false;
                    }
                    el.style.height = h + 'px';
                },10)
            },
            // 全局点击事件隐藏选择列表
            hideSelect(){
                if(this.isClick == 'isClickStyle'){
                    this.hideList(this);
                }
            }
        }

    }
</script>

<style scoped>
    .open-date-picker{
        width: 220px;
        user-select: none;
        position: relative;
        cursor: pointer;
    }
    .open-date-picker-main{
        display: flex;
        align-items: center;
        padding: 0 15px;
        border: 1px #dcdfe6 solid;
        border-radius: 4px;
        font-size: 14px;
        color: #999999;
        background: #ffffff;
    }
    .open-date-picker-main:hover{
        border: 1px #cccccc solid;
    }
    .open-date-picker-main-input{
        outline: none;
        border: none;
        background: none;
        display: inline-block;
        height: 35px;
        line-height: 35px;
        width: 100%;
        color: #333333;
    }
    .open-date-picker-main-input::placeholder{
        color: #dcdcdc;
    }
    .open-date-picker-main-icon{
        display: inline-block;
        height: 20px;
        line-height: 20px;
        width: 25px;
        text-align: left;
        font-size: 12px;
    }
    .isClickStyle{
        border: 1px #1890ff solid!important;
        box-shadow: 0px 1px 10px #dcdfe6;
    }
    .open-date-picker-list{
        position: absolute;
        top: 45px;
        left: 0;
        padding: 5px 0;
        width: 270px;
        height: 279px;
        box-sizing: border-box;
        z-index: 99;
        box-shadow: 0px 1px 10px #dcdfe6;
        border-radius: 4px;
        background: #ffffff;
    }
</style>