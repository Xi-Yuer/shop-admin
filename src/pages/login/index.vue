<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  name: '',
  password: '',
})
const rules = {
  name: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 5,
      message: '用户名3-5位字符',
      trigger: 'blur',
    },
  ],
  password: [
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

const isLoading = ref(false)
const formRef = ref(null)

// 登录
const onSubmit = async () => {
  formRef.value.validate(async valid => {
    if (!valid) return
    isLoading.value = true
    const routerFn = () => router.push('/')
    await userStore.loginAction(form.name, form.password, routerFn)
    isLoading.value = false
  })
}
</script>

<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div class="wel-text">欢迎光临</div>
        <div class="text-white">
          vue3 + vite + pinia 商城后台 登录账号密码: admin
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="tip">
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <div class="mr-8">
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="right"
          label-width="70px"
          class="el-form"
          @keyup.enter.native="onSubmit"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" type="text">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" show-password>
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              class="w-[190px]"
              round
              :loading="isLoading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-container {
  @apply bg-indigo-500 min-h-screen min-w-screen;
}
.login-container .left {
  @apply flex items-center justify-center;
}
.login-container .right {
  @apply bg-light-50 flex items-center justify-center flex-col;
}
.wel-text {
  @apply font-bold text-5xl text-white mb-4;
}
.el-form {
  @apply w-[250px] flex items-center justify-center flex-col;
}
.tip {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
