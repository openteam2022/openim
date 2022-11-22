<template>
    <div class="message-info">
        <ul class="message-info-options">
            <li v-for="(item,index) in options" :class="[select == index ? 'isSelect' : '']" @click="selectOptions(index)">{{item}}</li>
        </ul>
        <div class="message-info-user">   

        </div>
        <div class="message-info-">   

        </div>
    </div>
</template>

<script>
    export default {
        name: 'MessageInfo',
        data () {
            return {
                options:['用户信息','快捷回复'],
                select: 0,
            }
        },
        methods: {
            selectOptions(index){
                this.select = index;
            }
        }
    }
</script>

<style scoped>
    .message-info{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-left: 1px #eaecef solid;
        background: #fff;
        padding: 10px;
    }
    .message-info-options{
        display: flex;
        justify-content: space-around;
        color: #333;
        padding: 3px 0;
    }
    .message-info-options li{
        padding: 10px 0;
        font-size: 0.85rem;
        cursor: pointer;
    }
    .isSelect{
        color: #333;
        border-bottom: 2px #1890ff solid;
    }
</style>