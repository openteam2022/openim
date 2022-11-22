<template>
    <div :class="['open-col','xs-'+xs,'sm-'+sm,'md-'+md,'lg-'+lg,'xl-'+xl,'xxl-'+xxl]" ref="opencol">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'OpenCol',
        props: {
            offset: {
                type: Number,
                default: 0
            },
            xs: {
                type: Number,
                default: 0
            },
            sm: {
                type: Number,
                default: 0
            },
            md: {
                type: Number,
                default: 0
            },
            lg: {
                type: Number,
                default: 0
            },
            xl: {
                type: Number,
                default: 0
            },
            xxl: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                offsets: '0px'
            }
        },
        mounted(){
            this.init();
            this.setOffset();

        },
        methods: {
            // 组件初始化检测父节点是否为open-row
            init(){
                let el = this.$refs.opencol;
                let elc = el.parentNode;//获取父级节点
                let className = elc.getAttribute('class');
                if(className != 'open-row'){
                    throw "Error：'<open-col> parent node is not <open-row>'，父节点不是<open-row>";
                    return false;
                }
            },
            // 设置offset
            setOffset(){
                this.offsets = this.offset * 8.333333 + '%';
            }
        }
    }
</script>

<style scoped>
    .open-col{
        box-sizing: border-box;
    }
      /*媒体查询*/
    @media (max-width: 576px) { 
        .xs-1{
            width: 8.333333%;
        }
        .xs-2{
            width: 16.666666%;
        }
        .xs-3{
            width: 25%;
        }
        .xs-4{
            width: 33.333333%;
        }
        .xs-5{
            width: 41.666666%;
        }
        .xs-6{
            width: 50%;
        }
        .xs-7{
            width: 58.333333%;
        }
        .xs-8{
            width: 66.666666%;
        }
        .xs-9{
            width: 75%;
        }
        .xs-10{
            width: 83.333333%;
        }
        .xs-11{
            width: 91.666666%;
        }
        .xs-12{
            width: 100%;
        }
        .open-col{
            margin-left: v-bind(offsets);
        }
    }
    @media (min-width: 576px) { 
        .sm-1{
            width: 8.333333%;
        }
        .sm-2{
            width: 16.666666%;
        }
        .sm-3{
            width: 25%;
        }
        .sm-4{
            width: 33.333333%;
        }
        .sm-5{
            width: 41.666666%;
        }
        .sm-6{
            width: 50%;
        }
        .sm-7{
            width: 58.333333%;
        }
        .sm-8{
            width: 66.666666%;
        }
        .sm-9{
            width: 75%;
        }
        .sm-10{
            width: 83.333333%;
        }
        .sm-11{
            width: 91.666666%;
        }
        .sm-12{
            width: 100%;
        }
        .open-col{
            margin-left: v-bind(offsets);
        }
    }
    @media (min-width: 768px) { 
        .md-1{
            width: 8.333333%;
        }
        .md-2{
            width: 16.666666%;
        }
        .md-3{
            width: 25%;
        }
        .md-4{
            width: 33.333333%;
        }
        .md-5{
            width: 41.666666%;
        }
        .md-6{
            width: 50%;
        }
        .md-7{
            width: 58.333333%;
        }
        .md-8{
            width: 66.666666%;
        }
        .md-9{
            width: 75%;
        }
        .md-10{
            width: 83.333333%;
        }
        .md-11{
            width: 91.666666%;
        }
        .md-12{
            width: 100%;
        }
        .open-col{
            margin-left: v-bind(offsets);
        }
    }
    @media (min-width: 992px) { 
        .lg-1{
            width: 8.333333%;
        }
        .lg-2{
            width: 16.666666%;
        }
        .lg-3{
            width: 25%;
        }
        .lg-4{
            width: 33.333333%;
        }
        .lg-5{
            width: 41.666666%;
        }
        .lg-6{
            width: 50%;
        }
        .lg-7{
            width: 58.333333%;
        }
        .lg-8{
            width: 66.666666%;
        }
        .lg-9{
            width: 75%;
        }
        .lg-10{
            width: 83.333333%;
        }
        .lg-11{
            width: 91.666666%;
        }
        .lg-12{
            width: 100%;
        }
         .open-col{
            margin-left: v-bind(offsets);
        }
    }
     @media (min-width: 1200px) { 
        .xl-1{
            width: 8.333333%;
        }
        .xl-2{
            width: 16.666666%;
        }
        .xl-3{
            width: 25%;
        }
        .xl-4{
            width: 33.333333%;
        }
        .xl-5{
            width: 41.666666%;
        }
        .xl-6{
            width: 50%;
        }
        .xl-7{
            width: 58.333333%;
        }
        .xl-8{
            width: 66.666666%;
        }
        .xl-9{
            width: 75%;
        }
        .xl-10{
            width: 83.333333%;
        }
        .xl-11{
            width: 91.666666%;
        }
        .xl-12{
            width: 100%;
        }
         .open-col{
            margin-left: v-bind(offsets);
        }
    }
      @media (min-width: 1400px) { 
        .xxl-1{
            width: 8.333333%;
        }
        .xxl-2{
            width: 16.666666%;
        }
        .xxl-3{
            width: 25%;
        }
        .xxl-4{
            width: 33.333333%;
        }
        .xxl-5{
            width: 41.666666%;
        }
        .xxl-6{
            width: 50%;
        }
        .xxl-7{
            width: 58.333333%;
        }
        .xxl-8{
            width: 66.666666%;
        }
        .xxl-9{
            width: 75%;
        }
        .xxl-10{
            width: 83.333333%;
        }
        .xxl-11{
            width: 91.666666%;
        }
        .xxl-12{
            width: 100%;
        }
         .open-col{
            margin-left: v-bind(offsets);
        }
    }
</style>