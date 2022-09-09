<script setup>
import { ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePageAction } from '@/stores/page-action'
import { useUserStore } from '../../stores/user';

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { userInfo } = toRefs(userStore)

const pageActionStore = usePageAction()

const { isFold } = toRefs(pageActionStore)

// 默认展开项
const defaultActive = ref(route.path)

const handleSelect = path => {
  router.push(path)
}
</script>

<template>
  <div class="menu" :class="[isFold ? 'fold' : '']">
    <el-menu
      :default-active="defaultActive"
      class="border-0"
      @select="handleSelect"
      :collapse="isFold"
      :collapse-transition="false"
      unique-opened
    >
      <template v-for="(item, index) in userInfo.menus" :key="index">
        <!-- 二级菜单 -->
        <template v-if="item.child && item.child.length > 0" :key="ittem.name">
          <el-sub-menu :index="item.name">
            <template #title>
              <component :is="item.icon" class="icon"></component>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="iten in item.child" :key="iten.name">
              <el-menu-item :index="iten.frontpath">
                <template #title>
                  <component :is="iten.icon" class="icon"></component>
                  <span>{{ iten.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else>
          <el-menu-item :index="item.frontpath">
            <template #title>
              <component :is="item.icon" class="icon"></component>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.menu {
  width: 250px;
  @apply shadow-md fixed top-[64px] bottom-0 left-0 bg-light-50 overflow-auto transition-all duration-200 overflow-x-hidden overflow-y-auto;
}
.menu::-webkit-scrollbar{
  display: none;
}
.fold {
  width: 64px;
}
.icon {
  @apply w-5 mr-1;
}
</style>
