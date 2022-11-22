<template>
    <open-aside width="250px" style="background: #354053;">
        <div class="message-list-header" >
            <div class="message-list-header-user" data-tauri-drag-region>
                <open-image width="45px" height="45px" style="border-radius: 4px;" :src="require('@/assets/one.png')"></open-image>
                <div class="mlhu-info" data-tauri-drag-region>
                    <p class="mlhu-info-title">千途科技</p>
                    <p class="mlhu-info-status">
                        <span >在线</span>
                        <span class="mlhu-info-status-success"><i class="bi bi-check-circle-fill"></i></span>
                        <span class="mlhu-info-status-default"><i class="bi bi-exclamation-circle-fill"></i></span>
                    </p>
                </div>
            </div>
            <ul class="message-list-header-category">
                <li v-for="(item,index) in options" :class="[select == index ? 'isSelect' : '']" @click="selectOptions(index)">{{item}}</li>
            </ul>
            <div class="list-search">   
                <open-input style="color: #f4f4f4; border: none;" placeholder="手机号，用户名"></open-input>
            </div>
        </div>
        <div class="list">   
            <vuescroll :ops="opss">
                <ul>
                    <li v-for="(item,index) in userList" :class="['list-item',selectUsers == index ? 'select_list':'']" @click="selectUser(index)">
                        <div class="list-item-avator">
                            <open-badge dot="true" v-if="item.has_msg">
                                <img src="@/assets/one.png" alt="">
                            </open-badge>
                            <img src="@/assets/one.png" alt="" v-else>
                        </div>
                        <div class="list-item-info">
                            <p class="list-item-info-title">
                                <span class="liit-name">{{item.name}}</span>
                                <span class="liit-time">{{fram(item.time)}}</span>
                            </p>
                            <p class="list-item-info-message" v-if="item.message">{{item.message}}</p>
                            <p class="list-item-info-message" v-else>[暂无消息]</p>
                        </div>
                    </li>
                </ul>
            </vuescroll>
        </div>  
        <div style="width:100%;height:50px;line-height: 50px;box-size: border-box;text-align: center; tpadding: 0 10px;color: #fff;font-size: 0.9rem;border-top: 1px #30384a solid;">
            OpenIm 客服系统
            <audio hidden  :src="require('@/assets/message.mp3')" ref="audios"></audio>
        </div>
    </open-aside>
</template>

<script>
    import open from '@/components/tems/library/open_comm.js'
    import vuescroll from 'vuescroll';
    export default {
        name: 'MessageList',
        components: {
            vuescroll: vuescroll
        },
        data () {
            return {
                options:['消息','历史','标记','团队'],
                selectList:'',//判断聊天列表谁被选中
                selecttab:0,//判断聊天列表导航栏谁被选中
                count:30,
                name:'',
                select: 0,
                userList: this.$store.state.msgList,
                selectUsers: this.$store.state.userIndex,
                time:'',
                opss: {
                    vuescroll: {
                        mode: 'native',
                        sizeStrategy: 'percent',
                        detectResize: true,
                        /** 锁定一种滚动方向， 锁定的方向为水平或者垂直方向上滑动距离较大的那个方向 */
                        locking: true,
                    },
                    scrollPanel: {
                        initialScrollY: false,
                        initialScrollX: false,
                        scrollingX: false,
                        scrollingY: true,
                        speed: 300,
                        easing: undefined,
                        verticalNativeBarPos: 'right',
                        maxHeight:undefined,
                        maxWidth:undefined,
                    },
                    rail: {
                        background: '#999',
                        opacity: 0,
                        size: '2px',
                        specifyBorderRadius: false,
                        gutterOfEnds: null,
                        gutterOfSide: '2px',
                        keepShow: false
                    },
                    bar: {
                        background: '#999',
                        disable:false
                    }
              
                },
                data: [
                    {
                        name:'小黄',
                        id:2,
                        time: '11:00',
                        message: '哈哈,没有了吧'
                    }
                ]
            }
        },
        mounted(){
            open.on('msgDataChange',()=>{
                clearTimeout(this.time);
                this.playMusic();
            })
        },
        computed: {
            // 计算msgList用户聊天列表变化
            listenMsgList () {
                return this.$store.state.msgList;
            },
            // 计算msgData用户聊天信息变化
            listenMsgData () {
                return this.$store.state.msgData;
            }
        },
        watch: {
            // 监视用户聊天列表变化，及时更新视图
            listenMsgList(n,o){
                this.userList = n;
            },
            // 监视用户聊天信息，及时更新视图
            listenMsgData(n,o){
                let data = n;
                let user = this.userList;
                for(let u = 0; u < user.length;u ++){
                    let uItem = user[u];
                    for(let a = 0; a < data.length; a ++){
                        let dItem = data[a];
                        if(uItem.id == dItem.id ){
                            uItem['message'] = dItem.content[dItem.content.length-1].message;
                            uItem['time'] = dItem.content[dItem.content.length-1].time;
                        }
                    }
                }
                this.userList = user;
            }
        },
        methods: {
            selectOptions (index) {
                this.select = index;
            },
            selectUser (index) {
                this.selectUsers = index;
                // 聊天界面默认不显示，点击相对的用户后，事件上传给父组件，显示聊天界面
                this.$emit('change')
                // 设置当前聊天用户的下标，方便聊天页面获取聊天记录
                this.$store.commit('setUserIndex',index);
            },
            // 格式化时间
            fram(time){
                let newTime = '';
                if(time){
                    newTime = time.substring(10,time.length);
                }
                return newTime;
            },
            playMusic() {
                let el = this.$refs.audios;
                el.currentTime = 0;//从头开始播放
                el.play(); //播放
                this.time = setTimeout(()=>{
                    el.pause();//停止
                    clearTimeout(this.time)
                },3000);
            }

        }
    }
</script>

<style>
    .message-list-header{
        width: 100%;
        height: 165px;
        box-sizing: border-box;
    }
    .message-list-header-user{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 12px 10px;
    }
    .mlhu-info{
        margin-left: 10px;
        color: #fff;
    }
    .mlhu-info-title{
        font-size: 0.85rem;
    }
    .mlhu-info-status{
        font-size: 0.6rem;
        margin-top: 8px;
        display: flex;
        align-items: center;
    }
    .mlhu-info-status-success{
        margin-left: 10px;
        color: #67C23A;
    }
    .mlhu-info-status-default{
        margin-left: 10px;
        color: #888;
    }

    .message-list-header-category{
        display: flex;
        justify-content: space-around;
        color: #999;
        background: #30384a;
        padding: 3px 0;
    }
    .message-list-header-category li{
        padding: 10px 0;
        font-size: 0.85rem;
        cursor: pointer;
    }
    .isSelect{
        color: #fff;
        border-bottom: 2px #fff solid;
    }
    .list-search{
        height: 55px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #30384a solid;
    }
    .list-search :deep(.open-input){
        border-radius: 20px;
    }


    .list{
        width: inherit;
        box-sizing: border-box;
        height: calc(100% - 215px);
        overflow-y: auto;
    }
    ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .list-item{
        width: 100%;
        box-sizing: border-box;
        color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 12px;
        cursor: pointer;
    }
    .select_list{
        background: #30384a;
    }
    .list-item:hover{
        background: #30384a;
    }
    
    .list-item-avator{
        width: 40px;
        height: 40px;
    }
    .list-item-avator img{
        width: 40px;
        height: 40px;
        border-radius: 3px;
    }
    .list-item-info{
        width: 176px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
    }
    .list-item-info p {
        width: 176px;
    }
    .list-item-info-title{
        font-size: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .liit-name{
        width: 80px!important;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #fff;
    }
    .liit-time,.list-item-info-message{
        font-size: 0.6rem;
        color: #aaa;
    }
    .list-item-info-message{
        width: 130px!important;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>