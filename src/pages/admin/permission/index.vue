<script setup>
import { reactive } from 'vue'
import TableHeader from '@/components/table-header/index.vue'
import IconSelect from '@/components/icon-select/index.vue'

import {
  getMenuPermissionList,
  createPermission,
  updatePermission,
  deletePermission,
  updatePermissionStatus,
} from '@/service/api/menu-permission.js'
import { ref } from 'vue'
import { useTableOperate } from '../../../hooks/useTableOperate'
import Dialog from '../../../components/dialog/index.vue'
import { rules } from '../config/index'
const newForm = reactive({
  rule_id: 0,
  menu: 0,
  name: '',
  condition: '',
  method: 'GET',
  status: 1,
  order: 10,
  icon: '',
  frontpath: '',
})
const editForm = reactive({
  rule_id: 0,
  menu: 0,
  name: '',
  condition: '',
  method: 'GET',
  status: 1,
  order: 10,
  icon: '',
  frontpath: '',
})
const options = ref([])
const {
  tableData,
  loading,
  getData,
  Edit,
  createNotifyAction,
  handleNewNotify,
  Delete,
  handleEditManager,
  handleStatusChange,
  hideModel,
  showNewModel,
  showEditModel,
} = useTableOperate({
  getList: getMenuPermissionList,
  onGetListSuceess: (list, rules) => {
    tableData.value = list
    options.value = rules
    defaultExpandedKeys.value = list.map(o => o.id)
  },
  create: createPermission,
  update: updatePermission,
  del: deletePermission,
  changeStatus: updatePermissionStatus,
  newForm,
  editForm,
})

const defaultExpandedKeys = ref([])
</script>

<template>
  <el-card shadow="never">
    <TableHeader @refresh="getData" @create="createNotifyAction" />
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
              @change="handleStatusChange($event, data)"
            ></el-switch>
            <el-button
              text
              type="primary"
              size="small"
              @click.stop="Edit(data)"
            >
              修改
            </el-button>
            <el-button
              text
              type="primary"
              size="small"
              @click="createNotifyAction(data)"
              >增加</el-button
            >
            <el-popconfirm
              @confirm="Delete(data)"
              title="是否要删除该记录"
              confirmButtonText="确认"
              cancelButtonText="取消"
            >
              <template #reference>
                <el-button text type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
    </el-tree>
    <Dialog
      title="修改公告"
      :isShow="showEditModel"
      @cancel="hideModel"
      @confirm="handleEditManager"
    >
      <el-form ref="NewFormRef" :rules="rules" :model="editForm">
        <el-form-item label="上级菜单" prop="rule_id">
          <el-cascader
            v-model="editForm.rule_id"
            :options="options"
            :props="{
              label: 'name',
              children: 'child',
              value: 'id',
              checkStrictly: true,
              emitPath: false,
            }"
            placeholder="请选择上级菜单"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="菜单/规则" prop="menu">
          <el-radio-group v-model="editForm.menu">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="0">权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="前端路由"
          prop="frontpath"
          v-if="editForm.menu === 1 && editForm.rule_id > 0"
        >
          <el-input v-model="editForm.frontpath"></el-input>
        </el-form-item>
        <el-form-item
          label="后端规则"
          prop="condition"
          v-if="editForm.menu === 0"
        >
          <el-input v-model="editForm.condition"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method" v-if="editForm.menu === 0">
          <el-select v-model="editForm.method" placeholder="请求方式">
            <template
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
            >
              <el-option :label="item" :value="item"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number
            v-model="editForm.order"
            :min="0"
            :max="1000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="editForm.menu === 1">
          <el-input v-model="editForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="editForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
    </Dialog>
    <Dialog
      title="新增公告"
      :isShow="showNewModel"
      @cancel="hideModel"
      @confirm="handleNewNotify"
    >
      <el-form ref="NewFormRef" :rules="rules" :model="newForm">
        <el-form-item label="上级菜单" prop="rule_id">
          <el-cascader
            v-model="newForm.rule_id"
            :options="options"
            :props="{
              label: 'name',
              children: 'child',
              value: 'id',
              checkStrictly: true,
              emitPath: false,
            }"
            placeholder="请选择上级菜单"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="菜单/规则" prop="menu">
          <el-radio-group v-model="newForm.menu">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="0">权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="newForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="前端路由"
          prop="frontpath"
          v-if="newForm.menu === 1 && newForm.rule_id > 0"
        >
          <el-input v-model="newForm.frontpath"></el-input>
        </el-form-item>
        <el-form-item
          label="后端规则"
          prop="condition"
          v-if="newForm.menu === 0"
        >
          <el-input v-model="newForm.condition"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method" v-if="newForm.menu === 0">
          <el-select v-model="newForm.method" placeholder="请求方式">
            <template
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
            >
              <el-option :label="item" :value="item"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number
            v-model="newForm.order"
            :min="0"
            :max="1000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="newForm.menu === 1">
          <IconSelect v-model="newForm.icon" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="newForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
    </Dialog>
  </el-card>
</template>

<style>
.el-tree-node__content {
  padding: 20px 0;
}
</style>
