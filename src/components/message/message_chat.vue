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
                <textarea rows="3" maxlength="120" v-model="message" class="message-footer-input" placeholder="???????????????" ref="input" @focus="inputText" style="color: #333333;font-size: 0.85rem;" @keyup.enter="send"></textarea>
                <div class="message-footer-send">
                    <p style="color: #999;">open team ??????????????????</p>
                    <open-button type="primary" fontSize="0.7rem" padd="5px 15px" @click="send">??????</open-button>
                </div>
            </div>
            <!-- ?????? -->
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
                isShow: false,//loading???
                initShow: false,//loading????????????
                emojis: emojiList.emoji,//emoji??????
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
                        /** ??????????????????????????? ?????????????????????????????????????????????????????????????????????????????? */
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
            // ?????????????????????????????????????????????????????????????????????????????????
            let index = _this.$store.state.userIndex;
            // ???????????????????????????
            let msgMiddleData = _this.$store.state.msgMiddleData;
            // ???????????????????????????id,name,img
            _this.friends = {
                id: msgMiddleData[2][index],
                img: msgMiddleData[1][index],
                name: msgMiddleData[0][index]
            }
            // ??????????????????????????????
            let msgData = _this.$store.state.msgData;
            msgData.forEach( item => {
                if(item.id == _this.friends.id){
                    _this.messageList = item.content;
                }
            })

            // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
            let msgList = _this.$store.state.msgList;
            msgList.forEach( item => {
                if(item.id == _this.friends.id){
                    item.has_msg = false;
                }
            })
            // ?????????????????????msgList,??????????????????msgList,??????????????????
            this.$store.commit("setMsgList",msgList);
        },
        mounted() {
            this.scrollView()
            this.hideEmoji();
        },
        computed: {
            // ????????????????????????
            listenMsgData(){
                return this.$store.state.msgData;
            },
            // ??????????????????????????????
            listenUserIndex(){
                return this.$store.state.userIndex;
            }
        },
        watch:{
            // ????????????????????????
            listenMsgData(n,o){
                const _this = this;
                // ?????????????????????
                let msgData = n;
                let oldMsgData = o;
                _this.messageList = [];
                // ????????????????????????
                let msgList = _this.$store.state.msgList;
                // ??????????????????
                msgData.forEach( item => {
                    // ??????????????????????????????id???????????????????????????????????????
                    if( _this.friends.id && item.id == _this.friends.id ){
                       _this.messageList = item.content;
                    }else{
                        // ????????????????????????????????????????????????????????????????????????????????????
                        msgList.forEach( items => {
                            // ?????????????????????????????????,??????????????????
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

                // ????????????????????????????????????
                _this.$store.commit("setMsgList",msgList);
                // ??????????????????
                _this.scrollView();

            },
            listenUserIndex(n,o){
                // ?????????????????????id,???????????????
                const _this = this;
                // ???????????????????????????????????????????????????????????????
                _this.message = '';
                // ??????????????????????????????
                let msgList = _this.$store.state.msgList;
                // ???????????????
                _this.initShow = false;
                // ??????????????????????????????
                let msgMiddleData = _this.$store.state.msgMiddleData;
                // ????????????????????????????????????
                _this.friends = {
                    id: msgMiddleData[2][n],
                    img: msgMiddleData[1][n],
                    name: msgMiddleData[0][n]
                }

                _this.$store.state.nowMgUserId = _this.friends.id;
                // ???????????????????????????????????????
                msgList[n]['has_msg'] = false;
                // ??????????????????????????????
                let msgData = _this.$store.state.msgData;
                // ??????????????????????????????????????????
                let mark = false;
                msgData.forEach( item => {
                    if(item.id == _this.friends.id){
                        // ????????????????????????mark??????true
                        mark = true;
                        if(!item.content){
                            _this.messageList = [];
                        }else{
                            _this.messageList = item.content;
                        }
                    }
                })
                // ???????????????????????????????????????????????????
                if(!mark){
                    _this.messageList = [];
                }
                this.$store.commit("setMsgList",msgList);
                // ????????????????????????
                if(_this.messageList.length > 0){
                     _this.scrollView();
                }
            }
        },
        methods: {
            send(){
                const _this = this;
                // ???????????????????????????????????????????????????
                if(this.message == ''){
                    this.$message({message:'??????????????????',type:'danger'})
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
                // ??????axios??????ajax????????????client_id??????????????????uid??????
                this.$http.post('http://www.openmi.com/index.php/kefu/connect/send',{data:JSON.stringify(message)})
                    .then((res) => {
                        // ??????????????????????????????????????????
                        let msgData = _this.$store.state.msgData;
                        let msgDb = [];
                        // ??????????????????false,?????????????????????????????????
                        let mark = false;
                        for(let i = 0;i < msgData.length;i++){
                            let msgDataItem = [];
                            if(msgData[i].id == _this.friends.id){
                                // ????????????????????????????????????mark?????????true
                                mark = true;
                                msgData[i].content = msgData[i].content.concat(message);
                            }
                            msgDataItem['id'] = msgData[i].id;
                            msgDataItem['content'] = msgData[i].content;
                            msgDb.push(msgDataItem);
                        }
                        // ??????????????????????????????????????????????????????
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
            // ?????????????????????
            scrollView(){
                setTimeout(()=>{
                    if(this.messageList.length > 0){
                        var len = this.messageList.length
                        var id = '#s'+(len-1);
                        this.$refs["wrapper"].scrollIntoView(id, 50);
                    }
                },30)
            },
            // ????????????????????????
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
            // ?????????????????????
            showEmoji(){
                this.emojiShow = this.emojiShow ? false :  true;
            },
            // ?????????????????????????????????????????????????????????
            inputText(){
                if(this.emojiShow == true){
                    this.emojiShow = false;
                }
            },
            // ????????????????????????
            addEmoji(i){
                this.message = this.message + i;
                this.$refs.input.focus();
            },
            // ????????????
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
            // ??????????????????????????????????????????
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
        font-family: "????????????";
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
        -webkit-transform:rotate(45deg); /* Safari ??? Chrome */
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
        -webkit-transform:rotate(45deg); /* Safari ??? Chrome */
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
        font-family: '????????????';
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