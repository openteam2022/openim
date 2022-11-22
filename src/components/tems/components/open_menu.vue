<template>
    <div class="open-menu">
        <ul class="open-menu-list">
            <slot>
                <open-sub-menu>
                    <template #title>
                        <open-icon><i class="bi bi-house-fill"></i></open-icon>
                        <span>菜单一</span>
                    </template>
                    <open-menu-item>哈哈哈</open-menu-item>
                    <open-sub-menu >
                        <template #title><span>菜单1-2</span></template>
                        <open-menu-item>菜单1-2子菜单</open-menu-item>
                    </open-sub-menu>
                </open-sub-menu>
                <open-menu-item>
                    <open-icon><i class="bi bi-gear-fill"></i></open-icon>
                    <span>菜单二</span>
                </open-menu-item>
                <open-sub-menu>
                    <template #title>
                        <open-icon><i class="bi bi-box-fill"></i></open-icon>
                        <span>菜单三</span>
                    </template>
                    <open-menu-item>哈哈哈</open-menu-item>
                    <open-sub-menu >
                        <template #title>
                            <span>菜单3-1</span>
                        </template>
                        <open-menu-item>菜单3-1子菜单</open-menu-item>
                    </open-sub-menu>
                </open-sub-menu>
            </slot>
        </ul>
    </div>
</template>

<script>
    import Open from '../library/open_comm.js'
    export default{
        name: 'OpenMenu',
        data(){
            return{
                options: '',
                time:'10s',
                timeItem: '10s',
                menu: [
                    {title:'首页',icon: 'bi bi-house-door-fill' ,link: ''},
                    {
                        title:'商品管理',
                        icon: 'bi bi-bag-fill',
                        isShow: false,
                        child: true,
                        items: [
                            {
                                title:'首页',
                                link: ''
                            },
                            {
                                title:'首页',
                                link: ''
                            },
                        ] 

                    },
                    {
                        title:'权限认证',
                        icon: 'bi bi-shield-lock-fill',
                        isShow: false,
                        child: true,
                        items: [
                            {
                                title:'管理员',
                                link: '',
                            },
                            {
                                title:'身份',
                                child: true,
                                isShow: false,
                                items: [
                                    {
                                        title:'角色',
                                        link: '' 
                                    },
                                    {
                                        title:'配置',
                                        link:''
                                        
                                    },
                                ] 
                            },
                        ] 

                    },
                    {
                        title:'权限认证',
                        icon: 'bi bi-shield-lock-fill',
                        child: true,
                        isShow: false,
                        items: [
                            {
                                title:'管理员',
                                link: '',
                            },
                            {
                                title:'身份',
                                child: true,
                                isShow: false,
                                items: [
                                    {
                                        title:'角色',
                                        link: '' 
                                    },
                                    {
                                        title:'配置',
                                        link:''
                                        
                                    },
                                ] 
                            },
                        ] 

                    },

                ]
            }
        },
        methods:{
           
        }
    }
</script>

<style scoped>
    .open-menu{
        width: 100%;
        box-sizing: border-box;
        user-select:none;
    }
    .open-menu-list{
        font-size: 15px;
    }
   
</style>