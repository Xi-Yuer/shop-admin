import { createRouter, createWebHashHistory } from 'vue-router'

import LayOut from '@/layout/index.vue'
import Login from '@/pages/login/index.vue'
import NotFount from '@/pages/404/index.vue'


import Center from '@/pages/panel/center/index.vue'

import GoodsManage from '@/pages/goods/manage/index.vue'
import GoodsClassify from '@/pages/goods/classify/index.vue'
import GoodsCoupon from '@/pages/goods/coupon/index.vue'
import GoodsSpecifications from '@/pages/goods/specifications/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayOut,
      name: "admin",
      meta: {
        title: "首页"
      },
      children: []
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "用户登录"
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFount",
      component: NotFount,
      meta: {
        title: "页面丢失"
      }
    }
  ]
})

// 动态路由
const activeRoute = [
  {
    path: "/",
    name: "/",
    component: Center,
    meta: {
      title: "主控台"
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodsManage,
    meta: {
      title: "商品管理"
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: GoodsClassify,
    meta: {
      title: "分类管理"
    },
  },
  {
    path: "/skus/list",
    name: "/skus/list",
    component: GoodsSpecifications,
    meta: {
      title: "规格管理"
    },
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: GoodsCoupon,
    meta: {
      title: "商品优惠券"
    },
  },
]

export default router

// 动态添加路由
export function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach(i => {
      const route = activeRoute.find(n => n.path === i.frontpath)
      if (route && !router.hasRoute(route.path)) {
        router.addRoute("admin", route)
        hasNewRoutes = true
      }
      if (i.child && i.child.length) {
        findAndAddRoutesByMenus(i.child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
  return hasNewRoutes
}
