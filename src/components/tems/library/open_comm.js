// 全局通信类
/**
 * 全局通信类
 * 发布订阅模式
 * 监听触发自定义事件
*/
class comm{
    constructor(){
        // 定义保存事件和方法的对象
        this.list = {};
    }
    /**
     * 订阅
     * @param name:string 事件名字
     * @param fn:function 回调函数
    */
    on(name,fn){
        // 此处建议自己加判断参数类型，name是不是字符串类型，fn是不是function类型
        // code...
        if(typeof fn !== 'function'){
            throw 'Error: '+fn +'is not function;报错： '+fn+'不是一个方法；';
            return false;
        }
        // 判断对象是否已有相同名字的事件
        if(this.list[name]){
            // 已有同名事件，则把回调方法push到该方法名下的数组里
            this.list[name].push(fn)
        }else{
            // 没有同名事件，则把name当做对象的key值，value是数组形式，回调方法是数组下的值
            this.list[name] = [fn]; 
        }
    }
    // 移除
    off(name,fn){
        let nameArr = this.list[name] || [];
        if(nameArr){
            let index = nameArr.findIndex(fn);
            if(index > -1){
                nameArr.splice(index,1);
            }
        }
    }
    /**
     * 发布
     * @param name:string 事件名字
     * @param parsm:string|number|array|object 需要传递的参数
    */
    emit(name,param){
        // 此处建议自己加判断参数类型，name是不是字符串类型
        // code...

        // 如果对象里有当前事件名则赋值事件对应的函数数组，没有则赋值空数组
        let nameArr = this.list[name] || [];
        // 如果数组下有回调函数
        if(nameArr){
            // 则遍历执行回调方法，并把参数传递给方法执行
            nameArr.forEach(fn=>{
                fn(param);
            })
        }
    }
}

const open = new comm();
export default open;