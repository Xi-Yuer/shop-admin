import { createRouter, createWebHistory } from 'vue-router'

import LayOut from '@/layout/index.vue'
import Login from '@/pages/login/index.vue'
import NotFount from '@/pages/404/index.vue'


import Center from '@/pages/panel/center/index.vue'

import GoodsManage from '@/pages/goods/manage/index.vue'
import GoodsClassify from '@/pages/goods/classify/index.vue'
import GoodsCoupon from '@/pages/goods/coupon/index.vue'
import GoodsSpecifications from '@/pages/goods/specifications/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    component: Center
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodsManage
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: GoodsClassify
  },
  {
    path: "/skus/list",
    name: "/skus/list",
    component: GoodsSpecifications
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: GoodsCoupon
  },
]

export default router

// 动态添加路由
export function addRoutes(menus) {
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach(i => {
      const route = activeRoute.find(n => n.path === i.frontpath)
      if (route && !router.hasRoute(route.path)) {
        router.addRoute("admin", route)
      }
      if (i.child && i.child.length) {
        findAndAddRoutesByMenus(i.child)
      }
    })
  }
  findAndAddRoutesByMenus(menus)
}
