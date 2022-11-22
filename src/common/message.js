 import open from '@/components/tems/library/open_comm.js'
 import Message from '@/components/tems/plugin/js/open_message.js'
 // 服务端主动推送消息时会触发这里的onmessage
export default function message(data,self){
    const _this = self;
    // json数据转换成js对象
    let datas = eval("("+data+")");
    let type = datas.type;
    switch(type){
        // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
        case 'init':
            // 利用axios发起ajax请求，将client_id发给后端进行uid绑定
            _this.$http.post('http://www.openmi.com/index.php/kefu/connect/bind',{
                client_id: datas.client_id,
                id:_this.$store.state.userInfo.id
            }).then((res) => {
                
            }).catch((res) => {
                console.log(res)
            })
            break;
        case 'text':
            // 判断当前的用户是否已为好友，默认不是好友
            let mark = false;
            let msgData = _this.$store.state.msgData;
            let msgDb = [];
            for(let i = 0;i<msgData.length;i++){
                var msgDataItem = [];
                if(msgData[i].id == datas.sendId){
                    // 如果聊天记录有当前好友记录,mark赋值为true
                    mark = true;
                    // 设置当前发消息的用户
                    _this.$store.state.newMgUserId = msgData[i].id;
                    msgData[i].content = msgData[i].content.concat(datas);
                }
                msgDataItem['id'] = msgData[i].id;
                msgDataItem['content'] = msgData[i].content;
                msgDb.push(msgDataItem);
            }
            // 如果没有当前用户的记录，当前为新用户，新增本地数据
            if(!mark){
                let id = '5555';//根据当前浏览器环境随机生成id
                let arr = [];
                arr.push(datas);
                let messageData = {
                    id: id,
                    content: arr
                }
                msgDb.push(messageData)
                // 增加中间信息
                let msgMiddleData = _this.$store.state.msgMiddleData;
                msgMiddleData[0].push(id)
                msgMiddleData[1].push(`${require('@/assets/logo.png')}`)
                msgMiddleData[2].push(id)
                _this.$store.commit('setMsgMiddleData',msgMiddleData);
                // 增加聊天列表信息
                let msgList = _this.$store.state.msgList;
                let msgListItem = {
                    id: id,
                    name: id,
                    img: require('@/assets/logo.png'),
                    time :'2022-11-09 3:00:31',
                    message: datas.message,
                    has_msg: true
                }
                msgList.push(msgListItem);
                _this.$store.commit('setMsgList',msgList);
            }
            
            _this.$store.commit('setMsgData',msgDb);

            open.emit('msgDataChange');
            break;
        case 'image':
            console.log('图片')
            break;
        // case 'close':
        //     Message({message:`${datas.client_id} 下线了`,type:'danger'})
        //     break;
        // case 'login':
        //     Message({message:`${datas.client_id} 上线了`,type:'success'})
        //     break;
    }
}
