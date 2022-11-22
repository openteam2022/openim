// import './plugins/axios'
import { createApp } from 'vue'
import '@/assets/reset.css'
import App from './App.vue'
import router from './router'
import store from './store'
import tems from '@/components/tems/components/index.js'
import loading from '@/components/tems/plugin/js/open_loading.js'
import message from '@/components/tems/plugin/js/open_message.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App);
app.config.globalProperties.$loading = loading;
app.config.globalProperties.$message = message;
app.use(store).use(router).use(VueAxios, axios).use(tems).mount('#app')
