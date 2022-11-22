// 引入创建虚拟节点和渲染方法
import { createVNode, render } from "vue";
import messBox from "../components/open_message.vue";

// 定时器标识
let time = null;

// options是调用时后面跟的参数，组件里props的值
export default (options) => {
        let option = options;
        // 检测参数是否是object类型，如果不是抛出错误，终止程序运行。
        if(typeof option != 'object'){
            throw 'ERROR: Message methods Parameter is not an object ; 报错：Message方法参数不是对象';
            return false;
        }
        // 这里duration给一个默认值，是用来清除创建的div容器
        let duration = option.duration || 2000;
         // 调用创建虚拟节点方法
        //  第一个参数为要创建的虚拟节点即编写好的vue组件
        //  第二个参数为props的参数
        const vnode = createVNode(messBox,{...option});
        //  调用渲染方法：将虚拟节点渲染到dom中
        render(vnode, document.body);

        // 如果已经有定时器先清理一遍
        clearTimeout(time);

        // 清理div容器
        time = setTimeout(() => {
            render(null,document.body)
            //加300毫秒是因为元素隐藏的动画时间是300毫秒
        },duration + 300)
   
};

