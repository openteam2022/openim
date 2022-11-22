<template>
    <Teleport to="body">
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
    </Teleport>
</template>

<script>
    export default {
        name: 'OpenLoading',
        data(){
            return {
                value: "loading...",
                isShow:false
            }
        },
        mounted(){
            this.isShow = true;
        },
        beforeUnmount(){
            this.isShow = false;
        }
    }
</script>

<style scoped>
    .open-loading{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(200,200,200,0.3);
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
        height: 40px;
        width: 40px;
        border: 5px #dddddd solid;
        border-bottom: 5px #ccc solid;
        border-radius: 50%;
        animation: load 1s linear infinite;
        margin-bottom: 10px;
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