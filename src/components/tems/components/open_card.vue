<template>
    <div class="open-card">
        <open-image :width="width" :height="height" :src="src" :load="load" :error="error"></open-image>
        <div class="open-card-title">{{title}}</div>
        <div class="open-card-content">{{subtitle}}</div>
    </div>
</template>

<script>
    export default {
        name: 'OpenCard',
        props: {
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '100%'
            },
            load: {
                type: String
            },
            src: {
                type: String,
                default: ''
            },
            error: {
                type: String
            },
            title: {
                tyle: String,
                default:'标题'
            },
            subtitle: {
                tyle: String,
                default:'副标题jfdsa jfd j放假哦第三发地方JOIA放到范德萨积分'
            }
        }
    }
</script>

<style scoped>
    .open-card{
        box-sizing: border-box;
        border-radius: 5px;
        text-align: center;
        padding-bottom: 20px;
    }
     .open-card-title{
        color: #333333;
        font-size: 1rem;
        margin-top: 10px;
        text-align: center;
        padding: 0 15px;
    }
    .open-card-content{
        box-sizing: border-box;
        text-align: left;
        margin-top: 10px;
        color: #999999;
        font-size: 0.9rem;
        text-align: center;
        padding: 0 15px;
    }
</style>