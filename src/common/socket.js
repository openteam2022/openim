import {socketData} from '@/common/config.js'
/**
 * websocket
*/
const socket = {
    heartbeat_timer: null, // 用于心跳检测
    active_close: socketData.active_close, // 是否主动关闭
    init: (params) => {
        socket.ws = new WebSocket(socketData.ws);
        socket.ws.onopen = (data) => {
            socket.heartbeat()
            if (params.onopen) {
                params.onopen('websocket已连接', data)
            }
        }
        socket.ws.onmessage = (data) => {
            if (params.onmessage) {
                params.onmessage(data.data)
            }
        }
        socket.ws.onclose = () => {
            clearInterval(socket.heartbeat_timer)
            if (socket.active_close) {
                if (params.onclose) {
                    params.onclose('连接已手动关闭')
                }
            } else {
                socket.reconnect(params)
                if (params.onclose) {
                    params.onclose('连接已关闭, 正在重连')
                }
            }
        }
        socket.ws.onerror = () => {
          clearInterval(socket.heartbeat_timer)
          if (params.onerror) {
            params.message('连接发生错误！等待五秒后重连')
            setTimeout(() => {
              socket.reconnect(params)
            },5000)
          }
        }
    },
    heartbeat: () => {
        // console.log('执行心跳')
        if (socket.heartbeat_timer) {
            clearInterval(socket.heartbeat_timer)
        }
        socket.heartbeat_timer = setInterval(function (){
            socket.ws.send('heartbeat')
        },10000)
    },
    reconnect: (params) => {
        // console.log('执行重连')
        socket.active_close = false
        if (socket.ws) {
            socket.ws.close()
        }
        socket.init(params)
    },
    close: () => {
        // console.log('手动关闭，无需重连')
        clearInterval(socket.heartbeat_timer)
            socket.active_close = true
            socket.ws.close()
    }
}
export default socket;