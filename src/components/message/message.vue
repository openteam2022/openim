<template>
    <message-list @change="change"></message-list>
    <open-container v-if="chatShow">
        <open-empty ></open-empty>
    </open-container>
    <open-container v-else>
        <open-header height="65px" backColor="#fff" data-tauri-drag-region>
            <message-header></message-header>
        </open-header>
        <open-container>
            <open-main >
                <message-chat></message-chat>
            </open-main>
            <open-aside width="250px">
                <message-info></message-info>
            </open-aside>
        </open-container>
    </open-container>
</template>

<script>
    import MessageList from './message_list.vue'
    import MessageHeader from './message_header.vue'
    import MessageChat from './message_chat.vue'
    import MessageInfo from './message_info.vue'
    import open from '@/components/tems/library/open_comm.js'
    export default {
        name: 'message',
        components: {
            MessageList: MessageList,
            MessageHeader: MessageHeader,
            MessageChat: MessageChat,
            MessageInfo: MessageInfo,
        },
        data () {
            return {
                chatShow: true
            }
        },
        mounted(){
            open.on('msgDataChange',()=>{
                const _this = this;
                if(_this.chatShow){
                    // 获取聊天列表信息
                    let msgList = _this.$store.state.msgList;
                    console.log(msgList)
                    // 遍历所有消息
                    msgList.forEach(item => {
                        if(item.id == _this.$store.state.newMgUserId){
                            item.has_msg = true;
                        }
                        console.log(item)
                    })
                    // 然后重新设置聊天用户列表
                    this.$store.commit("setMsgList",msgList);
                }
            })
        },
        methods: {
            change(){
                this.chatShow = false;
            }
        }
    }
</script>

<style scoped>
</style>