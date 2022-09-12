<script setup>
import { reactive } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import { Plus } from '@element-plus/icons-vue'
import ChooseImage from '@/components/choose-image/index.vue'
import {
  getManagerList,
  changeManagerStaus,
  createManager,
  updateManager,
  deleteManager,
} from '@/service/api/manager.js'
import { useTableOperate } from '@/hooks/useTableOperate.js'

const newForm = reactive({
  username: '',
  password: '',
  role_id: null,
  status: 1,
  avatar: '',
})
const editForm = reactive({
  username: '',
  password: '',
  role_id: null,
  status: 1,
  avatar: '',
})
const searchForm = reactive({
  keywords: '',
})
const {
  roleList,
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
  handleRepossess,
  loading,
  handleStatusChange,
  showEditModel,
  hideModel,
  showNewModel,
} = useTableOperate({
  getList: getManagerList,
  changeStatus: changeManagerStaus,
  create: createManager,
  update: updateManager,
  del: deleteManager,
  newForm,
  editForm,
  searchForm,
})

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
    },
  ],
}
</script>

<template>
  <el-card shadow="never" v-loading="loading">
    <el-form :model="searchForm">
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-input
              placeholder="搜索管理员"
              v-model="searchForm.keywords"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="6">
          <el-form-item>
            <el-button type="primary" @click="handleRepossess" plain
              ><el-icon><RefreshRight /></el-icon>重置</el-button
            >
            <el-button type="primary" @click="getData" plain
              ><el-icon><Search /></el-icon>搜索</el-button
            >
            <el-button type="primary" @click="createNotifyAction" plain>
              <el-icon><Plus /></el-icon>新增
            </el-button>
            <el-tooltip content="刷新数据">
              <el-button size="small" text @click="getData(1)">
                <el-icon :size="20"><Refresh /></el-icon>
              </el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%" fit>
      <el-table-column
        type="index"
        :index="indexMethod"
        width="80"
        align="center"
        label="序号"
      />
      <el-table-column label="管理员">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-avatar :src="row.avatar" class="mr-3" />
            <div class="flex flex-col items-start">
              <el-link type="primary" :underline="false">
                昵称：{{ row.username }}
              </el-link>
              <el-link type="info" :underline="false">
                ID：{{ row.id }}
              </el-link>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="role.name" label="所属角色" width="280" />
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
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <small v-if="scope.row.super === 1" class="text-sm text-gray-500"
            >暂无操作</small
          >
          <template v-else>
            <el-button
              plain
              type="primary"
              size="small"
              @click="Edit(scope.row)"
            >
              修改
            </el-button>
            <span @click.stop="() => {}">
              <el-popconfirm
                title="是否删除该管理员?"
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
      title="修改管理员"
      :isShow="showEditModel"
      :loading="loading"
      @cancel="hideModel"
      @confirm="handleEditManager"
    >
      <el-form
        ref="NewFormRef"
        :rules="rules"
        :model="editForm"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage />
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="editForm.role_id" placeholder="选择所属角色">
            <template v-for="option in roleList" :key="option.id">
              <el-option :label="option.name" :value="option.id"> </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="editForm.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
    </Dialog>
    <Dialog
      title="新增管理员"
      :isShow="showNewModel"
      :loading="loading"
      @cancel="hideModel"
      @confirm="handleNewNotify"
    >
      <el-form
        ref="NewFormRef"
        :rules="rules"
        :model="newForm"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newForm.password"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="newForm.avatar" />
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="newForm.role_id" placeholder="选择所属角色">
            <template v-for="option in roleList" :key="option.id">
              <el-option :label="option.name" :value="option.id"> </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="newForm.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
    </Dialog>
  </el-card>
</template>

<style scoped>
.bottom {
  @apply flex justify-center items-center;
}
</style>
