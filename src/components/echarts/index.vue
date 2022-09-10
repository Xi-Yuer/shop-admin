<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

import { getEchartsInfo } from '@/service/api/index.js'
import { useResizeObserver } from '@vueuse/core'

const checkTags = [
  {
    name: '近一个月',
    value: 'month',
  },
  {
    name: '近一周',
    value: 'week',
  },
  {
    name: '近24小时',
    value: 'hour',
  },
]
const current = ref('week')

const barRef = ref(null)

function getData() {
  const option = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }
  barEcharts.showLoading()
  getEchartsInfo(current.value)
    .then(res => {
      ;(option.xAxis.data = res.data.x), (option.series[0].data = res.data.y)

      barEcharts.setOption(option)
    })
    .finally(() => {
      barEcharts.hideLoading()
    })
}

let barEcharts = null

// 挂载
onMounted(() => {
  barEcharts = echarts.init(barRef.value)
  getData()
})

// 组件销毁时将echarts也销毁
onBeforeUnmount(() => {
  if (barEcharts) {
    echarts.dispose(barEcharts)
  }
})

// 页面布局发生变化
useResizeObserver(barRef, entries => {
  barEcharts.resize()
})

const handelChoose = value => {
  current.value = value
  getData()
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-sm">订单统计</span>
        <div>
          <template v-for="item in checkTags" :key="item.value">
            <el-check-tag
              :checked="current === item.value"
              @click="handelChoose(item.value)"
              class="mx-1"
            >
              {{ item.name }}
            </el-check-tag>
          </template>
        </div>
      </div>
    </template>
    <div class="bar w-full h-[300px]" ref="barRef"></div>
  </el-card>
</template>

<style scoped lang="less"></style>
