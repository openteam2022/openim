<template>
    <aside class="open-aside" :style="{width: width}">
        <slot></slot>
    </aside>
</template>

<script>
    export default{
        name: 'OpenAside',
        props: {
            width: {
                type: String,
                default: '220px'
            }
        },
        data(){
            return {
            }
        }
    }
</script>

<style scoped>
   .open-aside{
        height: 100%;
   } 
</style>