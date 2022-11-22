<template>
    <Transition name="message">
        <div class="open-message" ref="openmessage" v-show="isShow">
            <i class="bi bi-check-circle" v-if="type == 'success'"></i>
            <i class="bi bi-exclamation-circle" v-else></i>
            <span>{{message}}</span>
        </div>
    </Transition>
</template>

<script>
    export default {
        name: 'OpenMessage',
        props: {
            message: {
                type: String,
                default: '这是一条信息'
            },
            type: {
                type: String,
                default: 'info'
            },
            duration: {
                type: Number,
                default: 20000
            }
        },
        data() {
            return {
                isShow: false,
                styles: [
                    {
                        color: '#333333',
                        backColor: '#eeeeee',
                        borColor: '#dddddd'
                    },
                    {
                        color: '#67C23A',
                        backColor: '#d1edc4',
                        borColor: '#b3e19d'
                    },
                    {
                        color: '#F56C6C',
                        backColor: '#fef0f0',
                        borColor: '#fde2e2'
                    },
                ],
                currentStyle: {},
                mW: '0px',
            }
        },
        mounted(){
            this.isShow = true;
            this.init();
        },
        methods: {
            init(){
                let el = this.$refs.openmessage;
                setTimeout(()=>{
                     console.log(el.offsetWidth)
                    this.mW = '-' + el.offsetWidth / 2 + 'px';
                },50)
                if(this.type == 'info'){
                    this.currentStyle = this.styles[0];
                }
                if(this.type == 'success'){
                    this.currentStyle = this.styles[1]
                }
                 if(this.type == 'danger'){
                    this.currentStyle = this.styles[2]
                }
                setTimeout(()=>{
                    this.isShow = false;
                },this.duration)
            }
        }

    }
</script>

<style scoped>
    .open-message{
        position: absolute;
        top: 20px;
        left: 50%;
        margin-left: v-bind(mW);
        padding: 12px 20px;
        background: v-bind(currentStyle.backColor);
        color: v-bind(currentStyle.color);
        border: 1px v-bind(currentStyle.borColor) solid;
        border-radius: 5px;
        font-size: 14px;
        z-index: 99999;
        max-width: 200px;
        box-sizing: border-box;
    }
    .open-message i{
        margin-right: 10px;
    }
    .message-enter-active,
    .message-leave-active {
        transition: opacity .3s linear;
    }

    .message-enter-from,
    .message-leave-to {
        opacity: 0;
    }
</style>