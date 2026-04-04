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
    autoResize: {
      type: Boolean,
      default: true
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
        color: ['#3b82f6'],
        grid: {
          left: 18,
          right: 18,
          bottom: 18,
          top: 28,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          padding: [8, 12],
          backgroundColor: 'rgba(17, 24, 39, 0.92)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#d9e2f2'
            }
          },
          axisLabel: {
            color: '#7b8794'
          }
        },
        yAxis: {
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
        },
        series: [{
          name: '新增数量',
          smooth: true,
          type: 'line',
          data: seriesData,
          showSymbol: false,
          symbolSize: 8,
          lineStyle: {
            width: 3,
            color: '#3b82f6'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.28)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.04)' }
            ])
          },
          emphasis: {
            focus: 'series'
          }
        }]
      })
    }
  }
}
</script>
