<script setup>
import { computed, reactive, ref } from 'vue'

import AsideItem from './components/aside-item.vue'
import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass,
} from '@/service/api/image.js'

import Dialog from '../dialog/index.vue'
import { success } from '../../utils/message'
import rules from './rules/index'

const emits = defineEmits(['listChange'])
const formRef = ref(null)
const form = reactive({
  name: '',
  order: null,
})
// 标题（新增 OR 编辑）
const title = computed(() => (currentEditId.value ? '编辑' : '新增'))
// 列表
const imageClassList = ref([])
// 一共有多少页
const totalPage = ref(0)
// 当前分页
const currentPage = ref(1)
// 加载动画
const loading = ref(false)
// 当前选中项
const activeId = ref(0)
// 当前编辑的项
const currentEditId = ref(0)
// 新增
const showDialog = ref(false)

// 页面获取数据
const getData = page => {
  if (page) {
    currentPage.value = page
  }
  loading.value = true
  getImageClassList(currentPage.value)
    .then(res => {
      imageClassList.value = res.data?.list
      totalPage.value = res.data?.totalCount
      activeId.value = res.data?.list[0]?.id
      emits('listChange', activeId.value)
    })
    .finally(() => {
      loading.value = false
    })
}
// 取消
const handelCancel = () => (showDialog.value = false)

// 新增显示弹窗
const showModal = () => {
  currentEditId.value = 0
  // 置空数据
  form.name = ''
  form.order = 50
  showDialog.value = true
}
// 初始化数据
getData()

// 新建 OR 编辑
const operateImageFn = () =>
  currentEditId.value
    ? updateImageClass(currentEditId.value, form)
    : createImageClass(form)

// 确定事件
const handelConfirm = () => {
  // 验证通过
  formRef.value.validate(valid => {
    if (!valid) return
    operateImageFn().then(() => {
      success(title.value + '成功')
      // 重新获取数据
      getData(currentEditId.value ? currentPage.value : 1)
      // 关闭dialog
      handelCancel()
    })
  })
}
// 编辑相册
const handleEdit = item => {
  const { name, order, id } = item
  form.name = name
  form.order = order
  currentEditId.value = id
  showDialog.value = true
}
// 删除相册
const handleDelete = ({ id }) => {
  loading.value = true
  deleteImageClass(id)
    .then(res => {
      getData(currentPage.value)
    })
    .finally(() => {
      loading.value = false
    })
}

// 点击每一项
const listItemClick = ({ id }) => {
  activeId.value = id
  emits('listChange', id)
}

// 暴露
defineExpose({
  showModal,
})
</script>

<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">
      <template v-for="list in imageClassList" :key="list.id">
        <AsideItem
          :active="activeId === list.id"
          @edit="handleEdit(list)"
          @delete="handleDelete(list)"
          @click="listItemClick(list)"
        >
          {{ list.name }} ({{list.images_count}})
        </AsideItem>
      </template>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="totalPage"
        small
        :pager-count="5"
        :current-page="currentPage"
        :page-size="10"
        @current-change="getData"
      ></el-pagination>
    </div>
  </el-aside>
  <Dialog
    :isShow="showDialog"
    :title="title"
    @confirm="handelConfirm"
    @cancel="handelCancel"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="相册名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number :min="0" :max="1000" v-model="form.order">
        </el-input-number>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<style scoped>
.image-aside {
  border-right: 1px solid #eee;
  position: relative;
}
.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom {
  @apply flex justify-center items-center;
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
}
</style>
