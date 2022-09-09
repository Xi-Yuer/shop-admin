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
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.animate {
  @apply transition-all duration-200;
}
</style>
