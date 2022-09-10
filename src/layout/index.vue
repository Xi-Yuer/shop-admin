<script setup>
import { computed, toRefs } from 'vue'

import Header from './components/header.vue'
import Menu from './components/menu.vue'
import TagList from './components/tag-list.vue'

import { usePageAction } from '@/stores/page-action'
const pageActionStore = usePageAction()

const asideWith = computed(() => (!pageActionStore.isFold ? '250px' : '64px'))
</script>

<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside :width="asideWith" class="animate">
        <Menu />
      </el-aside>
      <el-main>
        <TagList />
        <!-- 路由缓存 -->
        <router-view v-slot="{ Component }">
          <!-- 路由动画 -->
          <!-- 动画组件要求子路由组件只能有一个根节点 -->
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.animate {
  @apply transition-all duration-200;
}
/* 进入前 */
.fade-enter-from {
  opacity: 0;
}
/* 进入后 */
.fade-enter-to {
  opacity: 1;
}
/* 离开前 */
.fade-leave-from {
  opacity: 1;
}
/* 离开后 */
.fade-leave-to {
  opacity: 0;
}
/* 动画时长 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
