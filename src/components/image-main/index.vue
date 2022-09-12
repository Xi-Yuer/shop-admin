<script setup>
import {
  getImageListById,
  reNameImage,
  deleteImage,
} from '@/service/api/image.js'
import { computed, reactive, ref } from 'vue'
import { err, success } from '@/utils/message'
import Dialog from '../dialog/index.vue'
import UploadFile from '../upload-file/index.vue'

defineProps({
  showCheck: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['chechedImage'])

// 一共有多少页
const totalPage = ref(0)
// 当前分页
const currentPage = ref(1)
const currentId = ref()
// 当前修改图片的ID
const currentImageId = ref()
// 编辑图片弹出框
const isShow = ref(false)
// 上传图片弹出框
const isShowUpload = ref(false)
// 加载动画
const loading = ref(false)

const ImageList = ref([])
const form = reactive({
  name: '',
})

// 页面获取数据
const getData = page => {
  if (page) {
    currentPage.value = page
  }
  loading.value = true
  getImageListById(currentId.value, currentPage.value)
    .then(res => {
      ImageList.value = res.data?.list.map(o => {
        o.checked = false
        return o
      })
      totalPage.value = res.data?.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
const loadData = id => {
  currentPage.value = 1
  currentId.value = id
  getData()
}

// 选中的图片
const checkedImage = computed(() => ImageList.value.filter(o => o.checked))
// 选中图片
const handleChange = item => {
  if (item.checked && checkedImage.value.length > 1) {
    item.checked = false
    err('最多只能选中一张')
    return
  }
  emits('chechedImage', checkedImage.value)
}

// 重命名图片
const reNameAction = ({ id, name }) => {
  form.name = name
  isShow.value = true
  currentImageId.value = id
}
const handleReName = () => {
  isShow.value = false
  reNameImage(currentImageId.value, form.name).then(res => {
    getData()
  })
}
// 删除图片
const deleteImageAction = ({ id }) => {
  deleteImage([id]).then(res => {
    getData()
  })
}
const rules = {
  name: [
    {
      required: true,
      message: '图片名称不能为空',
    },
  ],
}
const handleCancel = () => (isShow.value = false)
// 打开上传弹出框
const openUploadFile = () => (isShowUpload.value = true)
// 取消上传
const handleCancelUpload = () => (isShowUpload.value = false)

// 确定上传
const handleUploadFile = () => {}

// 上传成功
const handleUploadSuccess = () => {
  success('上传成功')
}
defineExpose({
  loadData,
  openUploadFile,
})
</script>

<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top p-3">
      <el-row :gutter="10">
        <template v-for="(item, index) in ImageList" :key="index">
          <el-col :span="6">
            <el-card
              shadow="hover"
              class="relative mb-4"
              :body-style="{ padding: 0 }"
              :class="{ 'border-blue-500': item.checked }"
            >
              <el-image
                :src="item.url"
                fit="cover"
                class="w-full h-[150px]"
                style="width: 100%"
                :preview-src-list="[item.url]"
                :initial-index="0"
              ></el-image>
              <div class="image-title">{{ item.name }}</div>
              <div class="flex items-center justify-center p-2">
                <el-checkbox
                  v-if="showCheck"
                  label="选择"
                  v-model="item.checked"
                  @change="handleChange(item)"
                >
                </el-checkbox>
                <el-button
                  size="small"
                  type="primary"
                  @click="reNameAction(item)"
                  text
                >
                  重命名
                </el-button>
                <el-popconfirm
                  title="确定删除图片?"
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  @confirm="deleteImageAction(item)"
                >
                  <template #reference>
                    <el-button size="small" type="danger" text>删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </el-card>
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev,pager,next"
        :total="totalPage"
        :current-page="currentPage"
        :page-size="10"
        :pager-count="5"
        @current-change="getData"
      ></el-pagination>
    </div>
    <el-empty v-if="!ImageList.length" description="暂无数据"></el-empty>
  </el-main>
  <!-- 编辑图片 -->
  <Dialog
    :isShow="isShow"
    title="重命名"
    @confirm="handleReName"
    @cancel="handleCancel"
  >
    <el-form :rules="rules" :model="form">
      <el-form-item label="图片名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </Dialog>
  <!-- 上传图片 -->
  <Dialog :isShow="isShowUpload" title="上传图片" @cancel="handleCancelUpload">
    <UploadFile
      :data="{ image_class_id: currentId }"
      @success="handleUploadSuccess"
    />
    <template #footer><span></span></template>
  </Dialog>
</template>

<style scoped>
.image-main {
  position: relative;
  @apply flex justify-center items-center;
}
.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom {
  @apply flex justify-center items-center;
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
}
.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>
