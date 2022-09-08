import router from "./index";
import Token from '@/utils/cache'
import { err } from '@/utils/message'
import { showLoading, hideLoading } from '@/utils/nprogress'


// 全局前置守卫
router.beforeEach((to, from) => {
    showLoading()
    const token = Token.get()
    // 未登录
    if (!token && to.path !== '/login') {
        err("请先登录")
        return '/login'
    }
    // 已登录
    if (token && to.path === '/login') {
        return from.path
    }
    const title = to.meta?.title || "商城后台"
    document.title = title
})

// 全局后置守卫
router.afterEach((to, from) => {
    hideLoading()
})