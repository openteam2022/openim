<template>
    <div class="open-navbar" ref="opennavbar" :style="{'color':color}">
        <div class="open-navbar-logo">
            <open-image class="open-nabar-logo-img" :width="img_size" :height="img_size" :src="src"></open-image>
            <open-navbar-link :item="navbar.brand"></open-navbar-link>
        </div>
        <ul class="open-navbar-pc-list" ref="opennavbarpclist">
            <li class="onpl-item" v-for="(item,index) in navbar.nav">
                <p class="onpl-item-title" v-if="!item.childs">
                    <open-navbar-link :item="item"></open-navbar-link>
                </p>
                <p class="onpl-item-title" v-if="item.childs" @click.stop="showItemPc(index)">
                    <span>{{item.text}}</span>
                    <i class="bi bi-chevron-down"></i>
                </p>
                <ul class="onpl-item-list" style="display: none;" v-if="item.childs" >
                    <li class="onpl-items-title " v-for="i in item.childs">
                        <open-navbar-link :item="i"></open-navbar-link>
                    </li>
                </ul>
            </li>
        </ul>
        <p class="open-navbar-mobile-btn" @click.stop="showList"><i class="bi bi-list"></i></p>
        <ul class="open-navbar-mobile-list" ref="opennavbarmobilelist">
            <li class="onml-item" v-for="(item,index) in nav">
                <p class="onml-item-title" v-if="!item.childs">
                    <open-navbar-link :item="item"></open-navbar-link>
                </p>
                <p class="onml-item-title" v-if="item.childs" @click.stop="showItemMobile(index)">
                    <span>{{item.text}}</span>
                    <i class="bi bi-plus-lg icon"></i>
                </p>
                <ul class="onml-item-list" style="display: none;" v-if="item.childs" >
                    <li class="onml-item-title onml-item-item" v-for="i in item.childs">
                        <open-navbar-link :item="i"></open-navbar-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'OpenNavbar',
        props: {
            color: {
                type: String,
                default: '#2c3e50'
            },
            isShow: {
                type: Boolean,
                default: false
            },
            navbar: {
                type: Object,
                default: {
                    brand: {
                        text: '??????',
                        link: '/'
                    },
                    nav: [
                        {text: '??????',link: '/'},
                        {text: '??????',link: '/about'},
                        {
                            text: '??????',
                            childs:[
                                {text: '??????A',link: '/'},
                                {text: '??????b',link: '/'},
                            ]
                        },
                        {
                            text: '??????',
                            childs:[
                                {text: '????????????',link: '/'},
                                {text: '?????????',link: '/'},
                            ]
                        }
                    ]
                }
            }
        },
        data() {
            return {
                nav: this.navbar.nav,
                headerH: '55px',
                mEl:'',//?????????
                pEl:'',//pc???
                show: false,
                src: require('../assets/logo.png'),
                img_size: '40px'
            }   
        },
        mounted () {
            this.headerH = this.getParentNode(this) + 1 +'px';
            // ???????????????????????????
            this.mEl = this.$refs.opennavbarmobilelist;
            // ??????pc???????????????
            this.pEl = this.$refs.opennavbarpclist;
            // ??????logo????????????
            this.setLogoHeight()
            // ?????????????????????????????????select?????????????????????
            window.addEventListener('click',() => {
                this.hideItem(this.pEl)
                this.hideItem(this.mEl)
                if(this.show){
                    this.show = false;
                    this.slideUp(this.mEl)
                    setTimeout(()=>{
                        this.hideItem(this.mEl)
                    },1000)
                }
            })
            // ??????????????????????????????????????????
            document.addEventListener('scroll',(e) => {
                if(e.target.scrollTop > 0){
                    this.hideItem(this.pEl)
                    this.hideItem(this.mEl)
                    if(this.show){
                        this.show = false;
                        this.slideUp(this.mEl)
                        setTimeout(()=>{
                            this.hideItem(this.mEl)
                        },1000)
                    }
                }
            },true)
        },
        methods: {
            // pc??????????????????
            showItemPc(index){
                 this.hideItem(this.pEl,index,true)
                this.showItem(index,this.pEl)
            },
            // ????????????????????????
            showItemMobile(index){
                this.hideItem(this.mEl,index,true)
                this.showItem(index,this.mEl)
            },
            // ???????????????
            showItem (index,el) {
                // ?????????????????????????????????
                const cel = el.childNodes[index + 1];
                // ???????????????ul??????
                const ulEl = cel.childNodes[2];
                if(ulEl.style.display === 'none'){
                    this.slideDown(ulEl);
                }else{
                    this.slideUp(ulEl)
                }
            },
            showList () {
                this.show = this.show ? false : true;
                if(this.show){
                    this.slideDown(this.mEl);
                }else{
                    this.slideUp(this.mEl)
                    setTimeout(()=>{
                        this.hideItem(this.mEl)
                    },1000)
                }
            },
            // ?????????????????????

            /**
             * ???????????????
             * @param el ?????????
             * @param index ??????????????????dom??????
             * @param isHideOther:boolean ?????????????????????dom?????????dom?????????
            */
            hideItem(el,index,isHideOther = false){
                const _this = this;
                const cel = el.childNodes;
                for(let i = 0; i < cel.length; i ++ ){
                    if(isHideOther){
                        if(i !== index + 1 && cel[i].tagName === 'LI'){
                            const ccel = cel[i].childNodes;
                            ccel.forEach( items=> {
                                if(items.tagName === 'UL'){
                                    this.slideUp(items)
                                }
                            })
                        }
                    }else{
                        if(cel[i].tagName === 'LI'){
                            const ccel = cel[i].childNodes;
                            ccel.forEach( items=> {
                                if(items.tagName === 'UL'){
                                    this.slideUp(items)
                                }
                            })
                        }
                    }
                }
            },
            // ?????????????????????
            getParentNode (_this) {
                // ??????????????????
                let el = _this.$refs.opennavbar;
                // ???????????????
                const pel = el.parentNode;
                 // ?????????????????????
                const pH = pel.offsetHeight;
                return pH;
            },
            // ????????????
            slideUp (el) {
                let height = el.offsetHeight;
                const h = height;
                let time;
                time = setInterval(()=>{
                    height -= 10;
                    if(height < 0){
                        el.style.height = h + 'px';
                        el.style.display = 'none';
                        clearInterval(time);
                        return false;
                    }
                    el.style.height = height + 'px';
                },10)
            },
            //????????????
            slideDown (el) {
                el.style.display = 'block'
                let height = el.offsetHeight;
                el.style.height = '0px';
                let h = 0;
                let time;
                time = setInterval(()=>{
                    h += 10;
                    if(h > height){
                        clearInterval(time);
                        el.style.height = '';
                        return false;
                    }
                    el.style.height = h + 'px';
                },10)
            },
            // ??????logo????????????
            setLogoHeight(){
                let el = this.pEl;
                this.img_size = el.offsetHeight * 0.70 + 'px';
            },
        }
    }
</script>

<style scoped>
    .open-navbar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        width: 1080px;
        margin: 0 auto;
    }
    .open-navbar-logo{
        height: inherit;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .open-navbar-logo :deep(a){
        font-size: 1.3rem;
        font-weight: 600;
        color: #333333;
        outline-style: none;
    }
    .open-nabar-logo-img{
        margin-right: 10px;
    }
    /*pc?????????*/
    .open-navbar-pc-list{
        display: flex;
        align-items: center;
        height: 100%;
    }
    .onpl-item{
        display: flex;
        align-items: center;
        height: 100%;
        position: relative;
        cursor: pointer;
        width: 100px;
    }
    .onpl-item-title,.onpl-item-title :deep(a){
        font-size: 0.9rem;
    }
    .onpl-item-title{
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        font-weight: 500;
        height: 100%;
        margin: 0;
        margin-left: 30px;
    }
    .onpl-item-title span{
        margin-right: 5px;
    }
    .onpl-item-title:hover,.onpl-item-title:hover :deep(a){
        color: #1890ff;
    }
    .icon{
        font-size: 1rem;
        color: #333333;
    }
    .onpl-item-list{
        position: absolute;
        top: 56px;
        right: 0px;
        background: #fff;
        overflow: hidden;
        box-shadow: 0px 1px 5px #dddddd;
        padding: 5px 0;
        width: auto;
        z-index: 999;
        border-radius: 2px;
    }
    .onpl-items-title,.onpl-items-title :deep(a){
        font-size: 0.9rem;
        color: #666666;
    }
    .onpl-items-title{
         padding: 5px 15px;
         cursor: pointer;
    }
    .onpl-items-title:hover,.onpl-items-title:hover :deep(a){
        background: #f4f4f4;
        color: #1890ff;
    }

    /*???????????????*/
    .open-navbar-mobile-btn{
        font-size: 1.7rem;
        color: #333333;
        display: none;
    }
    .open-navbar-mobile-list{
        box-sizing: border-box;
        width: 100vw;
        padding: 10px 0 20px 0;
        background: #ffffff;
        color: #333333;
        font-size: 0.9rem;
        position: absolute;
        top: 56px;
        left: 0;
        z-index: 999;
        display: none;
        overflow: hidden;
        box-shadow: 1px 1px 5px #eeeeee;
        margin: 0;
    }
    .onml-item-title{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 35px;
        margin: 0;
    }
    .onml-item-title:hover{
        color: #1890ff;
    }
    .icon{
        font-size: 1rem;
    }
    .onml-item-item{
        box-sizing: border-box;
        padding-left: 50px;
        font-size: 0.85rem;
    }
    .onml-item-list{
        overflow: hidden;
        padding: 0;
    }
    /*????????????*/
     @media (max-width: 768px) { 
        .open-navbar-mobile-btn{
            display: block;
        }
        .open-navbar-pc-list{
            display: none;
        }
    }
    @media (min-width: 769px) { 
        /*.open-navbar-pc-list{
            display: block;
        }*/
    }
    @media (max-width: 1180px) { 
        .open-navbar{
            width: 95%;
        }
    }
</style>