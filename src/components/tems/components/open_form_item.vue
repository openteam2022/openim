<template>
    <div class="open-form-item">
        <p class="open-form-item-label"><i v-if="required">*</i>{{label}}</p>
        <div class="open-form-item-main" >
            <div>
                <slot></slot>
            </div>
            <div class="ofim-error">{{error}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OpenForm',
        props: {
            label: {
                type: String,
                default: '表单'
            },
            required: {
                type: Boolean,
                default: false
            },
            error: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
            }
        },
        methods:{
           
        }
    }
</script>

<style scoped>
    .open-form-item{
        width: 100%;
        display: flex;
        align-items: top;
    }
    .open-form-item-label{
       box-sizing: border-box;
       height: 32px;
       line-height: 32px;
       padding-right: 12px;
       color: #555555;
       font-size: 14px;
    }
    .open-form-item-label i{
       color: #f56c6c;
       margin-top: 5px;
       margin-right: 5px;
    }
    .open-form-item-main{
        width: 100%;
    }
    .ofim-error{
        font-size: 12px;
        color: #f56c6c;
        padding: 1px 0;
    }
</style>