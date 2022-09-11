<script setup>
import { reactive, ref } from 'vue'
import {
  getNotifyList,
  DeleteNotify,
  editNotify,
  createNotify,
} from '@/service/api/notify.js'
import Dialog from '../../../components/dialog/index.vue'

const tableData = ref([])

const total = ref(0)
const currentPage = ref(1)

const loading = ref(false)
// 编辑
const showEditModel = ref(false)
// 新增
const showNewModel = ref(false)

// 表单ref
const NewFormRef = ref(null)
const EditFormRef = ref(null)

const newForm = reactive({
  title: '',
  content: '',
})
const editForm = reactive({
  title: '',
  content: '',
})
const editNotifyId = ref(0)

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

// 页面获取数据
const getData = page => {
  if (page) {
    currentPage.value = page
  }
  loading.value = true
  getNotifyList(currentPage.value)
    .then(res => {
      const { list, totalCount } = res.data
      tableData.value = list
      total.value = totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
getData()

// 隐藏model
const hideModel = () => {
  showEditModel.value = false
  showNewModel.value = false
}
// 删除公告
const Delete = ({ id }) =>
  DeleteNotify(id).then(() => getData(currentPage.value))

// 修改公告
const Edit = item => {
  const { title, content, id } = item
  editForm.title = title
  editForm.content = content
  editNotifyId.value = id
  showEditModel.value = true
}
// 编辑公告
const handleEditNotify = () => {
  editNotify(editNotifyId.value, editForm).then(res => {
    getData(currentPage.value)
    hideModel()
  })
}
// 新增公告
const createNotifyAction = () => (showNewModel.value = true)
const handleNewNotify = () => {
  createNotify(newForm).then(() => {
    getData(currentPage.value)
    hideModel()
  })
}
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
        @current-change="getData"
      ></el-pagination>
    </div>
    <Dialog
      title="修改公告"
      :isShow="showEditModel"
      @cancel="hideModel"
      @confirm="handleEditNotify"
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
