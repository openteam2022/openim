// 类型判断类

class type{
    /**
     * 判断类型是否是number
     * @param value:         需要验证的值
     * @return     :Boolean  返回true或false 
    */
    isNumber(value){
        // 先判断值是否为空
        if(!this.isNull(value)){
            throw "Error: No valid parameters detected; 报错: 未检测到有效参数； "
        }
        return typeof value === 'number'; 
    }
    /**
     * 判断类型是否是整数
     * @param value:         需要验证的值
     * @return     :Boolean  返回true或false 
    */
    isInt(value){
        // 先判断值是否为空
        if(!this.isNull(value)){
            throw "Error: No valid parameters detected; 报错: 未检测到有效参数； "
        }
        return Number.isInteger(value); 
    }
    /**
     * 判断类型是否是string
     * @param value:         需要验证的值
     * @return     :Boolean  返回true或false 
    */
    isString(value){
        // 先判断值是否为空
        if(!this.isNull(value)){
            throw "Error: No valid parameters detected; 报错: 未检测到有效参数； "
        }
        return typeof value === 'string'; 
    }
    /**
     * 判断类型是否是function
     * @param value:         需要验证的值
     * @return     :Boolean  返回true或false 
    */
    isFunction(value){
        // 先判断值是否为空
        if(!this.isNull(value)){
            throw "Error: No valid parameters detected; 报错: 未检测到有效参数； "
        }
        return typeof value === 'function'; 
    }
    /**
     * 判断类型是否是object
     * @param value:         需要验证的值
     * @return     :Boolean  返回true或false 
    */
    isObject(value){
        // 先判断值是否为空
        if(!this.isNull(value)){
            throw "Error: No valid parameters detected; 报错: 未检测到有效参数； "
        }
        return typeof value === 'object'; 
    }
     /**
     * 判断类型是否是array
     * @param value:         需要验证的值
     * @return     :Boolean  返回true或false 
    */
    isArray(value){
        // 先判断值是否为空
        if(!this.isNull(value)){
            throw "Error: No valid parameters detected; 报错: 未检测到有效参数； "
        }
        return value instanceof Array; 
        return Array.isArray(value);
    }
    /**
     * 判断值是否为空
     * @param value:         需要验证的值
     * @return     :Boolean  值为空返回false，值非空返回true 
    */
    isNull(value){
        if(value == " " || value == null || value == undefined){
            return false;
        }else{
            return true;
        }
    }
}

const openType = new type();
export default openType;
