<template>
    <div class="open-badge">
        <span class="open-badge-mark text" ref="openbadgetext" v-if ="!dot">{{val}}</span>
        <span class="open-badge-mark dot" ref="openbadgedot" v-if ="dot"></span>
        <div class="open-badge-box" >
            <slot>  </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OpenBadge',
        props: {
            value: {
                type: Number,
                default: 50
            },
            max: {
                type: Number,
                default: 99
            },
            dot: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                val: '',
                wNum: 0,
                hNum: 0
            }
        },
        mounted(){
            this.setWidth();
            this.filter();
        },
        methods:{
            setWidth(){
                let el = this.$refs.openbadgetext || this.$refs.openbadgedot;
                setTimeout(()=>{
                    this.wNum = '-' + el.offsetWidth / 2 + 'px';
                    this.hNum = '-' + el.offsetHeight / 2 + 'px';
                },10)
            },
            // 过滤值
            filter(){
                if(this.value > this.max){
                    this.val = this.max + '+';
                }else{
                    this.val = this.value
                }
            }
        }

    }
</script>

<style scoped>
    .open-badge{
        display: inline-block;
        position: relative;
    }
    .open-empty-box{
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
    }
    .open-badge-mark{
        display: inline-block;
        position: absolute;
        right: v-bind(wNum);
        top: v-bind(hNum);
        background: #f56c6c;
    }
    .text{
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        border-radius: 9px;
        color: #ffffff;
        font-size: 10px;
    }
    .dot{
        /*top: 7px;*/
        height: 8px;
        width: 8px;
        border-radius: 50%;
    }
</style>