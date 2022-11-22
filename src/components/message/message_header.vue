<template>
    <div class="message-header">
        <span class="message-header-name">{{data.title}}</span>
        <span class="message-header-name">{{data.type}}</span>
    </div>
</template>

<script>
    export default {
        name: 'MessageHeader',
        props: {
            data: {
                type: Object,
                default: {
                    title: '用户名',
                    type: '来源',
                }
            }
        }

    }
</script>

<style scoped>
    .message-header{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .message-header-name{
        font-size: 1.2rem;
        color: #333;
        font-weight: bold;
    }
</style>