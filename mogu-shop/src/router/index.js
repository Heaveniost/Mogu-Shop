import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//懒加载 点击路由才会加载响应模块的js 提高用户体验
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

const routes = [
  { path:'/', name:'index', redirect:'/home'},
  { path: '/home', name:'Home', component:Home},
  { path: '/category', name:'Catrgory', component:Category},
  { path: '/cart', name: 'Cart', component: Cart},
  { path: '/profile', name:'Profile', component:Profile},
  { path: '/detail/:id', name:'Detail', component:Detail}
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
