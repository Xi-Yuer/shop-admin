import router, { addRoutes } from "./index";
import Token from '@/utils/cache'
import { err } from '@/utils/message'
import { showLoading, hideLoading } from '@/utils/nprogress'
import { useUserStore } from "../stores/user";
import { toRefs } from "vue";


let isFirst = true
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    const { userInfo, getUserInfoAction } = toRefs(useUserStore())
    showLoading()
    const token = Token.get()
    // 未登录
    if (!token && to.path !== '/login') {
        err("请先登录")
        next("/login")
    }
    // 已登录
    if (token && to.path === '/login') {
        next(from.path)
        return
    }
    let hasNewRoutes = false
    if (token) {
        if (isFirst) {
            await getUserInfoAction.value()
            isFirst = false
        }
        hasNewRoutes = addRoutes(userInfo.value.menus)
    }
    const title = to.meta?.title + " - 商城后台"
    document.title = title
    hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => {
    hideLoading()
})