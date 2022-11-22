<template>
    <input
    class="open-input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script>
    export default {
        name: 'OpenInput',
        props: {
            modelValue: {
                type: String,
                default: ''
            },
            error: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update:modelValue'],
        data() {
            return {
                borColor: [
                    {
                        defa: '#cfd4db',
                        hover: '#bbbbbb',
                        error: '#1890ff'
                    },
                    {
                        defa: '#f56c6c',
                        hover: '#f56c6c',
                        error: '#f56c6c'
                    }

                ],
                borderColor:{
                    defa: '#cfd4db',
                    error: '#1890ff'
                }
                
            }
        },
        mounted(){
            this.setColor();
        },
        methods:{
            setColor(){
                if(this.error){
                    this.borderColor = this.borColor[1];
                }else{
                    this.borderColor = this.borColor[0];
                }
            }
        }

    }
</script>

<style scoped>
    .open-input{
        background:none;
        outline:none;
        border:none;
        border: 1px v-bind(borderColor.defa) solid;
        height: 30px;
        box-sizing: border-box;
        padding: 5px 10px;
        border-radius: 4px;
        width: 100%;
        box-shadow: 0px 0px 1px v-bind(borderColor.defa);
    }
     .open-input:hover{
        border: 1px v-bind(borderColor.hover) solid;
    }
    .open-input:focus{
        border: 1px v-bind(borderColor.error) solid;
    }
</style>w