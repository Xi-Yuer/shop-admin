<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  tip: {
    type: String,
    default: '',
  },
  tips: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">{{ title }}</span>
        <el-tag type="danger" effect="plain">
          {{ tip }}
        </el-tag>
      </div>
    </template>
    <el-row :gutter="20">
      <template v-for="item in tips">
        <el-col :span="6">
          <el-card shadow="hover" class="border-0 bg-light-400">
            <div
              class="flex items-center justify-center cursor-pointer flex-col"
            >
              <span class="text-xl mb-2">{{ item.value }}</span>
              <span class="text-xs text-gray-500">{{ item.label }}</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </el-card>
</template>

<style scoped lang="less"></style>
