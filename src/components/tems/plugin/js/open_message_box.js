// 引入创建虚拟节点和渲染方法
import { createVNode, render } from "vue";
import messBoxDom from "../components/open_message_box.vue";

// 参数options是props值，后面加了fn回调方法，如果不想用promise方式获取返回值，也可以用回调方法获取
export default (options,fn) => {
    // 用promise方法，返回插件操作后需要用到的值
    return new Promise((resole,reject)=>{
        let option = options;
        // 如果参数不是对象类型，抛出异常，中止程序
        if(typeof option != 'object'){
            throw 'ERROR: MessageBox methods Parameter is not an object ; 报错：MessageBox方法参数不是对象';
            return false;
        }
        //  调用创建虚拟节点方法
        //  第一个参数为要创建的虚拟节点即编写好的vue组件
        //  第二个参数为props的参数
        const vnode = createVNode(messBoxDom,{
            ...option,
            // 点击关闭按钮时触发
            onClose:(value) => {
                // 获取返回值，分别传送给回调函数和promise
                resole(value);
                if(fn){
                    fn(value)
                }
                // 销毁组件
                // 300毫秒留给过渡动画效果
                setTimeout(()=>{
                    render(null, document.body);
                },300)
            },
            onOk:(value) => {
                // 获取返回值，分别传送给回调函数和promise
                resole(value)
                if(fn){
                    fn(value)
                }
                // 销毁组件
                // 300毫秒留给过渡动画效果
                setTimeout(()=>{
                    render(null, document.body);
                },300)
            }
        });
        //  调用渲染方法：将虚拟节点渲染到dom中
        render(vnode, document.body);

    })
   
};

