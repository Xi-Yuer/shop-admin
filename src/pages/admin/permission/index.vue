<script setup>
import TableHeader from '@/components/table-header/index.vue'

import { getMenuPermissionList } from '@/service/api/menu-permission.js'
import { ref } from 'vue'
import { useTableOperate } from '../../../hooks/useTableOperate'
const { tableData, loading, getData } = useTableOperate({
  getList: getMenuPermissionList,
  onGetListSuceess: list => {
    tableData.value = list
    defaultExpandedKeys.value = list.map(o => o.id)
  },
})

const defaultExpandedKeys = ref([])
</script>

<template>
  <el-card shadow="never">
    <TableHeader @refresh="getData" />
    <el-tree
      :data="tableData"
      v-loading="loading"
      :props="{
        label: 'name',
        children: 'child',
      }"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
    >
      <template #default="{ data }">
        <div class="flex w-full">
          <el-tag :type="data.menu ? '' : 'info'" size="small">
            {{ data.menu ? '菜单' : '权限' }}
          </el-tag>
          <template v-if="data.icon">
            <el-icon class="ml-2" :size="16">
              <component :is="data.icon"></component>
            </el-icon>
          </template>
          <span class="ml-1 text-sm">{{ data.name }}</span>
          <div class="ml-auto">
            <el-switch
              :modelValue="data.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
            <el-button text type="primary" size="small">修改</el-button>
            <el-button text type="primary" size="small">增加</el-button>
            <el-button text type="danger" size="small">删除</el-button>
          </div>
        </div>
      </template>
    </el-tree>
  </el-card>
</template>

<style>
.el-tree-node__content {
  padding: 20px 0;
}
</style>
