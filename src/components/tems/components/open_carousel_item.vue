<template>
    <li class="open-carousel-item" ref="opencarouselitem"><slot></slot></li>
</template>

<script>
    export default {
        name: 'OpenCarouselItem',
        mounted(){
            let el = this.$refs.opencarouselitem;
        }
    }
</script>

<style scoped>
    .open-carousel-item{
        
    }
</style>