<template>
    <router-view/>
</template>

<script>
    import socket from '@/common/socket.js'
    import message from '@/common/message.js'
    export default {
        name: 'App',
        created () {
            // 初始化socket
            socket.init({
                onopen: (msg,data) =>{
                    // console.log(data)
                },
                onmessage: (data) => {
                    // console.log(data)
                    message(data,this);
                },
                onclose: (data) => {
                    console.log(data)
                }
            })
        },
        mounted(){
            // 获取朋友列表和历史聊天记录
            // this.getFriends();
        },
        methods: {
              // 获取好友列表
            getFriends(){
                const _this = this;
                this.$http.post('/api/friendlist/getfriends',{
                    b:'bugu',
                    token:_this.$store.state.token,
                    id:_this.$store.state.userInfo.id
                }).then((res) => {
                    const message = res.data.message;
                        switch(res.data.status){
                            case 0:
                                showInfo(message);
                                break;
                            case 1:
                                showInfo(message);
                                goUrl("../login/login");
                                break;
                            case 2:
                                _this.$store.commit('setMsgList',message);
                                var msgMiddleData = [];
                                var friendsName = [];
                                var friendsImg = [];
                                var friendsId = [];
                                var msgData = [];
                                for(var i = 0;i<message.length;i++){
                                    friendsName.push(message[i]['name']);
                                    friendsImg.push(message[i]['imgurl']);
                                    friendsId.push(message[i]['friend_id']);
                                    _this.getMessage(message[i]['friend_id'],msgData);
                                }
                                _this.$store.commit('setMsgData',msgData);
                                msgMiddleData.push(friendsName);
                                msgMiddleData.push(friendsImg);
                                msgMiddleData.push(friendsId);
                                _this.$store.commit('setMsgMiddleData',msgMiddleData);
                                break;
                            }
                }).catch((res)=>{

                })
            },
            // 获取好友聊天
            getMessage(friends_id,msgData){
                const _this = this;
                this.$http.post('/api/message/getmessage',{
                    b:'bugu',
                    token:_this.$store.state.token,
                    id:_this.$store.state.userInfo.id,
                    friends_id:friends_id,
                }).then((res) => {
                    const message = res.data.message;
                    switch(res.data.status){
                        case 0:
                            alert(message);
                            break;
                        case 1:
                            alert(message);
                            goUrl("../login/login");
                            break;
                        case 2:
                            var msg = [];
                            msg['id'] = friends_id;
                            if(message == "none"){
                                msg['content'] = [];
                            }else{
                                msg['content'] = message;
                            }
                            msgData.push(msg);
                            break;
                    }
                }).catch(()=>{

                })
            },
        }
    }
</script>

<style>
    #app {
        font-size: 10px;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        user-select: none;
        overflow: hidden;
        min-width: 800px;
        min-height: 600px;
    }
</style>
