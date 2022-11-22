<template>
    <open-container class="message-box">
        <open-main>
            <div class="message-chat-list" >
                <vuescroll :ops="ops" @handle-scroll="handleScroll" ref="wrapper" v-if="messageList.length > 0">
                    <Transition name="load">
                        <open-load-bar style="margin-top: 10px;" :isShow="isShow"></open-load-bar>
                    </Transition>     
                    <ul class="message-chat-list-box" >   
                        <li v-for="(item,index) in messageList" :id ="'s'+index ">
                            <div class="message-chat-list-time">{{item.time}}</div>
                            <div class="message-chat-list-left" v-if="item.sendId != user.id">
                                <div class="mcll-avator">
                                    <open-image :src="friends.img"></open-image>
                                </div>
                                <div class="mcll-text">
                                    <p><span class="left-mark"></span> {{item.message}}</p>
                                </div>
                            </div>
                            <div class="message-chat-list-right" v-else >
                                <div class="mclr-text">
                                    <p><span class="right-mark"></span>{{item.message}}</p>
                                </div>
                                <div class="mclr-avator">
                                    <open-image :src="user.img"></open-image>
                                </div>
                            </div> 
                        </li>
                    </ul>
                </vuescroll> 
                <div style="width:100%;height: 100%;" v-else>
                    <open-empty></open-empty>  
                </div>
            </div>
        </open-main>
        <open-footer height="150px" style="position: relative;">
            <div class="message-footer">
                <ul class="message-footer-utils">
                    <li @click="showEmoji"><i class="bi bi-emoji-smile"></i></li>
                    <li><i class="bi bi-card-image"></i></li>
                    <li><i class="bi bi-play-btn"></i></li>
                    <li><i class="bi bi-folder-plus"></i></li>
                </ul>
                <textarea rows="3" maxlength="120" v-model="message" class="message-footer-input" placeholder="说点什么吧" ref="input" @focus="inputText" style="color: #333333;font-size: 0.85rem;" @keyup.enter="send"></textarea>
                <div class="message-footer-send">
                    <p style="color: #999;">open team 提供技术支持</p>
                    <open-button type="primary" fontSize="0.7rem" padd="5px 15px" @click="send">发送</open-button>
                </div>
            </div>
            <!-- 表情 -->
            <Transition name="emoji">
                <div class="emoji" v-show="emojiShow">
                    <div class="emoji-box">
                        <div class="emoji-list" v-for="item in emojis">
                            <p class="emoji-list-item" v-for="i in item" @click.stop="addEmoji(i)">{{i}}</p>
                        </div>
                    </div>
                </div>
            </Transition>
        </open-footer>
    </open-container>
   
</template>

<script>
    import vuescroll from 'vuescroll';
    import emojiList from '@/assets/js/emoji.js'
    export default {
        name: 'MessageChat',
        components: {
            vuescroll,
        },
        data () {
            return {
                isShow: false,//loading条
                initShow: false,//loading条初始化
                emojis: emojiList.emoji,//emoji表情
                emojiShow:false,
                message: '',
                user: this.$store.state.userInfo,
                friends: {},
                messageList:[],
                message:'',
                focus: false,
                ops: {
                    vuescroll: {
                        // mode: 'slide',
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
                        speed: 1200,
                        easing: undefined,
                        verticalNativeBarPos: 'right',
                        maxHeight:undefined,
                        maxWidth:undefined,
                    },
                    rail: {
                        background: '#f4f4f4',
                        opacity: 0,
                        size: '2px',
                        specifyBorderRadius: false,
                        gutterOfEnds: null,
                        gutterOfSide: '2px',
                        keepShow: false
                    },
                    bar: {
                        background: '#ccc',
                        disable:false
                    }
              
                },
                
            }
        },
        created() {
            const _this = this;
            // 聊天用户存储到一个列表中，现在聊天界面获取当前用户下标
            let index = _this.$store.state.userIndex;
            // 获取聊天对象的信息
            let msgMiddleData = _this.$store.state.msgMiddleData;
            // 获取当前聊天对象的id,name,img
            _this.friends = {
                id: msgMiddleData[2][index],
                img: msgMiddleData[1][index],
                name: msgMiddleData[0][index]
            }
            // 获取用户当前聊天记录
            let msgData = _this.$store.state.msgData;
            msgData.forEach( item => {
                if(item.id == _this.friends.id){
                    _this.messageList = item.content;
                }
            })

            // 获取用户聊天列表，如果当前用户有未读提示，则修改消息提示为已读，去除小红点
            let msgList = _this.$store.state.msgList;
            msgList.forEach( item => {
                if(item.id == _this.friends.id){
                    item.has_msg = false;
                }
            })
            // 然后重新赋值给msgList,列表页会监视msgList,进行列表更新
            this.$store.commit("setMsgList",msgList);
        },
        mounted() {
            this.scrollView()
            this.hideEmoji();
        },
        computed: {
            // 计算聊天消息变化
            listenMsgData(){
                return this.$store.state.msgData;
            },
            // 计算聊天列表选择变化
            listenUserIndex(){
                return this.$store.state.userIndex;
            }
        },
        watch:{
            // 监视聊天消息变化
            listenMsgData(n,o){
                const _this = this;
                // 获取最新的消息
                let msgData = n;
                let oldMsgData = o;
                _this.messageList = [];
                // 获取聊天列表信息
                let msgList = _this.$store.state.msgList;
                // 遍历所有消息
                msgData.forEach( item => {
                    // 如果找到当前聊天对象id则把消息更新到聊天信息列表
                    if( _this.friends.id && item.id == _this.friends.id ){
                       _this.messageList = item.content;
                    }else{
                        // 如果有新消息，不是当前聊天页面的对象，则遍历聊天列表数组
                        msgList.forEach( items => {
                            // 不是当前正在聊天的对象,则设置小红点
                            if(items.id == _this.$store.state.newMgUserId){
                                if(_this.$store.state.nowMgUserId && items.id != _this.$store.state.nowMgUserId){
                                    items.has_msg = true;
                                    return false;
                                }
                                items.has_msg = true;
                                
                            }
                        })
                    }

                })

                // 然后重新设置聊天用户列表
                _this.$store.commit("setMsgList",msgList);
                // 跳转到最底部
                _this.scrollView();

            },
            listenUserIndex(n,o){
                // 获取当前好友的id,姓名，头像
                const _this = this;
                // 如果聊天对象发生改变。则重置当前聊天框内容
                _this.message = '';
                // 获取当前聊天用户列表
                let msgList = _this.$store.state.msgList;
                // 重置加载条
                _this.initShow = false;
                // 获取当前的聊天用户表
                let msgMiddleData = _this.$store.state.msgMiddleData;
                // 重新赋值当前聊天对象信息
                _this.friends = {
                    id: msgMiddleData[2][n],
                    img: msgMiddleData[1][n],
                    name: msgMiddleData[0][n]
                }

                _this.$store.state.nowMgUserId = _this.friends.id;
                // 当前聊天窗口的用户去掉红点
                msgList[n]['has_msg'] = false;
                // 获取当前全部聊天记录
                let msgData = _this.$store.state.msgData;
                // 标识，当前用户是否有聊天记录
                let mark = false;
                msgData.forEach( item => {
                    if(item.id == _this.friends.id){
                        // 如果有聊天记录，mark赋值true
                        mark = true;
                        if(!item.content){
                            _this.messageList = [];
                        }else{
                            _this.messageList = item.content;
                        }
                    }
                })
                // 如果没有聊天记录，当前聊天列表为空
                if(!mark){
                    _this.messageList = [];
                }
                this.$store.commit("setMsgList",msgList);
                // 跳转到页面最底部
                if(_this.messageList.length > 0){
                     _this.scrollView();
                }
            }
        },
        methods: {
            send(){
                const _this = this;
                // 判断发送信息是否为空，为空则不发送
                if(this.message == ''){
                    this.$message({message:'内容不能为空',type:'danger'})
                    return;
                }
                let time = _this.getDate();
                let message = {
                    fromId:_this.friends.id,
                    sendId:_this.user.id,
                    message:_this.message,
                    type:'text',
                    time: time
                };
                // this.messageList.push(message);
                // 利用axios发起ajax请求，将client_id发给后端进行uid绑定
                this.$http.post('http://www.openmi.com/index.php/kefu/connect/send',{data:JSON.stringify(message)})
                    .then((res) => {
                        // 获取当前用户本地全部聊天记录
                        let msgData = _this.$store.state.msgData;
                        let msgDb = [];
                        // 标识符，默认false,表示当前用户还未聊过天
                        let mark = false;
                        for(let i = 0;i < msgData.length;i++){
                            let msgDataItem = [];
                            if(msgData[i].id == _this.friends.id){
                                // 如果聊过天，有历史记录，mark就赋值true
                                mark = true;
                                msgData[i].content = msgData[i].content.concat(message);
                            }
                            msgDataItem['id'] = msgData[i].id;
                            msgDataItem['content'] = msgData[i].content;
                            msgDb.push(msgDataItem);
                        }
                        // 如果没有聊过天，就在本地添加聊天对象
                        if(!mark){
                            let arr = [];
                            arr.push(message);
                            let messageData = {
                                id: _this.friends.id,
                                content: arr
                            }
                            msgDb.splice(_this.$store.state.userIndex - 1,0,messageData)
                        }
                        _this.$store.commit('setMsgData',msgDb);
                        _this.message = '';
                        this.scrollView();
                    }).catch((res) => {
                        console.log(res)
                    })
            },
            handleScroll(vertical, horizontal, nativeEvent) {
                if(!this.initShow && vertical.scrollTop > 100){
                    this.initShow = true;
                }
                if(this.initShow && vertical.scrollTop == 0){
                    this.isShow = true;
                    setTimeout(()=>{
                        this.isShow = false;
                    },3000)
                }
            },
            // 滚动页面到底部
            scrollView(){
                setTimeout(()=>{
                    if(this.messageList.length > 0){
                        var len = this.messageList.length
                        var id = '#s'+(len-1);
                        this.$refs["wrapper"].scrollIntoView(id, 50);
                    }
                },30)
            },
            // 保持页面在最底部
            keepBottom(){
                setTimeout(()=>{
                    let el = document.querySelector('#messageList');
                    let height = el.scrollHeight;
                    this.$nextTick(() => {
                        console.log()
                         el.scrollTop = height;
                         console.log(el.scrollTop)
                    })
                },50)
            },
            // 隐藏和显示表情
            showEmoji(){
                this.emojiShow = this.emojiShow ? false :  true;
            },
            // 判断输入是否被点击，如果被点击关闭表情
            inputText(){
                if(this.emojiShow == true){
                    this.emojiShow = false;
                }
            },
            // 添加表情到聊天框
            addEmoji(i){
                this.message = this.message + i;
                this.$refs.input.focus();
            },
            // 获取时间
            getDate(){
                var date = new Date();
                var Y = date.getFullYear();
                var M = date.getMonth()+1;
                var D = date.getDate();
                var h = date.getHours();
                var m = date.getMinutes();
                var s = date.getSeconds();
                if(M < 10){
                    M = '0'+M;
                }
                if(D < 10){
                    D = '0'+D;
                }
                if(h < 10){
                    h = '0'+h;
                }
                if(m < 10){
                    m = '0'+m;
                }
                if(s < 10){
                    s = '0'+s;
                }
                var time = Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
                return time;
            },
            // 添加页面点击监视，关闭表情框
            hideEmoji(){
                // document.body.addEventListener('click',()=>{
                //     this.emojiShow = false;
                // })
            }
        }
    }
</script>

<style scoped>
    .message-box{
        background: #eee;
        font-family: "微软雅黑";
    }
    .message-chat-list{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .message-chat-list-box li{
        /*height: 50px;*/
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
    }
    .message-chat-list-right{
        display: flex;
        width: 75%;
        text-align: right;
        padding-left: 25%;
    }
    .mclr-avator{
        width: 40px;
        height: 40px;
        padding-left: 15px;
        border-radius: 5px;
    }
    .mclr-text{
        width: 100%;
    }
    .mclr-text p {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 3px;
        padding: 8px 10px;
        background: #409EFF;
        font-size: 0.9rem;
        color: #fff;
        line-height: 20px;
        text-align: left;
        position: relative;
        box-shadow: 0 1px 5px #eee;
    }
    .right-mark{
        position: absolute;
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #409EFF;
        right: -4px;
        top: 10px;
        transform:rotate(45deg);
        -ms-transform:rotate(45deg);     /* IE 9 */
        -moz-transform:rotate(45deg);    /* Firefox */
        -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
        -o-transform:rotate(45deg); 
    }
    .message-chat-list-left{
        display: flex;
        width: 75%;
    }
    .mcll-avator{
        width: 40px;
        height: 40px;
        padding-right: 15px;
        border-radius: 5px;
    }
    .mcll-text{
        width: 100%;
    }
    ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .mcll-text p {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 3px;
        padding: 8px 10px;
        background: #fff;
        font-size: 0.9rem;
        color: #333;
        line-height: 20px;
        position: relative;
        box-shadow: 0 1px 5px #eee;
    }
    .left-mark{
        position: absolute;
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #fff;
        left: -4px;
        top: 10px;
        transform:rotate(45deg);
        -ms-transform:rotate(45deg);     /* IE 9 */
        -moz-transform:rotate(45deg);    /* Firefox */
        -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
        -o-transform:rotate(45deg); 
    }
    .message-chat-list-time{
        text-align: center;
        color: #ccc;
        font-size: 0.5rem;
        padding: 2px 0 10px 0;
    }
    :deep(.open-image){
        border-radius: 3px;
    }
    :deep(.open-footer){
        /*border-top: 1px #eaecef solid;*/
        /*padding: 10px;*/
    }
    .message-footer{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
        padding: 10px;
        border-top: 1px #eaecef solid;
    }
    .message-footer-utils{
        display: flex;
        height: 25px;
    }
    .message-footer-utils li{
        font-size: 1.15rem;
        margin-right: 15px;
        cursor: pointer;
        color: #737373;
    }
    .message-footer-input{
        font-family: '微软雅黑';
        width: 100%;
        height: 60px;
        border: none;
        outline: none;
        box-sizing: border-box;
        resize: none;
        line-height: 20px;
        margin: 5px 0;
        background: #fff;
    }
    .message-footer-send{
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .emoji{
        position: absolute;
        bottom: 155px;
        left: 0px;
        z-index: 999;
        width: 300px;
        height: 190px;
        background: #ffffff;
        border: 1px #eeeeee solid;
        box-sizing: border-box;
        padding: 0px 10px;
        box-shadow: 0 0px 8px 0 rgba(0,0,0,0.3);
        border-radius: 5px;
    }
    .emoji-box{
        width: 280px;
        height: 190px;
        overflow: scroll;
        box-sizing: border-box;
    }
    .emoji-list{
        display: block;
        display: flex;
        justify-content: space-around;
        margin: 15px 0;
    }
    .emoji-list-item{
        display: inline-block;
        font-size: 18px;
        cursor: pointer;
    }
    .load-enter-active,
    .load-leave-active {
        transition: opacity .5s inline;
    }

    .load-enter-from,
    .load-leave-to {
        opacity: 0;
    }
    .emoji-enter-active,
    .emoji-leave-active {
        transition: opacity .5s inline;
    }

    .emoji-enter-from,
    .emoji-leave-to {
        opacity: 0;
    }
</style>