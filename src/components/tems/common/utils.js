/**
 * 遍历dom数组,获取元素class
 * @params nodes:array 需要遍历的dom数组对象
 * @params fn:function 回调函数,获取遍历dom时需要执行的代码
*/
export function eachNodesClass(nodes,fn){
    for(let i = 0; i < nodes.length; i ++){
        if(nodes[i].tagName === undefined){
            continue;
        }
        let className = nodes[i].getAttribute('class');
        /**
         * @param className:string 当前元素的class传给回调函数当参数
         * @param nodes[i]:        当前元素对象传给回调函数当参数
         * @param i:string         当前遍历的下标位置
        */
        fn(className,nodes[i],i);
    }
}

// 检验路径是否是外部链接
const externalPath = /^[a-z]+:/i;
export function isExternalPath (path) {
    return externalPath.test(path)
}

// 效验路径是否是页面内id 暂时不写
const hashRE = /#.*$/;
export function isIdLink (path) {
    if(isExternalPath(path)){
        return path;
    }


}