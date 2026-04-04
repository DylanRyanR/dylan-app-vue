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
          top: 18,
          left: 12,
          right: 12,
          bottom: 18,
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
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            show: false
          },
          axisTick: {
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
        yAxis: [{
          type: 'category',
          data: xAxisData,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#667085'
          }
        }],
        series: [{
          name: '使用次数',
          type: 'bar',
          data: seriesData,
          barWidth: 14,
          showBackground: true,
          backgroundStyle: {
            color: '#f3f6fb'
          },
          itemStyle: {
            color: '#10b981',
            borderRadius: [0, 8, 8, 0]
          },
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
