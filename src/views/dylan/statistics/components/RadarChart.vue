<template>
  <div :class="className" :style="{ height, width }" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeUnmount() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    setOptions({ xAxisData, seriesData } = {}) {
      this.chart.setOption({
        grid: {
          top: 24,
          left: 18,
          right: 18,
          bottom: 48,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          padding: [8, 12],
          backgroundColor: 'rgba(17, 24, 39, 0.92)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [{
          type: 'category',
          data: xAxisData,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#d9e2f2'
            }
          },
          axisLabel: {
            color: '#667085',
            interval: 0,
            rotate: 28
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#7b8794'
          },
          splitLine: {
            lineStyle: {
              color: '#edf2f7'
            }
          }
        }],
        series: [{
          name: '发布数量',
          type: 'bar',
          data: seriesData,
          barWidth: 18,
          itemStyle: {
            color: '#06b6d4',
            borderRadius: [8, 8, 0, 0]
          },
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
