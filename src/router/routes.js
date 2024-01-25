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
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    children: [
      {
        path: 'index',
        name: 'test',
        meta: {
          title: '测试',
          icon: 'guide',
          noCache: true
        },
        component: () => import('@/views/test.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/profile',
    meta: {
      title: '个人中心',
      icon: 'user'
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        meta: {
          title: '个人资料'
        },
        component: () => import('@/views/test.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        meta: {
          title: '账号设置'
        },
        component: () => import('@/views/test.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    meta: {
      title: '404',
      keepAlive: true
    },
    component: () => import('@/views/error-pages/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true
  }
]

export default routes
