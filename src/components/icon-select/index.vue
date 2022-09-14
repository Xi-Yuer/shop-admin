<script setup>
import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const iconList = ref(Object.keys(ElementPlusIconsVue))

const emits = defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: String,
  },
})

const handleChange = e => emits('update:modelValue', e)
</script>

<template>
  <div class="flex items-center">
    <template v-if="modelValue">
      <el-icon :size="20" class="mr-2">
        <component :is="modelValue"></component>
      </el-icon>
    </template>
    <el-select
      :modelValue="modelValue"
      @change="handleChange"
      filterable
      placeholder="请选择图标"
    >
      <template v-for="icon in iconList" :key="icon">
        <el-option :value="icon" :label="icon">
          <div class="flex items-center">
            <el-icon>
              <component :is="icon"></component>
            </el-icon>
            <span class="ml-4">{{ icon }}</span>
          </div>
        </el-option>
      </template>
    </el-select>
  </div>
</template>

<style scoped lang="less"></style>
