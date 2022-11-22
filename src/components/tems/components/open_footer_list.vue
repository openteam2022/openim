<template>
    <div class="open-footer-list">
        <div class="open-footer-list-title">{{data.title}}</div>
        <ul class="open-footer-list-list">
            <li v-for="item in data.items"><span>{{item.text}}</span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'OpenFooterList',
        props: {
            data: {
                type: Object,
                default: {
                    title: '开发产品',
                    items: [
                        {
                            text: 'open-ui',
                            link: ''
                        },
                        {
                            text: 'open-chart',
                            link: ''
                        },
                        {
                            text: 'open-admin',
                            link: ''
                        },
                        {
                            text: 'open-builder',
                            link: ''
                        },
                        {
                            text: 'open-shop',
                            link: ''
                        },
                        {
                            text: 'open-im',
                            link: ''
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .open-footer-list{
        box-sizing: border-box;
        padding: 30px 0;
        text-align: left;
    }
    .open-footer-list-title{
        font-size: 1rem;
        color: #555555;
        font-weight: bold;
        padding: 10px 0;
        /*border-bottom: 1px #333333 solid;*/
    }
    .open-footer-list-list{
        list-style: none;
        padding: 0;
    }
    .open-footer-list-list li{
        font-size: 0.9rem;
        color: #333333;
        padding: 3px 0;
        cursor: pointer;
    }
    .open-footer-list-list li:hover{
        color: #1890ff;
    }
</style>