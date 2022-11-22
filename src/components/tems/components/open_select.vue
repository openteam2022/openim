<template>
    <div class="open-select">
         <div :class="['open-select-main',isClick]" @click.stop="onClick">
             <span class="open-select-main-input">{{modelValue}}</span>
             <span class="open-select-main-icon" ref="openselecticon"><i class="bi bi-chevron-down" ></i></span>
         </div>
         <div class="open-select-list" ref="openselectlist">
             <slot>
                 <open-option disabled/>
                 <open-option/>
                 <open-option/>
                 <open-option/>
             </slot>
         </div>
    </div>
</template>

<script>
    import {eachNodesClass} from '../common/utils.js'
    import Open from '../library/open_comm.js'
    export default {
        name: 'OpenSelect',
        data() {
            return {
                modelValue: 'Select',
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
            // 获取子组件
            let cel = el.childNodes;
            // 为子元素添加标识
            eachNodesClass(cel,function(className,node,i){
                if(className.search('open-option')){
                    throw 'Error: childNodes is not open-option;报错：子组件不是open-option;';
                    return false;
                }else{
                    node.setAttribute('data-select-item',i)
                }
            })
            // 监听页面点击事件，如果select列表展开则关闭
            window.addEventListener('click',function(){
                if(_this.isClick == 'isClickStyle'){
                    _this.hideList(_this);
                }
            })
            // 监听子组件点击传参
            Open.on('selectChange',res=>{
                let ccel = el.childNodes;
                eachNodesClass(ccel,function(className,node,i){
                    if(i == res.name){
                        node.classList.add('open-select-active')
                    }else{
                        node.classList.remove('open-select-active')
                    }
                })
                _this.modelValue = res.value;
                _this.hideList(_this);
                _this.$emit('update:modelValue',_this.modelValue);
                _this.$emit('change',_this.modelValue);
            })
        },
        methods:{
            onClick(){
                if(this.isClick == ''){
                    this.isClick = 'isClickStyle';
                    this.iconRotateUp(this);
                    this.heightDown(this);
                }else{
                    this.isClick = ''
                    this.iconRotateDown(this);
                    this.heightUp(this);
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
                _this.iconRotateDown(_this);
                _this.heightUp(_this);
            },
            // 
            iconRotateUp(_this){
                let el = _this.$refs.openselecticon;
                let deg = 0;
                let time;
                time = setInterval(()=>{
                    deg += 5;
                    if(deg >= 180){
                        clearInterval(time);
                        return false;
                    }
                    let d = deg + 'deg';
                    el.style.transform = 'rotate(-'+ d +')';
                },8)
                
            },
            iconRotateDown(_this){
                let el = _this.$refs.openselecticon;
                let deg = 180;
                let time;
                time = setInterval(()=>{
                    deg -= 5;
                    if(deg <= 0){
                        clearInterval(time);
                        return false;
                    }
                    let d = deg + 'deg';
                    el.style.transform = 'rotate(-'+ d +')';
                },8)
            },
            heightUp(_this){
                let el = _this.$refs.openselectlist;
                let height = _this.listHeight;
                let time;
                time = setInterval(()=>{
                    height -= 10;
                    if(height < 10){
                        el.style.display = 'none';
                        clearInterval(time);
                        return false;
                    }
                    el.style.height = height + 'px';
                },1)
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
                },1)
            }
        }

    }
</script>

<style scoped>
    .open-select{
        width: 220px;
        user-select: none;
        position: relative;
        cursor: pointer;
    }
    .open-select-main{
        display: flex;
        align-items: center;
        padding: 0 15px;
        border: 1px #dcdfe6 solid;
        border-radius: 4px;
        font-size: 14px;
        color: #999999;
        background: #ffffff;
    }
    .open-select-main:hover{
        border: 1px #cccccc solid;
    }
    .open-select-main-input{
        display: inline-block;
        height: 35px;
        line-height: 35px;
        width: 100%;
    }
    .open-select-main-icon{
        display: inline-block;
        height: 20px;
        line-height: 20px;
        width: 20px;
        text-align: center;
        font-size: 12px;
    }
    .isClickStyle{
        border: 1px #1890ff solid!important;
        box-shadow: 0px 1px 10px #dcdfe6;
    }
    .open-select-list{
        position: absolute;
        top: 45px;
        left: 0;
        width: 100%;
        padding: 5px 0;
        box-sizing: border-box;
        z-index: 99999;
        box-shadow: 0px 1px 10px #dcdfe6;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
    }
</style>