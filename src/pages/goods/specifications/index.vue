<script setup>
import { nextTick, reactive, ref } from 'vue'
import {
  getSkuList,
  DeleteSku,
  editSku,
  createSku,
  updateSkuStatus,
} from '@/service/api/goods.js'
import Dialog from '@/components/dialog/index.vue'
import { useTableOperate } from '@/hooks/useTableOperate'
import TableHeader from '@/components/table-header/index.vue'
import TagInput from '../../../components/tag-input/index.vue'
import { err, success } from '../../../utils/message'

const rules = {
  name: [
    {
      required: true,
      message: '内容不能为空',
    },
  ],
}

const newForm = reactive({
  name: '',
  default: '',
  order: 50,
  status: 1,
})
const editForm = reactive({
  name: '',
  default: '',
  order: 50,
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
  getList: getSkuList,
  create: createSku,
  update: editSku,
  del: DeleteSku,
  changeStatus: updateSkuStatus,
  newForm,
  editForm,
})

const mutiDelectionIds = ref([])
const multipleTableRef = ref(null)
const handleSelectionChange = e => {
  mutiDelectionIds.value = e.map(o => o.id)
}

const deleteAllSelect = () => {
  if (!mutiDelectionIds.value.length) {
    err('请选择删除项')
    return
  }
  loading.value = true
  DeleteSku(mutiDelectionIds.value)
    .then(res => {
      console.log(res)
      success('删除成功')
      if (multipleTableRef.value) {
        multipleTableRef.value.clearSelection()
      }
      getData()
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <el-card shadow="never" v-loading="loading">
    <!-- 表格顶部操作区 -->
    <TableHeader
      @create="createNotifyAction"
      @refresh="getData(currentPage.value)"
      @delete="deleteAllSelect"
      layout="create,refresh,delete"
    />
    <el-table
      :data="tableData"
      ref="multipleTableRef"
      stripe
      style="width: 100%"
      fit
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="80"
      />
      <el-table-column prop="name" label="规格名称" width="200" />
      <el-table-column prop="default" label="规格值" />
      <el-table-column prop="order" label="排序" />
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
          <el-button plain type="primary" size="small" @click="Edit(scope.row)">
            修改
          </el-button>
          <span @click.stop="() => {}">
            <el-popconfirm
              title="是否删除该规格?"
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
      title="修改规格"
      :isShow="showEditModel"
      @cancel="hideModel"
      @confirm="handleEditManager"
    >
      <el-form
        ref="EditFormRef"
        :rules="rules"
        :model="editForm"
        label-width="80px"
      >
        <el-form-item label="规格名称" prop="name">
          <el-input
            placeholder="请输入规格名称"
            v-model="editForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number
            placeholder="排序"
            v-model="editForm.order"
            :min="0"
            :max="1000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <TagInput v-model="editForm.default" />
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
      title="新增规格"
      :isShow="showNewModel"
      @cancel="hideModel"
      @confirm="handleNewNotify"
    >
      <el-form
        ref="EditFormRef"
        :rules="rules"
        :model="newForm"
        label-width="80px"
      >
        <el-form-item label="规格名称" prop="name">
          <el-input
            placeholder="请输入规格名称"
            v-model="newForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number
            placeholder="排序"
            v-model="newForm.order"
            :min="0"
            :max="1000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <TagInput v-model="newForm.default" />
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
  </el-card>
</template>

<style scoped>
.bottom {
  @apply flex justify-center items-center;
}
</style>
