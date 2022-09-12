<script setup>
const emits = defineEmits(['create', 'refresh'])

const create = () => {
  emits('create')
}
const refresh = () => {
  emits('refresh')
}
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <el-button type="primary" @click="create"> 新增 </el-button>
    <el-tooltip content="刷新数据">
      <el-button size="small" text @click="refresh">
        <el-icon :size="20"><Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<style scoped lang="less"></style>
