//      引入创建虚拟节点和渲染方法
import { createVNode, render } from "vue";
import loading from "../components/open_loading.vue";

//      定义定时器：一定时间后清除
let timer = null;

export default (options) => {
    let option = options || {};
    // 检测参数是否是object类型，如果不是抛出错误，终止程序运行。
    if(option && typeof option != 'object'){
        if(option == 'clear'){
            // 手动清除
            timer&&clearTimeout(timer);
            setTimeout(()=>{
                render(null,document.body)
            },300)
            return false;
        }else{
            throw 'ERROR: Parameter error ; 报错：参数不是对象,也不是已定义的字符串值';
            return false;
        }
    }
    // 这里duration给一个默认值，是用来清除创建的div容器
    let duration = option.duration == true ? option.duration : 3000;
    //      调用创建虚拟节点方法
    //      第一个参数为要创建的虚拟节点即编写好的vue组件
    //      第二个参数为props的参数
    const vnode = createVNode(loading);
    //      调用渲染方法：将虚拟节点渲染到dom中
    render(vnode, document.body);
    //      开启定时器，若原先存在则先进行清除
    timer&&clearTimeout(timer);
    
    timer = setTimeout(() => {
        render(null, document.body);
         //加300毫秒是因为元素隐藏的动画时间是300毫秒
    }, duration + 300);
};

