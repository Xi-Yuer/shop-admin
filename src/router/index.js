import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/pages/index.vue'
import Login from '@/pages/login/index.vue'
import NotFount from '@/pages/404/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
        title: "首页"
      }
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

export default router
