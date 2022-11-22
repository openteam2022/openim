<template>
    <Transition name="fade">
        <div class="open-loading" v-show="isShow">
            <div >
                <div class="open-loading-style">
                    <div class="olms-items">
                    </div>
                </div>
                <!-- <p class="open-loading-text">{{value}}</p> -->
            </div>
        </div>
    </Transition> 
</template>

<script>
    export default {
        name: 'OpenLoadBar',
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                value: "loading...",
                
            }
        },
    }
</script>

<style scoped>
    .open-loading{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333333;
    }
    .open-loading-style{
        text-align: center;
    }
    .open-loading-text{
        color: #999999;
    }
    .olms-items{
        margin: 0 auto;
        height: 25px;
        width: 25px;
        border: 3px #dddddd solid;
        border-bottom: 3px #ccc solid;
        border-radius: 50%;
        animation: load 1s linear infinite;
    }
    @keyframes load {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s inline;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>