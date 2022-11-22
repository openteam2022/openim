<template>
    <div class="open-adnav">
        <div class="open-adnav-logo">
            <a :href="logo.link">{{logo.text}}</a>
        </div>
        <ul class="open-adnav-menu" v-if="navbar.use">
           <!--  <li v-if="navbar.input == true" class="open-adnav-input">
                <input class="open-adnav-input-box" type="text">
                <span class="icon-search">
                   <i class="bi bi-search"></i>
                </span>
            </li> -->
            <li v-if="navbar.size">
                <p class="open-adnav-menu-title" >
                   <svg t="1660033861382" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4010" width="18" height="18"><path d="M0 0h256v51.2H0z" fill="" p-id="4011"></path><path d="M51.2 0v256H0V0zM1024 0v256h-51.2V0z" fill="" p-id="4012"></path><path d="M1024 51.2h-256V0h256zM1024 1024h-256v-51.2h256z" fill="" p-id="4013"></path><path d="M972.8 1024v-256h51.2v256zM0 1024v-256h51.2v256z" fill="" p-id="4014"></path><path d="M0 972.8h256v51.2H0z" fill="" p-id="4015"></path></svg>
                </p>
            </li>
            <li v-if="navbar.message">
                <p class="open-adnav-menu-title" >
                    <svg t="1660033362373" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2292" width="18" height="18"><path d="M825.11398 676.695821l-39.805636-0.199028 0.511787-91.439234c0.710815-131.415466 0.76768-142.162988 0.76768-179.125364a274.602027 274.602027 0 1 0-549.204054 0c0 37.502596 0.341191 267.266417 0.341191 269.569457h-39.805637c0-2.30304-0.341191-232.095294-0.341191-269.626322a314.407663 314.407663 0 1 1 628.815327 0c0 36.962377 0 47.709899-0.76768 179.125364z" p-id="2293"></path><path d="M859.943912 891.276635H164.056088a54.448424 54.448424 0 0 1-47.055949-81.857449l80.805442-138.665778v-23.627488l39.805637 0.142163v34.318145l-86.150771 147.849507a14.642788 14.642788 0 0 0 12.652506 22.006831h695.830959a14.642788 14.642788 0 0 0 12.652506-22.006831l-86.008607-147.593614-1.137304-32.924948 39.805636-1.393197 0.796113 22.916674 80.947605 138.950104a54.419992 54.419992 0 0 1-47.027516 81.857448z" p-id="2294"></path><path d="M511.985784 1024a152.796779 152.796779 0 0 1-152.597751-152.626184h39.805636a112.820547 112.820547 0 1 0 225.612662 0h39.805636a152.796779 152.796779 0 0 1-152.626183 152.626184zM450.713536 134.571484a13.363321 13.363321 0 0 1-19.902818-4.918839 87.913592 87.913592 0 0 1-6.397335-17.656643 91.410801 91.410801 0 0 1-2.644231-21.722505 90.273497 90.273497 0 1 1 177.902762 21.836235 93.827572 93.827572 0 0 1-2.843259 9.496488c-0.483354 1.307899-1.023574 2.644232-1.563793 3.952131a13.363321 13.363321 0 0 1-19.504762 5.686519L564.443926 124.108288a13.505484 13.505484 0 0 1-5.1463-16.235013 49.302124 49.302124 0 0 0 1.620658-5.288463 50.467861 50.467861 0 1 0-99.514091-12.226017 51.178676 51.178676 0 0 0 1.478495 12.169152 49.870776 49.870776 0 0 0 2.84326 8.273886 13.24959 13.24959 0 0 1-4.463918 16.064417z" p-id="2295"></path></svg>
                </p>
            </li>
            <li v-for="item in navbar.nav">
                <p class="open-adnav-menu-title" v-if="!item.isOptions">{{item.text}}</p>
                <p class="open-adnav-menu-title" v-if="item.isOptions">
                    <img src="@/assets/logo.png" alt=""/>
                    <span>{{item.text}}</span>
                </p>
                <ul v-if="item.isOptions">
                    <li v-for="i in item.items">{{i.text}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'OpenAdminNav',
        props: {
            // logo配置
            logo: {
                type: Object,
                default: {
                    link: '#',
                    text: 'Open Im'
                }
            },
            navbar: {
                type: Object,
                default: {
                    use: true,
                    input: true,
                    message: true,
                    size: true,
                    nav: [
                        // // {text: '首页',link: ''},
                        // {text: '产品',link: ''},
                        {
                            text: 'admin',
                            img: '../assets/logo.png',
                            isOptions: true,
                            items:[
                                {text: '个人中心',link: ''},
                                {text: '退出登录',link: ''},
                            ]
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .open-adnav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #333333;
        width: 100%;
        height: 100%;
    }
    a{
        text-decoration:none;
        color:#000;
    }
    .open-adnav-menu{
        height: inherit;
        font-size: 13px;
        margin: 0;
    }
    .open-adnav-menu>li{
        display: inline-block;
        padding: 0 15px;
        height: 100%;
        position: relative;
        vertical-align: top;
    }
    .open-adnav-menu>li:hover ul{
        display: block;
    }
    .open-adnav-menu>li:hover p,.open-adnav-menu>li:hover a{
        color: #1890ff;
    }
    .open-adnav-input{
        
    }
    ul{
        list-style: none;
    }
    .open-adnav-input-box{
        background:none;
        outline:none;
        border:none;
        height: 32px;
        width: 180px;
        box-sizing: border-box;
        padding: 0 15px 0 30px;
        border: 1px #cfd4db solid;
        border-radius: 17px;
        position: relative;
        top: 11px;
    }
    .icon-search{
        position: absolute;
        top: 19px;
        left: 24px;
        color: #cfd4db;
    }
    .open-adnav-input-box:focus{
        border: 1px #1890ff solid;
    }
    .open-adnav-menu-title{
        display: block;
        height: 100%;
        width: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 0 auto;
    } 
    .open-adnav-menu-title img{
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin-right: 10px;
    }
    .open-adnav-menu>li>ul{
        position: absolute;
        top: 55px;
        right: 0;
        border: 1px #dcdfe6 solid;
        background: #ffffff;
        width: 100px;
        padding: 8px 0;
        display: none;
        border-radius: 5px;
        box-shadow: 0px 2px 10px #dddddd;
    }
    .open-adnav-menu>li>ul>li{
        padding: 10px 0px;
        cursor: pointer;
        text-align: center;
    }
    .open-adnav-menu>li>ul>li:hover{
        background: #eeeeee;
        color: #1890ff;
    }
</style>