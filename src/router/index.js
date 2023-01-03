import { createRouter, createWebHashHistory } from 'vue-router'
import bookRecommend from "@/views/bookRecommend";
import bookBorrow from "@/views/bookBorrow";
import currentBorrow from "@/views/currentBorrow";
import recordBorrow from "@/views/recordBorrow";
import bookAdd from "@/views/bookAdd";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home'),
    redirect:'/bookRecommend',
    children :[
      {path:'/bookRecommend',component:bookRecommend},
      {path:'/bookBorrow',component:bookBorrow},
      {path:'/currentBorrow',component:currentBorrow},
      {path:'/recordBorrow',component:recordBorrow},
      {path: '/bookAdd',component: bookAdd}
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
