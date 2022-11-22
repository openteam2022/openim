<template>
    <div class="open-footer-info">
        <p class="open-footer-info-text">
            <span>{{data.brand}}</span>
            <a target="_blank" class="ofit-a" :href="data.icpLink">
                <span>{{data.icp}}</span>
            </a> 
             <a target="_blank" class="ofit-a" :href="data.beianLink">
                <img :src="data.beianImg" style="float:left;"/>
                <span>{{data.beianId}}</span>
            </a>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'OpenFooterInfo',
        props: {
            data: {
                type: Object,
                default: {
                    brand: '©2022 深圳市千途信息技术有限公司 ',
                    adress: '深圳市宝安区西乡街道流塘社区榕树路24兰花厂E栋宿舍楼103 ',
                    email: 'qiantujishu@163.com',
                    icp: '粤ICP备2021174028号',
                    icpLink: 'https://beian.miit.gov.cn/',
                    beianId: '粤公网安备 44030602006708号',
                    beianLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602006671',
                    beianImg: require('../assets/beian.png')
                }
            }
        }
    }
</script>

<style scoped>
    .open-footer-info{
        box-sizing: border-box;
        text-align: center;
        font-size: 0.85rem;
        color: #999999;
    }
    .open-footer-info-text{
        padding: 10px 0;
    }
    .ofit-a{
        display:inline-block;
        text-decoration:none;
        height:20px;
        line-height:20px;
        margin-left: 10px;
        color: #999999;
    }
    .ofit-a:hover{
        color: #1890ff;
    }
    
</style>