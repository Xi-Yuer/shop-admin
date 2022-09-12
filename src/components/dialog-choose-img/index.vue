<script setup>
import Dialog from '../dialog/index.vue'
import Picture from '@/pages/other/picture/index.vue'
import { ref } from 'vue'

const emits = defineEmits(['update:modelValue', 'cancel', 'canfirm'])
const props = defineProps({
  modelValue: [String, Array],
  isShow: {
    type: Boolean,
    default: false,
  },
  top: {
    type: String,
    default: '0px',
  },
  width: {
    type: String,
    default: '70%',
  },
})

const imageCheckedValue = ref()
const handleConfirm = () => {
  emits('canfirm')
  emits('update:modelValue', imageCheckedValue.value)
}
const handleCancel = () => {
  emits('cancel')
}
</script>

<template>
  <Dialog
    :isShow="isShow"
    :width="width"
    :top="top"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <Picture
      :showCheck="true"
      v-model="imageCheckedValue"
      :allowPickImages="false"
    />
  </Dialog>
</template>

<style scoped lang="less"></style>
