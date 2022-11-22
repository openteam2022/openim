<template>
    <div class="open-section">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'OpenSection',
        props: {
            gutter: {
                type: String,
                default: '10px'
            }
        }

    }
</script>

<style scoped>
    .open-section{
        max-width: 1080px;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 0 v-bind(gutter);
    }
</style>