<template>
    <div class="open-header" :style="{'height':height,'background':backColor,'padding':padd}"><slot></slot></div>
</template>

<script>
    export default{
        name: 'OpenHeader',
        props:{
            height: {
                type: String,
                default: '55px'
            },
            backColor:{
                type: String,
                default: ""
            },
            positions: {
                type: String,
                default: 'default'
            },
            padd:{
                type: String,
                default: '0 20px'
            }
        },
        data () {
            return {
                ps: 'inherit'
            }
        },
        mounted() {
            if(this.positions == "default"){
                this.ps = 'inherit'
            }
            if(this.positions == 'top'){
                this.ps = 'sticky'
            }
        }
    }
</script>

<style scoped>
   .open-header{
        position: v-bind(ps);
        top: 0;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px #eaecef solid;
   } 
</style>