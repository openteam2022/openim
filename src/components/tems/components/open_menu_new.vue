<template>
    <div class="open-menu" ref="openmenu" :style="{'color':color}">
       <!--  <p class="open-menu-mobile-btn" @click.stop="showList"><i class="bi bi-list"></i></p> -->
        <ul class="open-menu-list" ref="openmenulist">
            <li class="oml-item" v-for="(item,index) in nav">
                <p class="oml-item-title" v-if="!item.childs">
                    <span><i class="bi bi-house-fill menu-icon"></i>{{item.text}}</span>
                </p>
                <p class="oml-item-title" v-if="item.childs" @click.stop="showItemMenu(index)">
                    <span><i class="bi bi-house-fill menu-icon"></i>{{item.text}}</span>
                    <i class="bi bi-chevron-right icon"></i>
                </p>
                <ul class="oml-item-list" style="display: none;" v-if="item.childs" >
                    <li  v-for="(it,ind) in item.childs">
                        <p class="oml-item-title oml-item-item" v-if="!it.childs">
                            <span>{{it.text}}</span>
                        </p>
                        <p class="oml-item-title oml-item-item" v-if="it.childs" @click.stop="showItemMenu(index,ind)">
                            <span>{{it.text}}</span>
                            <i class="bi bi-chevron-right icon"></i>
                        </p>
                        <ul class="oml-item-list" style="display: none;" v-if="it.childs" >
                            <li class="oml-item-title oml-items-item" v-for="i in it.childs">{{i.text}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'OpenMenuNew',
        props: {
            color: {
                type: String,
                default: '#333333'
            },
            isShow: {
                type: Boolean,
                default: false
            },
            menu: {
                type: Object,
                default: {
                    nav: [
                        {text: '??????',link: ''},
                        {text: '??????',link: ''},
                        {
                            text: '??????',
                            childs:[
                                {text: '??????A',link: ''},
                                {text: '??????b',link: ''},
                                {
                                    text: '??????c',
                                    childs:[
                                        {text: '??????A',link: ''},
                                        {text: '??????b',link: ''},
                                    ]
                                },
                            ]
                        },
                        {
                            text: '??????',
                            childs:[
                                {text: '???????????????',link: ''},
                                {text: '?????????',link: ''},
                            ]
                        }
                    ]
                }
            }
        },
        data() {
            return {
                nav: this.menu.nav,
                el:'',
            }   
        },
        mounted () {
            // ?????????????????????
            this.el = this.$refs.openmenulist;
        },
        methods: {
            // ???????????????
            showItemMenu(index,ind){
                if(ind){
                    let cel = this.el.childNodes[index + 1];
                    let ccel = cel.childNodes[ind];
                    this.showItem(ind,ccel)
                    // this.hideItem(this.el,index,true)
                }else{
                    this.hideItem(this.el,index,true)
                    this.showItem(index,this.el)
                }
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
        }
    }
</script>

<style scoped>
    .open-menu{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto;
    }

    .open-menu-mobile-btn{
        font-size: 1.7rem;
        color: #999999;
        display: none;
    }
    .open-menu-mobile-list{
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        background: #ffffff;
        color: #333333;
        font-size: 0.9rem;
        position: absolute;
        top: v-bind(headerH);
        left: 0;
        box-shadow: 1px 1px 5px #eeeeee;
    }
    .oml-item-title{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        cursor: pointer;
    }
    .oml-item-title:hover{
        color: #1890ff;
        background: #f4f4f4;
    }
    .menu-icon{
        margin-right: 5px;
    }
    .icon{
        font-size: 0.7rem;
        color: #333333;
        margin-top: 5px;
    }
    .oml-item-item{
        box-sizing: border-box;
        padding-left: 40px;
        font-size: 0.9rem;
    }
    .oml-items-item{
        box-sizing: border-box;
        padding-left: 60px;
        font-size: 0.9rem;
    }
    .oml-item-list{
        overflow: hidden;
    }
   
</style>