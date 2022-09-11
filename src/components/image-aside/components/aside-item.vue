<script setup>
const emits = defineEmits(['edit', 'delete'])
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
const Edit = () => emits('edit')
const Delete = () => emits('delete')
</script>

<template>
  <div class="aside-list hover:bg-blue-50" :class="{ active: active }">
    <span class="truncate">
      <slot></slot>
    </span>
    <div class="btn">
      <el-button
        type="primary"
        size="small"
        plain
        text
        class="p-0"
        @click.stop="Edit"
      >
        <el-icon :size="12"><EditPen /></el-icon>
      </el-button>
      <span @click.stop="() => {}">
        <el-popconfirm
          title="是否删除该分类?"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm.stop="Delete"
        >
          <template #reference>
            <el-button type="danger" size="small" plain text>
              <el-icon :size="12"><Close /></el-icon>
            </el-button>
          </template>
        </el-popconfirm>
      </span>
    </div>
  </div>
</template>

<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex items-center justify-between p-3 text-sm text-gray-600 cursor-pointer;
}
.active {
  @apply bg-blue-50;
}
</style>
