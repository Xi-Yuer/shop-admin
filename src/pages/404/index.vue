<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const redirectHome = () => {
  router.back()
}
</script>

<template>
  <el-result icon="error" title="页面不存在" sub-title="您找的页面走走丢了~">
    <template #extra>
      <el-button type="primary" @click="redirectHome">返回</el-button>
    </template>
  </el-result>
</template>

<style scoped lang="less"></style>
