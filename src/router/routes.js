import Layout from '@/layout/index.vue'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        path: 'home/index',
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'house'
        },
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    props: true,
    hidden: true,
    meta: {
      title: '登录'
    },
    component: Login
  }
]

export default routes
