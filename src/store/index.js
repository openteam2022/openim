import { createStore } from 'vuex'

export default createStore({
        state: {
        userInfo:{
            'id':'1',
            'img': require('@/assets/one.png'),
            'name':'客服'
        },//用户信息
        token:'',
        msgData: [
            {
                id: '2',
                content: [
                    {
                        fromId: '1',
                        sendId: '2',
                        message: '吃饭了吧',
                        type:'text',
                        time: '2022-11-12 3:00:00'
                    }
                ]
            },
        ],//聊天用户记录
        msgList: [
            {
                id:'2',
                img: require('@/assets/logo.png'),
                name:'用户',
                time: '12::33:24',
                message:'吃饭了吧',
                has_msg: false

            },
            {
                id:'3',
                img: require('@/assets/logo.png'),
                name:'用户2',
                time: '',
                message:'',
                has_msg: false

            }
        ],//
        userList:[
        
        ],//用户列表
        /**
         * //用于聊天列表和聊天页面好友信息数据中转的信息
         * 里面有3个数组，分别是friendsName[],friendsImg[],friendsId[]
         * 用来储存好友列表对应的name,img,id
         * 使用时，获取好友数组列表的下标，用下标分别在3个数组中获取对应的好友信息
        */
        msgMiddleData:[
            ['用户','用户二'],
            [`${require('@/assets/logo.png')}`,`${require('@/assets/logo.png')}`],
            ['2','3']
        ],
        userIndex:-1,//选中聊天列表的某个用户时向聊天页面传送的当前聊天用户下标，方便获取聊天记录
        newMgUserId: '',//来新消息的用户
        nowMgUserId:'',//当前聊天的用户
    },
    mutations: {
        setMsgData(state,data){
            state.msgData = data;
        },
        setMsgList(state,data){
            state.msgList = data;
        },
        setUserIndex(state,data){
            state.userIndex = data;
        },
        //设置聊天中间信息数据
        setMsgMiddleData(state,data) {
          state.msgMiddleData = data;
        },
        //设置聊天中间信息数据
        setUserList(state,data) {
          state.userList = data;
        }
    },
})
