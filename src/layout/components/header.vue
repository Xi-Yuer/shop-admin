<script setup>
import { toRefs, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { useFullscreen } from '@vueuse/core'
import { changeUserInfo } from '@/service/api/manager'
import Token from '@/utils/cache'
import { err } from '../../utils/message'

const userStore = useUserStore()
const { userInfo, logoutAction } = toRefs(userStore)

const { isFullscreen, toggle } = useFullscreen()

const dialogTableVisible = ref(false)

// 退出登录
const router = useRouter()
const redirectLoginPage = () => router.push('/login')
const logout = () => logoutAction.value(redirectLoginPage)

// 刷新
const handleRefresh = () => location.reload()

// 全屏
const handleScreenFull = () => toggle()

// 修改用户信息
const formRef = ref(null)
const loading = ref(false)
const form = reactive({
  oldpassword: '',
  newpassword: '',
  repassword: '',
})
const confirmHandleChangeInfo = () => {
  formRef.value.validate(async valid => {
    if (!valid) return
    try {
      loading.value = true
      await changeUserInfo(form)
      loading.value = false
      dialogTableVisible.value = false
      // 修改密码成功需要退出重新登录
      Token.remove()
      location.reload()
    } catch (error) {
      err('修改密码失败')
    }
  })
}

// 表单规则
const rules = {
  oldpassword: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
  newpassword: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
  repassword: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    {
      min: 3,
      message: '密码不能低于3位数',
      trigger: 'blur',
    },
  ],
}
</script>

<template>
  <div class="flex header">
    <span class="logo">
      <el-icon class="mr-1"><IceTea /></el-icon>
      商城后台
    </span>
    <el-icon class="icon-btn"><Fold /></el-icon>
    <el-tooltip content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"
        ><RefreshRight
      /></el-icon>
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
  <el-dialog
    v-model="dialogTableVisible"
    title="修改用户密码"
    width="500px"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <el-form label-width="120px" :rules="rules" ref="formRef" :model="form">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input class="w-[300px]" v-model="form.oldpassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input class="w-[300px]" v-model="form.newpassword" />
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input class="w-[300px]" v-model="form.repassword" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="confirmHandleChangeInfo"
          :loading="loading"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.header {
  @apply flex bg-indigo-500 text-lime-50 fixed top-0 left-0 right-0 items-center;
  height: 64px;
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
