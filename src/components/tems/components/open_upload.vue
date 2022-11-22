<template>
    <div class="open-upload">
        <div class="open-upload-list" v-for="(item,index) in fileList" :style="{'width':width+'px','height':height+'px'}">
            <img class="open-upload-btn-img" :src="item" alt="">
            <div class="open-upload-list-cover">  
                <span>  
                    <i class="bi bi-search"></i>
                    <i class="bi bi-x-circle"></i>
                </span> 
            </div> 
        </div>
        <div class="open-upload-btn" v-if="showUpload" :style="{'width':width+'px','height':height+'px'}">
            <input type="file" class="open-upload-btn-input" :multiple="multiple" @change="changeImg">
            <span class="open-upload-btn-add" v-if="!file">
                <i class="bi bi-plus-lg"></i>
            </span>
            <img class="open-upload-btn-img" :src="file" alt="" v-if="file" v-show="!multiple">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OpenUpload',
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            limit: {
                type: Number,
                default: 6
            },
            width: {
                type: Number,
                default: 100
            },
            height: {
                type: String,
                default: 100
            }
        },
        data() {
            return {
                file:'',
                fileList:[],
                showUpload: true
            }
        },
        mounted() {

        },
        methods: {
            changeImg(e){
                const _this = this;
                let data = new FormData();
                let reader = new FileReader();
                let files = e.target.files[0];
                // 图片上传后检测事件
                if(_this.beforeFileUpload(files) === false)return false;
                // 读取图片本地预览
                reader.readAsDataURL(files);
                reader.onload = function(e){
                    console.log(_this.multiple)
                    if(!_this.multiple){
                        _this.file = this.result;
                    }else{
                        _this.fileList.push(this.result);
                        // 多图片上传时判断是否超过限制图片
                        if(_this.fileList.length >= _this.limit){
                            _this.showUpload = false;
                        }
                    }
                }

            },
            // 上传之前检测
            beforeFileUpload(files){
                this.$emit('beforeFileUpload',files)   
            }
        }
    }
</script>

<style scoped>
    .open-upload{
        display: flex;
        flex-wrap: wrap;
    }
    .open-upload-btn,.open-upload-list{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px #dcdfe6 dashed;
        border-radius: 5px;
        position: relative;
        margin-right: 10px;
        position: relative;
    }
    .open-upload-list{
        border-radius: 5px;
        border: 1px #dcdfe6 solid;
    }
    .open-upload-list:hover .open-upload-list-cover{
        display: block;
    }
    .open-upload-list-cover{
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        background: rgba(0,0,0,0.5);
        border-radius: inherit;
        display: none;
        text-align: center;
    }
    .open-upload-list-cover span{
        display: inline-block;
        margin-top: 50%;
        position: relative;
        top: -10px;
        font-size: 16px;
    }
    .open-upload-list-cover i{
        padding: 0 5px;
        color: #ffffff;
        cursor: pointer;
    }
    .open-upload-btn-input{
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        opacity: 0;
    }
    .open-upload-btn-add i{
        color: #9097a0;
        font-size: 30px;
    }
    .open-upload-btn-img{
        width: inherit;
        height: inherit;
        border-radius: inherit;
    }
</style>