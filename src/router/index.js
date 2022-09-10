import { createRouter, createWebHashHistory } from 'vue-router'

// 单页面
import LayOut from '@/layout/index.vue'
import Login from '@/pages/login/index.vue'
import NotFount from '@/pages/404/index.vue'

// 后台面板
import Center from '@/pages/panel/center/index.vue'

// 商品管理
import GoodsManage from '@/pages/goods/manage/index.vue'
import GoodsClassify from '@/pages/goods/classify/index.vue'
import GoodsCoupon from '@/pages/goods/coupon/index.vue'
import GoodsSpecifications from '@/pages/goods/specifications/index.vue'

// 用户管理
import UserList from '@/pages/user/list/index.vue'
import UserLevel from '@/pages/user/level/index.vue'

// 订单管理
import OrderManage from '@/pages/order/manage/index.vue'
import OrderComment from '@/pages/order/comment/index.vue'

// 管理员管理
import AdminManage from '@/pages/admin/manage/index.vue'
import AdminPermission from '@/pages/admin/permission/index.vue'
import AdminRole from '@/pages/admin/role/index.vue'

// 系统设置
import SystemBase from '@/pages/system/base/index.vue'
import SystemDeal from '@/pages/system/deal/index.vue'
import SystemLogist from '@/pages/system/logist/index.vue'

// 分销管理
import Distributor from '@/pages/distribution/distributor/index.vue'
import DisSetting from '@/pages/distribution/setting/index.vue'

// 其他
import OtherPicture from '@/pages/other/picture/index.vue'
import OtherNotify from '@/pages/other/notify/index.vue'

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
  {
    path: "/user/list",
    name: "/user/list",
    component: UserList,
    meta: {
      title: "用户列表"
    }
  },
  {
    path: "/level/list",
    name: "/level/list",
    component: UserLevel,
    meta: {
      title: "会员等级"
    }
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: OrderManage,
    meta: {
      title: "订单管理"
    }
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: OrderComment,
    meta: {
      title: "评论管理"
    }
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: AdminManage,
    meta: {
      title: "管理员管理"
    }
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: AdminPermission,
    meta: {
      title: "权限管理"
    }
  },
  {
    path: "/role/list",
    name: "/role/list",
    component: AdminRole,
    meta: {
      title: "角色管理"
    }
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: SystemBase,
    meta: {
      title: "基础设置"
    }
  },
  {
    path: "/setting/buy",
    name: "/setting/buy",
    component: SystemDeal,
    meta: {
      title: "交易设置"
    }
  },
  {
    path: "/setting/ship",
    name: "/setting/ship",
    component: SystemLogist,
    meta: {
      title: "物流设置"
    }
  },
  {
    path: "/distribution/index",
    name: "/distribution/index",
    component: Distributor,
    meta: {
      title: "分销员管理"
    }
  },
  {
    path: "/distribution/setting",
    name: "/distribution/setting",
    component: DisSetting,
    meta: {
      title: "分销设置"
    }
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: OtherPicture,
    meta: {
      title: "图库管理"
    }
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: OtherNotify,
    meta: {
      title: "公告管理"
    }
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
