<script setup>
import ImageAside from '@/components/image-aside/index.vue'
import ImageMain from '@/components/image-main/index.vue'
import { Plus, UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
const windowHeight = window.innerHeight || document.body.clientHeight

const h = windowHeight - 64 - 44 - 40

const imageAsideRef = ref(null)
const imageMainRef = ref(null)

defineProps({
  showCheck: {
    type: Boolean,
    default: false,
  },
  allowPickImages: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['update:modelValue'])

const handleCreate = () => {
  imageAsideRef.value.showModal()
}
const handleAsideChange = id => {
  imageMainRef.value.loadData(id)
}
const handleUpload = () => {
  imageMainRef.value.openUploadFile()
}

// 图片选着
const handleImageChecked = images => {
  emits('update:modelValue', images)
}
</script>

<template>
  <el-container class="bg-light-50 rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header">
      <el-button size="small" @click="handleCreate" :icon="Plus" type="primary">
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
        :showCheck="showCheck"
        :allowPickImages="allowPickImages"
        @chechedImage="handleImageChecked"
      />
    </el-container>
  </el-container>
</template>

<style scoped>
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
.image-main {
  position: relative;
}
</style>
