<script setup>
const emits = defineEmits(['confirm', 'cancel'])
defineProps({
  title: {
    type: String,
    default: '',
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  cancleText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  // 点击遮罩层是否关闭
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  // 销毁
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
// 确定
const confirmHandleChangeInfo = () => emits('confirm')
// 取消
const cancelHandle = () => emits('cancel')
</script>

<template>
  <el-dialog
    v-model="isShow"
    :title="title"
    width="500px"
    :close-on-click-modal="closeOnClickModal"
    :destroy-on-close="destroyOnClose"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelHandle">
          {{ cancleText }}
        </el-button>
        <el-button
          type="primary"
          @click="confirmHandleChangeInfo"
          :loading="loading"
        >
          {{ confirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
