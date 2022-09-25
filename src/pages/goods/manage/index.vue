<script setup>
import { reactive, ref } from 'vue'
import Dialog from '@/components/dialog/index.vue'
import { Plus } from '@element-plus/icons-vue'
import ChooseImage from '@/components/choose-image/index.vue'
import {
  getGoodsList,
  changeGoodsStaus,
  createGoods,
  updateGoods,
  deleteGoods,
} from '@/service/api/goods.js'
import { useTableOperate } from '@/hooks/useTableOperate.js'

const newForm = reactive({})
const editForm = reactive({})

const searchForm = reactive({
  title: '',
  tab: 'all',
  category_id: null,
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
  getList: getGoodsList,
  changeStatus: changeGoodsStaus,
  create: createGoods,
  update: updateGoods,
  del: deleteGoods,
  newForm,
  editForm,
  searchForm,
})

const tabBars = ref([
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'checking',
    name: '审核',
  },
  {
    key: 'saling',
    name: '出售中',
  },
  {
    key: 'off',
    name: '已下架',
  },
  {
    key: 'min_stock',
    name: '库存预警',
  },
  {
    key: 'delete',
    name: '回收站',
  },
])
</script>

<template>
  <div>
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
      <template v-for="(item, index) in tabBars" :key="item.key">
        <el-tab-pane :label="item.name" :name="item.key"></el-tab-pane>
      </template>
    </el-tabs>
    <el-card shadow="never" v-loading="loading">
      <el-form :model="searchForm">
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-input
                placeholder="搜索商品"
                v-model="searchForm.title"
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
        <el-table-column label="商品">
          <template #default="{ row }">
            <div class="flex">
              <el-image
                :src="row.cover"
                class="rounded mr-4"
                fit="cover"
                :lazy="true"
                style="width: 150px; height: 100px"
              >
              </el-image>
              <div class="flex-1">
                <p>{{ row.title }}</p>
                <div>
                  <span class="text-rose-500">￥{{ row.min_price }}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="text-gray-500 text-xs"
                    >￥{{ row.min_oprice }}</span
                  >
                </div>
                <p class="text-gray-400 text-xs mb-1">
                  分类：{{ row.category?.name || '未分类' }}
                </p>
                <p class="text-gray-400 text-xs">
                  创建时间：{{ row.create_time }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sale_count" label="实际销量" width="90" />
        <el-table-column label="审核状态" width="180">
          <template #default="{ row }">
            <div>
              <template v-if="row.ischeck === 0">
                <el-button type="success" size="small" plain
                  >审核通过</el-button
                >
                <el-button type="danger" size="small" plain>审核拒绝</el-button>
              </template>
              <template v-else>
                <el-button
                  :type="row.ischeck == 1 ? 'success' : 'danger'"
                  size="small"
                  >{{
                    row.ischeck === 1 ? '审核通过' : '审核不通过'
                  }}</el-button
                >
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品状态"
          width="120"
          align="center"
          v-if="searchForm.tab !== 'delete'"
        >
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'danger'" size="small">
              {{ row.status ? '上架' : '仓库' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="总库存" width="90" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div v-if="searchForm.tab !== 'delete'">
              <el-button
                plain
                type="primary"
                size="small"
                @click="Edit(scope.row)"
              >
                修改
              </el-button>
              <el-button plain type="primary" size="small">
                商品规格
              </el-button>
              <el-button plain type="primary" size="small">
                设置轮播图
              </el-button>
              <el-button plain type="primary" size="small">
                商品详情
              </el-button>
              <span @click.stop="() => {}">
                <el-popconfirm
                  title="是否删除该商品?"
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  @confirm.stop="Delete(scope.row)"
                >
                  <template #reference>
                    <el-button type="danger" size="small" plain text>
                      <el-button plain type="danger" size="small"
                        >删除</el-button
                      >
                    </el-button>
                  </template>
                </el-popconfirm>
              </span>
            </div>
            <span v-else>暂无操作</span>
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
        <el-form ref="NewFormRef" :model="editForm" label-width="90px">
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
        <el-form ref="NewFormRef" :model="newForm" label-width="90px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="newForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="newForm.password"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <!-- 选择图片组件 -->
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
  </div>
</template>

<style scoped>
.bottom {
  @apply flex justify-center items-center;
}
</style>
