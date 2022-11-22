<template>
    <div class="open-footer" :style="{'height':height,'background':backColor}">
        <slot></slot>
    </div>
</template>

<script>
    export default{
        name: 'OpenFooter',
        props:{
            height: {
                type: String,
                default: '55px'
            },
            backColor:{
                type: String,
                default: ""
            }
        },
    }
</script>

<style scoped>
   .open-footer{
        width: 100%;
        box-sizing: border-box;
   } 
</style>