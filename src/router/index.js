import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/pages/index.vue'
import Login from '@/pages/login/index.vue'
import NotFount from '@/pages/404/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFount",
      component: NotFount
    }
  ]
})

export default router
