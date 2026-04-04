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
    setOptions({ seriesData } = {}) {
      this.chart.setOption({
        color: ['#f59e0b', '#60a5fa', '#34d399', '#f87171', '#a78bfa', '#22d3ee'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}：{c} ({d}%)',
          backgroundColor: 'rgba(17, 24, 39, 0.92)',
          borderWidth: 0,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          orient: 'vertical',
          right: 0,
          top: 'center',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#667085'
          }
        },
        series: [
          {
            name: '分类占比',
            type: 'pie',
            radius: ['48%', '72%'],
            center: ['35%', '52%'],
            avoidLabelOverlap: true,
            label: {
              show: false
            },
            emphasis: {
              scale: true,
              itemStyle: {
                shadowBlur: 16,
                shadowOffsetX: 0,
                shadowColor: 'rgba(15, 23, 42, 0.16)'
              }
            },
            data: seriesData
          }
        ]
      })
    }
  }
}
</script>
