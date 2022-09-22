<script setup>
import { nextTick, reactive, ref } from 'vue'
import {
  getRoleList,
  DeleteRole,
  editRole,
  createRole,
  updateStatus,
  setRoleRule,
} from '@/service/api/role.js'
import { getMenuPermissionList } from '@/service/api/menu-permission.js'
import Dialog from '@/components/dialog/index.vue'
import { useTableOperate } from '@/hooks/useTableOperate'
import TableHeader from '@/components/table-header/index.vue'
import { success } from '../../../utils/message'

const rules = {
  name: [
    {
      required: true,
      message: '内容不能为空',
    },
  ],
  desc: [
    {
      required: true,
      message: '内容不能为空',
    },
  ],
}

const elTreeRef = ref(null)
const ruleList = ref([])
const ruleId = ref(0)
const rulesId = ref([])
const checkStrictly = ref(false)

// 当前用户拥有的权限id
const rulesIds = ref([])

const showRoleModel = ref(false)
const setRole = row => {
  ruleId.value = row.id
  checkStrictly.value = true
  getMenuPermissionList(1).then(res => {
    const { list } = res.data
    ruleList.value = list
  })
  showRoleModel.value = true
  rulesIds.value = row.rules.map(o => o.id)
  nextTick(() => {
    elTreeRef.value.setCheckedKeys(rulesIds.value)
  })
  checkStrictly.value = false
}
// 配置用户权限选中每一项
const hdandleTreeCheck = (...e) => {
  const { checkedKeys, halfCheckedKeys } = e[1]
  rulesId.value = [...checkedKeys, ...halfCheckedKeys]
}
// 配置权限action
const handleSetRole = () => {
  setRoleRule(ruleId.value, rulesId.value).then(res => {
    showRoleModel.value = false
    success('更新成功')
  })
}

const newForm = reactive({
  name: '',
  desc: '',
  status: 1,
})
const editForm = reactive({
  name: '',
  desc: '',
  status: 1,
})

const {
  Delete,
  total,
  Edit,
  getData,
  currentPage,
  indexMethod,
  pageChange,
  handleEditManager,
  createNotifyAction,
  handleNewNotify,
  tableData,
  loading,
  showEditModel,
  hideModel,
  showNewModel,
  handleStatusChange,
} = useTableOperate({
  getList: getRoleList,
  create: createRole,
  update: editRole,
  del: DeleteRole,
  changeStatus: updateStatus,
  newForm,
  editForm,
})
</script>

<template>
  <el-card shadow="never" v-loading="loading">
    <!-- 表格顶部操作区 -->
    <TableHeader
      @create="createNotifyAction"
      @refresh="getData(currentPage.value)"
    />
    <el-table :data="tableData" stripe style="width: 100%" fit>
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80"
      />
      <el-table-column prop="name" label="角色名称" width="200" />
      <el-table-column prop="desc" label="角色描述" />
      <el-table-column prop="status" label="状态" width="180">
        <template #default="{ row }">
          <el-switch
            :modelValue="row.status"
            :active-value="1"
            :inactive-value="0"
            :loading="row.statusLoading"
            :disabled="row.super === 1"
            @change="handleStatusChange($event, row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template #default="scope">
          <el-button
            plain
            type="primary"
            size="small"
            @click="setRole(scope.row)"
          >
            权限配置
          </el-button>
          <el-button plain type="primary" size="small" @click="Edit(scope.row)">
            修改
          </el-button>
          <span @click.stop="() => {}">
            <el-popconfirm
              title="是否删除该角色?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm.stop="Delete(scope.row)"
            >
              <template #reference>
                <el-button type="danger" size="small" plain text>
                  <el-button plain type="danger" size="small">删除</el-button>
                </el-button>
              </template>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom mt-4">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="total"
        small
        :pager-count="5"
        :current-page="currentPage"
        :page-size="10"
        @current-change="pageChange"
      ></el-pagination>
    </div>
    <Dialog
      title="修改角色"
      :isShow="showEditModel"
      @cancel="hideModel"
      @confirm="handleEditManager"
    >
      <el-form ref="EditFormRef" :rules="rules" :model="editForm">
        <el-form-item label="角色名称" prop="name">
          <el-input
            placeholder="请输入角色名"
            v-model="editForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入角色"
            v-model="editForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态" width="180">
          <el-switch
            v-model="editForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
    </Dialog>
    <Dialog
      title="新增角色"
      :isShow="showNewModel"
      @cancel="hideModel"
      @confirm="handleNewNotify"
    >
      <el-form ref="EditFormRef" :rules="rules" :model="newForm">
        <el-form-item label="角色名称" prop="name">
          <el-input
            placeholder="请输入角色名"
            v-model="newForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入角色描述"
            v-model="newForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态" width="180">
          <el-switch
            v-model="newForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
    </Dialog>
    <Dialog
      title="权限配置"
      :isShow="showRoleModel"
      @cancel="() => (showRoleModel = false)"
      @confirm="handleSetRole"
    >
      <el-tree
        :data="ruleList"
        ref="elTreeRef"
        node-key="id"
        :check-strictly="checkStrictly"
        :props="{ label: 'name', children: 'child' }"
        show-checkbox
        @check="hdandleTreeCheck"
      >
        <template #default="{ node, data }">
          <div class="flex items-center">
            <el-tag :type="data.menu ? '' : 'info'" size="small">
              {{ data.menu ? '菜单' : '权限' }}</el-tag
            >
            <span class="ml-2 text-sm"> {{ data.name }}</span>
          </div>
        </template>
      </el-tree>
    </Dialog>
  </el-card>
</template>

<style scoped>
.bottom {
  @apply flex justify-center items-center;
}
</style>
