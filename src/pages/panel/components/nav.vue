<script setup>
import { useRouter } from 'vue-router'
import { iconNavs } from '../center/constant/index'

const router = useRouter()

const redirectPage = path => {
  router.push(path)
}
</script>

<template>
  <el-row :gutter="20" class="mt-5">
    <template v-for="item in iconNavs" :key="item.icon">
      <el-col :span="3" :offset="0">
        <el-card shadow="hover" @click="redirectPage(item.path)">
          <div class="flex items-center justify-center cursor-pointer flex-col">
            <el-icon :size="25" :class="item.color">
              <component :is="item.icon"></component>
            </el-icon>
            <span class="text-sm mt-2">{{ item.title }}</span>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<style scoped></style>
