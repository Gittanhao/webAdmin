import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
const instance = axios.create({
    baseURL: 'http://172.16.8.18:80',
    timeout: 10000
});
Vue.prototype.$axios = instance;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
