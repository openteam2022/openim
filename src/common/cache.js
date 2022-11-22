//localStorage方法
export default function cache () {
    this.setVaule = (key,value)=>{
        localStorage.setItem(key, value);
    };
    this.getValue = key=>{
        return localStorage.getItem(key);
    }
}