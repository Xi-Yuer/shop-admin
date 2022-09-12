<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import DialogChooseImg from '../dialog-choose-img/index.vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: [String, Array],
})

const showDialog = ref(false)

const imageCheckedValue = ref()

// 点击提交事件
const handleConfirm = () => {
  // 传过来的图片可能会有多张
  const imageURL = imageCheckedValue.value[0]?.url
  emits('update:modelValue', imageURL)
  showDialog.value = false
}
</script>

<template>
  <div class="choose-btn" @click="() => (showDialog = true)">
    <template v-if="!imageCheckedValue">
      <el-icon><Plus /></el-icon>
    </template>
    <template v-else>
      <el-image
        class="w-[100px] h-[100px] rounded border"
        style="width: 100px; height: 100px"
        :src="imageCheckedValue[0]?.url"
        fit="cover"
      />
    </template>
  </div>
  <!-- 打开图片选择器 -->
  <DialogChooseImg
    v-model="imageCheckedValue"
    :isShow="showDialog"
    @confirm="handleConfirm"
    @cancel="() => (showDialog = false)"
  />
</template>

<style scoped>
.choose-btn {
  @apply w-[100px] h-[100px] rounded border flex items-center justify-center cursor-pointer hover:(bg-gray-100);
}
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
.image-main {
  position: relative;
}
</style>
