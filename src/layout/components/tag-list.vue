<script setup>
import { toRefs } from 'vue'
import { usePageAction } from '@/stores/page-action'
import { useTab } from '@/hooks/useTab.js'
const { isFold } = toRefs(usePageAction())

const { editableTabsValue, editableTabs, removeTab, TabChange, close } = useTab()
</script>

<template>
  <div class="taglist" :class="[isFold ? 'fold' : 'folded']">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
      @tab-change="TabChange"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <span
      class="bg-white w-[32px] h-[32px] rounded flex items-center justify-center px-1 ml-auto mr-4"
    >
      <el-dropdown @command="close">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>

<style scoped>
.fold {
  left: 64px;
}
.folded {
  left: 250px;
}
.taglist {
  @apply fixed top-[64px] right-0 h-[44px] bg-gray-50 leading-[40px] flex items-center z-10;
}
:deep(.el-tabs__header) {
  @apply mb-0 ml-4;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.el-tabs__item) {
  border: none !important;
  line-height: 32px;
  margin: 0 10px;
  height: 32px @apply bg-white rounded;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
:deep(.el-tabs--card > .el-tabs__header) {
  border: none !important;
}
</style>
