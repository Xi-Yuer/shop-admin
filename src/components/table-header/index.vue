<script setup>
import { computed } from 'vue'

const props = defineProps({
  layout: {
    type: String,
    default: 'create,refresh',
  },
})
const emits = defineEmits(['create', 'refresh', 'delete'])

const create = () => {
  emits('create')
}
const refresh = () => {
  emits('refresh')
}
const deleteAction = () => {
  emits('delete')
}

const btns = computed(() => props.layout.split(','))
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <div>
      <el-button type="primary" @click="create" v-if="btns.includes('create')">
        新增
      </el-button>
      <el-popconfirm
        title="是否批量删除?"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm.stop="deleteAction"
        v-if="btns.includes('delete')"
      >
        <template #reference>
          <el-button type="danger"> 批量删除 </el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-tooltip content="刷新数据" v-if="btns.includes('refresh')">
      <el-button size="small" text @click="refresh">
        <el-icon :size="20"><Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<style scoped lang="less"></style>
