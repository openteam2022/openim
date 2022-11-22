<template>
    <div class="open-tabs">
        <ul class="open-tabs-list open-tabs-default" v-if=" type == 'default'">
            <li v-for="(item,index) in data" :class="[options == index ? 'default-active' : ''  ]" @click="onTabs(index)">{{item.name}}</li>
        </ul>
        <ul class="open-tabs-list open-tabs-card" v-if="type == 'card'">
            <li v-for="(item,index) in data" :class="[options == index ? 'card-active' : '', index == 0 ? 'first':'',index == data.length-1 ? 'last':''  ]" @click="onTabs(index)">{{item.name}}<i v-if="options == index" class="bi bi-x-lg"></i></li>
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'OpenTabs',
        props:{
            type: {
                type: String,
                default: 'card'
            }
        },
        data(){
            return{
                data: [
                    {
                        name: '选项A'
                    },
                    {
                        name: '选项B'
                    },
                    {
                        name: '选项C'
                    }
                ],
                options: 0
            }
        },
        methods:{
            onTabs(index){
                this.options = index;
            }
        }

    }
</script>

<style scoped>
    .open-tabs{
        width: 100% ;
        color: #333333;
        font-size: 14px;
    }
    .open-tabs-list{
        display: flex;
    }
    .open-tabs-list li{
        padding: 8px 18px;
        cursor: pointer;
    }
    /*默认风格*/
    .default-active{
        color: #1890ff;
        border-bottom: 2px #1890ff solid;
    }

    /*卡片风格*/
    .open-tabs-card{
        border-bottom: 1px #e4e7ed solid;
    }
    .first{
        border-top-left-radius: 5px;
        border-left: 1px #e4e7ed solid;
    }
    .last{
        border-top-right-radius: 5px;
    }
    .open-tabs-card li{
        border-right: 1px #e4e7ed solid ;
        border-top: 1px #e4e7ed solid ;
    }
    .open-tabs-card li i{
        font-size: 10px;
        margin-left: 6px;
    }
    .open-tabs-card li i:hover{
        color: red;
    }
    .card-active{
        color: #1890ff;
    }
</style>