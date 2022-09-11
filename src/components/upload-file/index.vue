<script setup>
import { uploadFileURL } from '@/service/api/image'
import Token from '@/utils/cache.js'
import { err } from '../../utils/message'
const token = Token.get()

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['success', 'fail'])
// 上传成功
const uploadSuccess = (uploadFile, uploadFiles) => {
  emits('success', {
    uploadFiles,
  })
}
// 上传失败
const uploadFail = (error, uploadFile, uploadFiles) => {
  const msg = JSON.parse(error.message).msg || '上传失败'
  err(msg)
  emits('fail', {
    error,
    uploadFile,
    uploadFiles,
  })
}
</script>

<template>
  <el-upload
    drag
    :action="uploadFileURL"
    :headers="{
      token,
    }"
    name="img"
    :data="data"
    :on-success="uploadSuccess"
    @on-error="uploadFail"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">拖拽图片自动上传<em>点击选择文件</em></div>
    <template #tip>
      <div class="el-upload__tip">jpg/png 文件不能大小不能超过500kb</div>
    </template>
  </el-upload>
</template>

<style scoped lang="less"></style>
