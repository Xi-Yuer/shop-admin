<script setup>
import { ref } from 'vue'
import Dialog from '../dialog/index.vue'
import ImageAside from '@/components/image-aside/index.vue'
import ImageMain from '@/components/image-main/index.vue'
import { Plus, UploadFilled } from '@element-plus/icons-vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: [String, Array],
})

const showDialog = ref(false)

const imageAsideRef = ref(null)
const imageMainRef = ref(null)
const imageCheckedValue = ref()

const handleCreate = () => {
  imageAsideRef.value.showModal()
}
const handleAsideChange = id => {
  imageMainRef.value.loadData(id)
}
const handleUpload = () => {
  imageMainRef.value.openUploadFile()
}
// 图片选中事件保存图片
const handleChechedImage = image => {
  imageCheckedValue.value = image
}

// 点击提交事件
const handleConfirm = () => {
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
  <Dialog
    :isShow="showDialog"
    width="70%"
    top="5vh"
    @confirm="handleConfirm"
    @cancel="() => (showDialog = false)"
  >
    <el-container class="bg-light-50 rounded" style="height: 70vh">
      <el-header class="image-header">
        <el-button
          size="small"
          @click="handleCreate"
          :icon="Plus"
          type="primary"
        >
          新增图片分类
        </el-button>
        <el-button
          size="small"
          @click="handleUpload"
          :icon="UploadFilled"
          type="primary"
        >
          上传图片
        </el-button>
      </el-header>
      <el-container>
        <ImageAside ref="imageAsideRef" @listChange="handleAsideChange" />
        <ImageMain
          ref="imageMainRef"
          @chechedImage="handleChechedImage"
          :showCheck="true"
        />
      </el-container>
    </el-container>
  </Dialog>
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
