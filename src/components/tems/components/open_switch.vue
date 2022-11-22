<template>
    <div class="open-switch" ref="openswitch" @click.stop="onSwitch">
        <div class="open-switch-top" ref="openswitchtop"></div>
        <div class="open-switch-text" ref="openswitchtext">{{text}}</div>
    </div>
</template>

<script>
    export default {
        name: 'OpenSwitch',
        data(){
            return {
                topMoveDistance:'',//圆圈滑动距离
                textMoveDistance:'',//文字滑动距离
                padding: 2,
                value: false,
                text:'否',
                topEl:'',
                textEl:'',
                backColor:'#cccccc',
                textLeft: '0px',//text距离left的距离
            }
        },
        mounted(){
            this.init();
            this.textLeft = this.textMoveDistance + 'px';
        },
        methods: {
            onSwitch(){
                if(this.value){
                    // 圆圈向左
                    this.moveLeft(this.topEl,this.topMoveDistance);
                    // 文字向右
                    this.moveRight(this.textEl,this.textMoveDistance);
                    this.value = false;
                    this.text = '否';
                    this.backColor = '#cccccc';
                }else{
                    // 圆圈向右
                    this.moveRight(this.topEl,this.topMoveDistance);
                    // 文字向左
                    this.moveLeft(this.textEl,this.textMoveDistance);
                    this.value = true;
                    this.text = '是';
                    this.backColor = '#1890ff';
                }
            },
            // 向右滑动
            moveRight(el,distance){
                this.baseMove(this.padding,distance,function(item,move){
                    let time;
                    time = setInterval(()=>{
                        item += 1;
                        if(item >= move){
                            clearInterval(time);
                            return false;
                        }
                        el.style.left = item + 'px';
                    },10)
                })
            },
             // 向左滑动
            moveLeft(el,distance){
                const _this = this;
                this.baseMove(this.padding,distance,function(item,move){
                    let time;
                    time = setInterval(()=>{
                        item -= 1;
                        if(item <= _this.padding){
                            clearInterval(time);
                            return false;
                        }
                        el.style.left = item + 'px';
                    },10)
                })
            },
            baseMove(padding,distance,fn){
                let move = distance;
                let item = padding + move;
                fn(item,move)
            },
            // 初始化获取元素的宽度和移动距离
            init(){
                let pel = this.$refs.openswitch;
                let pW = pel.offsetWidth - this.padding;
                // 文字的数据
                let textEl = this.$refs.openswitchtext;
                this.textEl = textEl;
                let textW = textEl.offsetWidth;
                // 文字移动距离
                this.textMoveDistance = pW - textW - this.padding * 2;
                // 圆圈的数据
                let topEl = this.$refs.openswitchtop;
                this.topEl = topEl;
                let topW = topEl.offsetWidth;
                // 圆圈移动距离
                this.topMoveDistance = pW - topW;
            }
        }
    }
</script>

<style>
    .open-switch{
        width: 50px;
        height: 20px;
        background: v-bind(backColor);
        border-radius: 15px;
        box-sizing: border-box;
        padding: 2px;
        position: relative;
        cursor: pointer;
    }
    .open-switch-top{
        height: 16px;
        width: 16px;
        border-radius: 8px;
        background: #ffffff;
        position: absolute;
        top: 2px;
        left: 2px;
        z-index: 99;
    }
    .open-switch-text{
        height: 16px;
        border-radius: 8px;
        position: absolute;
        top: 2px;
        left: v-bind(textLeft);
        z-index: 9;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
    }
</style>