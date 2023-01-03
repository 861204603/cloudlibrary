import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
//导入全局样式
import '../src/components/css/global.css'
import axios from "axios";

import {ElMessage} from 'element-plus'


const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
app.config.globalProperties.$http = axios;
//接口请求的基准路径
axios.defaults.baseURL = 'http://localhost:8080';
//路由全局前置守卫
router.beforeEach((to,from,next) => {
    if(to.path === '/register' || to.path === '/login' || to.path === '/'){ //若是进入登录与注册页面 ==> pass
        next()
    }else{
        let userToken = localStorage.getItem('token');
        console.log("Token为:"+userToken);
        if(userToken == null || userToken == ''){
            ElMessage.error("身份已过期，请重新登录");
            return next('/login');
        }else{
            next();
        }
    }
})

//请求拦截器 在请求头中加token
axios.interceptors.request.use(
    config => {
        if(localStorage.getItem('token')){
            config.headers.token = localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
