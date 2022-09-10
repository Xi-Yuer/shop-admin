<script setup>
import gsap from 'gsap'
import { reactive, watch } from 'vue'
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})

const initValue = reactive({
  num: 0,
})

function AnimateToValue() {
  gsap.to(initValue, {
    duration: 0.5,
    num: props.value,
  })
}
AnimateToValue()
watch(
  () => props.value,
  () => AnimateToValue()
)
</script>

<template>
  <div>￥{{initValue.num.toFixed(2)}}</div>
</template>

<style scoped lang="less"></style>
