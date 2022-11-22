<template>
    <Transition name="dialog">
        <div class="open-dialog" ref="opendialog" v-show="modelValue">
            <div class="open-dialog-box">
                <div class="open-dialog-box-header">
                    <div><slot name="title">标题</slot></div><span class="icon"><i class="bi bi-x" @click="close"></i></span>
                </div>
                <div>
                    <slot></slot>
                </div>
                <div>
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
    import Open from '../library/open_comm.js'
    export default {
        name: 'Opendialog',
        props: {
            onOk: {
                type: Function,
                default: function(value){}
            },
            onClose: {
                type: Function,
                default: function(value){}
            },
            width: {
                type: String,
                default: '200'
            },
            modelValue: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update:modelValue'],
        data() {
            return {
                dialogWidth: ''
            }
        },
        mounted(){
            if(this.width.match(/%/)){
                this.dialogWidth = this.width;
            }else if(this.width.match(/px/)){
                this.dialogWidth = this.width;
            }else{
                this.dialogWidth = this.width + 'px';
            }
            this.$emit('update:modelValue',this.modelValue)
            Open.on('show',()=>{
                console.log(this.modelValue)
            })
        },
        methods: {
            close(){
                this.$emit('update:modelValue',false)
            }
        }

    }
</script>

<style scoped>
    .open-dialog{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .5);
        z-index: 99999;
        overflow: auto;
    }
    .open-dialog-box{
        width: v-bind(dialogWidth);
        box-shadow: 0px 0px 7px rgba(0, 0, 0, .1);
        background: #ffffff;
        border-radius: 3px;
        padding: 10px 20px;
    }
    .open-dialog-box-header{
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #333333;
    }
    .icon{
        font-size: 20px;
        cursor: pointer;
    }
    .dialog-enter-active,
    .dialog-leave-active {
        transition: opacity .3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .dialog-enter-from,
    .dialog-leave-to {
        opacity: 0;
    }
</style>