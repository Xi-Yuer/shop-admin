<script setup>
import { reactive } from 'vue'
import {
  getNotifyList,
  DeleteNotify,
  editNotify,
  createNotify,
} from '@/service/api/notify.js'
import Dialog from '../../../components/dialog/index.vue'
import { useTableOperate } from '../../../hooks/useTableOperate'

const rules = {
  title: [
    {
      required: true,
      message: '标题不能为空',
    },
  ],
  content: [
    {
      required: true,
      message: '内容不能为空',
    },
  ],
}
const newForm = reactive({
  title: '',
  content: '',
})
const editForm = reactive({
  title: '',
  content: '',
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
} = useTableOperate({
  getList: getNotifyList,
  create: createNotify,
  update: editNotify,
  del: DeleteNotify,
  newForm,
  editForm,
})
</script>

<template>
  <el-card shadow="never" v-loading="loading">
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" @click="createNotifyAction"> 新增 </el-button>
      <el-tooltip content="刷新数据">
        <el-button size="small" text @click="getData(1)">
          <el-icon :size="20"><Refresh /></el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" fit>
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80"
      />
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="update_time" label="发布时间" width="580" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button plain type="primary" size="small" @click="Edit(scope.row)">
            修改
          </el-button>
          <span @click.stop="() => {}">
            <el-popconfirm
              title="是否删除该公告?"
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
      title="修改公告"
      :isShow="showEditModel"
      @cancel="hideModel"
      @confirm="handleEditManager"
    >
      <el-form ref="EditFormRef" :rules="rules" :model="editForm">
        <el-form-item label="公告标题" prop="title">
          <el-input
            placeholder="请输入公告标题"
            v-model="editForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            type="textarea"
            placeholder="请输入公告详情"
            :rows="5"
            v-model="editForm.content"
          ></el-input>
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
        <el-form-item label="公告标题" prop="title">
          <el-input
            placeholder="请输入公告标题"
            v-model="newForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入公告详情"
            v-model="newForm.content"
          ></el-input>
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
