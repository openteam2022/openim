<template>
    <div class="index">
        <!-- <open-aside width="200px">
            <ul class="menu">
                <li class="menu-item"><i class="bi bi-house-door-fill"></i></li>
                <li class="menu-item"><i class="bi bi-chat-square-dots-fill"></i></li>
                <li class="menu-item"><i class="bi bi-clock-fill"></i></li>
                <li class="menu-item"><i class="bi bi-person-lines-fill"></i></li>
            </ul>
        </open-aside> -->
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'index'
    }
</script>

<style scoped>
    .index{
        width: 100%;
        height: 100%;
        display: flex;
    }
    .menu{
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
        background: #186bff;
    }
    .menu-item{
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }
    .menu-item i{
        font-size: 1.5rem;
    }
    .menu-item:hover i{
        color: #ffffff;
    }
    .menu-item:hover{
        background: #38404b;
    }
    
</style>