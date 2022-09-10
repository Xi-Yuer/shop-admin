<script setup>
import { toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePageAction } from '@/stores/page-action'
import { useFullscreen } from '@vueuse/core'
import { useRepasswrod } from '@/hooks/useRepassword.js'

import Dialog from '@/components/dialog/index.vue'

const userStore = useUserStore()
const pageActionStore = usePageAction()
const router = useRouter()

// 用户信息|退出登录|展开|折叠
const { userInfo, logoutAction } = toRefs(userStore)
const { isFold, changeFoldAction } = toRefs(pageActionStore)

const { isFullscreen, toggle } = useFullscreen()
// 修改密码
const { formRef, loading, form, confirmHandleChangeInfo, rules, inputConfig } =
  useRepasswrod()

const dialogTableVisible = ref(false)

// 退出登录
const redirectLoginPage = () => router.push('/login')
const logout = () => logoutAction.value(redirectLoginPage)

// 刷新
const handleRefresh = () => location.reload()

// 全屏
const handleScreenFull = () => toggle()

// 展开 | 折叠
const handelFoldChange = () => changeFoldAction.value()
</script>

<template>
  <div class="flex header">
    <span class="logo">
      <el-icon class="mr-1"><IceTea /></el-icon>
      商城后台
    </span>
    <el-icon class="icon-btn" @click="handelFoldChange">
      <template v-if="isFold">
        <Fold />
      </template>
      <template v-else>
        <Expand />
      </template>
    </el-icon>
    <el-tooltip content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <RefreshRight />
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center justify-center">
      <el-tooltip
        :content="!isFullscreen ? '全屏' : '退出全屏'"
        placement="bottom"
      >
        <el-icon class="icon-btn" @click="handleScreenFull">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown">
        <span class="flex items-center justify-center text-light-50">
          <el-avatar :src="userInfo.avatar" class="mx-2" />
          <span>{{ userInfo.username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dialogTableVisible = true">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <Dialog
    title="修改密码"
    @confirm="confirmHandleChangeInfo"
    @cancel="dialogTableVisible = false"
    :loading="loading"
    :isShow="dialogTableVisible"
  >
    <el-form label-width="120px" :rules="rules" ref="formRef" :model="form">
      <template v-for="item in inputConfig">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input :class="item.width" v-model="form[item.dataText]" />
        </el-form-item>
      </template>
    </el-form>
  </Dialog>
</template>

<style scoped>
.header {
  @apply flex bg-indigo-500 text-lime-50 fixed top-0 left-0 right-0 items-center;
  height: 64px;
  z-index: 20;
}
.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-bold;
}
.icon-btn {
  @apply flex justify-center items-center hover:bg-indigo-600;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
