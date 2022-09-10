<script setup>
import { ref } from 'vue'
import { getPageInfo, getPageTip } from '@/service/api'
import Counter from '@/components/counter/index.vue'
import Nav from '../components/nav.vue'
import Echarts from '../../../components/echarts/index.vue'
import TipCard from '../components/tip-card.vue'

const panels = ref([])
const goodsTips = ref([])
const orderTips = ref([])
getPageInfo().then(res => {
  panels.value = res.data.panels
})
getPageTip().then(res => {
  goodsTips.value = res.data.goods
  orderTips.value = res.data.order
})
</script>

<template>
  <div>
    <el-row :gutter="20">
      <template v-for="i in 4" :key="i" v-if="!panels.length">
        <el-col :span="6">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item
                      variant="text"
                      style="width: 40%"
                    ></el-skeleton-item>
                    <el-skeleton-item
                      variant="text"
                      style="width: 30%"
                    ></el-skeleton-item>
                  </div>
                </template>
                <span class="text-3xl font-bold text-gray-500"
                  ><el-skeleton-item
                    variant="text"
                    style="width: 80%"
                  ></el-skeleton-item
                ></span>
                <el-divider border-style="dashed" />
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item
                    variant="text"
                    style="width: 50%"
                  ></el-skeleton-item>
                  <el-skeleton-item
                    variant="text"
                    style="width: 10%"
                  ></el-skeleton-item>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <template v-for="item in panels" :key="item.value" v-else>
        <el-col :span="6">
          <el-card shadow="hover" class="border-0">
            <template #header>
              <div class="flex justify-between">
                <span class="text-sm">{{ item.title }}</span>
                <el-tag :type="item.unitColor" effect="plain">
                  {{ item.unit }}
                </el-tag>
              </div>
            </template>
            <span class="text-3xl font-bold text-gray-500">
              <Counter :value="item.value" />
            </span>
            <el-divider border-style="dashed" />
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ item.subTitle }}</span>
              <span>{{ item.subValue }}</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <Nav />
    <el-row :gutter="20" class="mt-4">
      <el-col :span="12">
        <Echarts />
      </el-col>
      <el-col :span="12">
        <TipCard
          title="店铺及商品提示"
          tip="店铺及商品提示"
          :tips="goodsTips"
        />
        <TipCard
          title="交易提示"
          tip="需要处理的交易订单"
          :tips="orderTips"
          class="mt-4"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less"></style>
