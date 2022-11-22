<template>
    <div class="open-form">
        <form>
            <slot></slot>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'OpenForm',
        props: {
            labelWidth: {
                type: Number,
                default: 200
            }
        },
        data() {
            return {
                lW: '0px'
            }
        },
        mounted(){
            this.lW = this.labelWidth + 'px';
        }
    }
</script>

<style scoped>
    .open-form{
        width: 100%;
    }
    :deep(.open-form-item-label){
        width: v-bind(lW);
        text-align: right;
    }
</style>