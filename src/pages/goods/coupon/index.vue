<script setup>
import { computed, reactive, ref, watch } from 'vue'
import {
  getCouponList,
  deleteCoupon,
  editCoupon,
  createCoupon,
  updateCouponStatus,
} from '@/service/api/coupon.js'
import Dialog from '@/components/dialog/index.vue'
import { useTableOperate } from '@/hooks/useTableOperate'
import { formatStatus } from '@/utils/formatStatus.js'
import TableHeader from '@/components/table-header/index.vue'
const newForm = reactive({
  name: '',
  type: 0, // 0 满减
  value: 0, // 优惠券价值
  total: 100, // 发行量
  min_price: 0, // 最低消费价格
  start_time: null,
  end_time: null,
  order: 50,
  desc: '',
})
const editForm = reactive({
  name: '',
  type: 0, // 0 满减
  value: 0, // 优惠券价值
  total: 100, // 发行量
  min_price: 0, // 最低消费价格
  start_time: null,
  end_time: null,
  order: 50,
  desc: '',
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
  getList: getCouponList,
  create: createCoupon,
  update: editCoupon,
  del: deleteCoupon,
  changeStatus: updateCouponStatus,
  onGetListSuceess: res => {
    tableData.value = res.map(o => {
      // 转化优惠券状态
      o.statusText = formatStatus(o)
      return o
    })
  },
  newForm,
  editForm,
})
const timerange = ref()
// 修改表单开始/结束时间（时间戳）
watch(
  () => timerange.value,
  () => {
    ;(newForm.start_time = new Date(timerange.value[0]).getTime()),
      (newForm.end_time = new Date(timerange.value[1]).getTime())
  },
  {
    deep: true,
  }
)
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
      <el-table-column label="优惠券名称" width="350px">
        <template #default="{ row }">
          <div
            :class="[row.status === 0 ? 'active' : 'inactive']"
            class="border border-dashed py-2 px-4 rounded"
          >
            <h5 class="font-bold text-md">{{ row.name }}</h5>
            <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="优惠">
        <template #default="{ row }">
          {{ row.type === 0 ? '满减' : '折扣' }}
          {{ row.type === 0 ? '￥' + row.value : row.value + '折' }}
        </template>
      </el-table-column>
      <el-table-column prop="total" label="发放数量" />
      <el-table-column prop="used" label="已使用" />
      <el-table-column prop="statusText" label="状态" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button
            plain
            type="primary"
            size="small"
            @click="Edit(scope.row)"
            v-if="scope.row.statusText === '未开始'"
          >
            修改
          </el-button>
          <span @click.stop="() => {}" v-if="scope.row.statusText == '领取中'">
            <el-popconfirm
              title="是否让该优惠券失效?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm.stop="updateCouponStatus(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" plain text>
                  <el-button plain type="warning" size="small">失效</el-button>
                </el-button>
              </template>
            </el-popconfirm>
          </span>
          <span @click.stop="() => {}" v-if="scope.row.statusText !== '领取中'">
            <el-popconfirm
              title="是否删除该优惠券?"
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
      title="新增优惠券"
      :isShow="showNewModel"
      @cancel="hideModel"
      @confirm="handleNewNotify"
    >
      <el-form ref="NewFormRef" :model="newForm" label-width="100px">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="newForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="newForm.type">
            <el-radio :label="0">满减</el-radio>
            <el-radio :label="1">折扣</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面值" prop="value" style="width: 60%">
          <el-input v-model="newForm.value">
            <template #append>
              {{ newForm.type ? '折扣' : '元' }}
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="发行量" prop="total">
          <el-input-number
            v-model="newForm.total"
            :min="0"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="最低使用价格" prop="min_price">
          <el-input-number
            v-model="newForm.min_price"
            :min="10"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number
            v-model="newForm.order"
            :min="0"
            :max="1000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            type="datetimerange"
            v-model="timerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="newForm.desc"></el-input>
        </el-form-item>
      </el-form>
    </Dialog>
    <Dialog
      title="修改优惠券"
      :isShow="showEditModel"
      @cancel="hideModel"
      @confirm="handleEditManager"
    >
      <el-form ref="EditFormRef" :model="editForm" label-width="100px">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="editForm.type">
            <el-radio :label="0">满减</el-radio>
            <el-radio :label="1">折扣</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面值" prop="value" style="width: 60%">
          <el-input v-model="editForm.value">
            <template #append>
              {{ editForm.type ? '折扣' : '元' }}
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="发行量" prop="total">
          <el-input-number
            v-model="editForm.total"
            :min="0"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="最低使用价格" prop="min_price">
          <el-input-number v-model="editForm.min_price"></el-input-number>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number
            v-model="editForm.order"
            :min="0"
            :max="1000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            type="datetimerange"
            v-model="timerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="editForm.desc"></el-input>
        </el-form-item>
      </el-form>
    </Dialog>
  </el-card>
</template>

<style scoped>
.bottom {
  @apply flex justify-center items-center;
}
/* 激活状态 */
.active {
  @apply border-rose-200 bg-rose-50 text-red-400;
}

/* 非激活状态 */
.inactive {
  @apply border-gray-200 bg-gray-50 text-gray-300;
}
</style>
