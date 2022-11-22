<template>
    <div class="open-empty">
        <div class="open-empty-box">
            <slot>
                <svg t="1660110890955" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8561" width="120" height="120"><path d="M201.249 785.105L65.979 419.55c-2.684-7.252 1.02-15.305 8.27-17.989a14 14 0 0 1 4.86-0.87H323.21l38.298-135.874a22 22 0 0 1 21.175-16.032h137.894L540.528 215h106.776l12.269 33.784h283.973c9.39 0 17 7.611 17 17a17 17 0 0 1-0.637 4.612L817.784 774.665C812.561 793.199 795.652 806 776.397 806H231.26a32 32 0 0 1-30.011-20.895z" fill="#e6e6e6" fill-opacity=".461" p-id="8562"></path><path d="M646.695 215l12.254 33.784H965L808.145 806 670.328 433.104c-7.2-19.48-25.758-32.414-46.512-32.414H323l42.764-151.906h154.36L540.051 215h106.644z" fill="#e6e6e6" fill-opacity=".574" p-id="8563"></path></svg>
            </slot>
            <p class="open-empty-box-text">暂无数据</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OpenEmpty',
    data() {
        return {
          color: '#1890ff'
        }
    }
}
</script>

<style scoped>
    .open-empty{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .open-empty-box{
        margin-top: -50px;
        text-align: center;
    }
    .open-empty-box-text{
        color: #bbbbbb;
        font-size: 14px;
        text-align: center;
    }
</style>