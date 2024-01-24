import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-ui'
import { getToken } from '@/utils/token'
import router from '.'

router.beforeEach((to, from, next) => {
  NProgress.start()
  const hasToken = !!getToken()
  const isLogin = to.name === 'Login'

  if (hasToken) {
    // 如果已经登录且访问登录页面，则跳转到首页
    if (isLogin) {
      return next({ name: 'Home' })
    }
    return next()
  }

  // 如果尚未登录，且访问页面非登录页
  if (!isLogin) {
    if (from.name !== 'Login') {
      ElMessage.warning('当前登陆已过期，请重新登录!')
    }
    return next({ name: 'Login', params: { redirect: to.path } })
  }

  return next()
})

router.afterEach(() => {
  NProgress.done()
  console.log('router: ', router)
})

// 路由错误捕获
router.onError(err => {
  NProgress.done()
  console.warn('err: ', err)
})
