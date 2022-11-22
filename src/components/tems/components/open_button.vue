<template>
    <div class="open-btn" >
        <button :class="type" v-if="!plain"><slot>primary</slot> </button>
        <button :class="type" v-if="plain"><slot>primary</slot></button> 
    </div>
</template>

<script>
    export default {
        name: 'OpenButton',
        props: {
            type: {
                type: String,
                default: 'default'
            },
            plain: {
                type: Boolean,
                default: false
            },
            fontSize: {
                type: String,
                default: '14px'
            },
            padd: {
                type: String,
                default: '8px 15px'
            }
        },
        data() {
            return {
                // 默认按钮样式
                defaultBtn: [
                    // 默认按钮颜色
                    {
                        borderColor: '#dcdfe6',
                        btnText: '#333333',
                        btnTextHover: '#1890ff',
                        backColor: '#ecf5ff',
                    },
                    // primary按钮颜色
                    {
                        borderColor: '#1890ff',
                        btnText: '#ffffff',
                        btnTextHover: '#ffffff',
                        backColor: '#79bbff',
                    },
                    // danger按钮颜色
                    {
                        borderColor: '#f56c6c',
                        btnText: '#ffffff',
                        btnTextHover: '#ffffff',
                        backColor: '#fab6b6',
                    },
                ],
                // plain按钮样式
                plainBtn: [
                     // 默认按钮颜色
                    {
                        borderColor: '#dcdfe6',
                        btnText: '#333333',
                        btnTextHover: '#1890ff',
                        backColor: '#ecf5ff',
                    },
                    // primary按钮颜色
                    {
                        borderColor: '#ecf5ff',
                        btnText: '#1890ff',
                        btnTextHover: '#ffffff',
                        backColor: '#1890ff',
                    },
                    // danger按钮颜色
                    {
                        borderColor: '#fef0f0',
                        btnText: '#f56c6c',
                        btnTextHover: '#ffffff',
                        backColor: '#f56c6c',
                    },
                ],
                btnText: '#333333',
                btnTextHover: '#1890ff',
                borderColor: '#dcdfe6',
                backColor: '#1890ff'
            }
        },
        created(){
        },
        mounted(){
            this.setCss();
        },
        methods:{
            setCss(){
                if(this.plain){
                    if(this.type == 'default'){
                        this.setBtnCss(this,this.plainBtn[0])
                    }else if(this.type == 'primary'){
                        this.setBtnCss(this,this.plainBtn[1])
                    }else if(this.type == 'danger'){
                        this.setBtnCss(this,this.plainBtn[2])
                    }
                }else{
                    if(this.type == 'default'){
                        this.setBtnCss(this,this.defaultBtn[0])
                    }else if(this.type == 'primary'){
                        this.setBtnCss(this,this.defaultBtn[1])
                    }else if(this.type == 'danger'){
                        this.setBtnCss(this,this.defaultBtn[2])
                    }
                }
            },
            // 设置样式
            setBtnCss(self,data){
                self.btnText = data.btnText;
                self.btnTextHover = data.btnTextHover;
                self.borderColor = data.borderColor;
                self.backColor = data.backColor;
            }
        }
    }
</script>

<style scoped>
    .open-btn{
        display: inline-block;
    }
    .open-btn button{
        border-radius: 5px;
        padding: v-bind(padd);
        font-size: v-bind(fontSize);
        cursor: pointer;
    }
    
    .default{
        border: 1px solid v-bind(borderColor);
        color: v-bind(btnText);
    }
    .default:hover{
        color:  v-bind(btnTextHover);
        border: 1px solid v-bind(btnTextHover);
    }
    .default:focus{
        color:  v-bind(btnTextHover);
        border: 1px solid v-bind(btnTextHover);
    }
    .primary{
        border: 1px v-bind(btnText) solid;
        color: v-bind(btnText);
        background: v-bind(borderColor);
    }
    .primary:hover{
        border: 1px v-bind(backColor) solid;
        color:  v-bind(btnTextHover);
        background: v-bind(backColor);
    }
    .primary:focus{
        border: 1px v-bind(backColor) solid;
        color:  v-bind(btnTextHover);
        background: v-bind(backColor);
    }
    .danger{
        border: 1px solid v-bind(btnText); 
        color: v-bind(btnText);
        background: v-bind(borderColor);
    }
    .danger:hover{
        border: 1px v-bind(backColor) solid;
        color:  v-bind(btnTextHover);
        background: v-bind(backColor);
    }
    .danger:focus{
        border: 1px solid v-bind(backColor);
        color:  v-bind(btnTextHover);
        background: v-bind(backColor);
    }
</style>