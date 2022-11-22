<template>
    <RouterLink
    v-if="isExternal"
    :to="link"
    >
    {{item.text}}  
    </RouterLink>
    <a 
    v-else
    :href="link"
    target="_blank">
        {{item.text}}
    </a>
</template>

<script>
    import {isExternalPath} from '../common/utils.js'
    export default {
        name: 'OpenNavbarLink',
        props: {
            item: {
                required: true
            }
        },
        computed: {
            isExternal () {
                return !isExternalPath(this.item.link)
            },
            link(){
                if(this.item.link.indexOf('/') >= 0){
                    return this.item.link
                }else{
                    return `/${this.item.link }`;
                }
            }
        },
        methods: {
        }
    }
  

</script>

<style>
    a{
        text-decoration:none;
        color:#000;
    }
</style>
