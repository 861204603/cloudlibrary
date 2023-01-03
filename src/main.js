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

// const store = new Vuex.Store({
//     state: {
//         user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
//         //若localSorage存在token，将值赋给Vuex.state.token
//         token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
//     },
//     mutations: {
//         setUser(state, user) {
//             state.user = user
//             localStorage.setItem('user', JSON.stringify(user))
//         },
//         setToken(state, token) {
//             localStorage.setItem('token', token)
//             state.token = token
//         },
//         logout(state) {
//             localStorage.removeItem('token')
//             state.token = null
//             localStorage.removeItem('user')
//             state.user = null
//         }
//     }
// })


// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     // 判断是否存在token,如果存在将每个页面header添加token
//     if (localStorage.getItem("token")) {
//         config.headers.common['Authorization'] = sessionStorage.getItem("token");
//     }
//     return config
// }, function (error) {
//     router.push('/')
//     return Promise.reject(error)
// })
//
//
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }
