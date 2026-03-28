<template>
  <div class="app-container">
    <!-- 顶部KPI卡片 -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('liuliCount')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="documentation" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">内容总数</div>
            <count-to :start-val="0" :end-val="kpiData.liuliCount" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('todayLiuliCount')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="edit" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">今日新增</div>
            <count-to :start-val="0" :end-val="kpiData.todayLiuliCount" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('tagCount')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="component" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">标签总数</div>
            <count-to :start-val="0" :end-val="kpiData.tagCount" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('categoryCount')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="tree-table" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">分类总数</div>
            <count-to :start-val="0" :end-val="kpiData.categoryCount" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 中部图表 -->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="liuliTrendData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :chart-data="categoryDistributionData" />
        </div>
      </el-col>
    </el-row>

    <!-- 底部图表 -->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart :chart-data="tagRankingData" />
        </div>
      </el-col>
       <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <radar-chart :chart-data="authorRankingData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from '@/components/CountTo'
import { getKpiData, getLiuliTrend, getCategoryDistribution, getTagRanking, getAuthorRanking } from '@/api/dylan/statistics'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import RadarChart from './components/RadarChart'

export default {
  name: 'StatisticsDashboard',
  components: {
    CountTo,
    LineChart,
    PieChart,
    BarChart,
    RadarChart
  },
  data() {
    return {
      kpiData: {
        liuliCount: 0,
        todayLiuliCount: 0,
        tagCount: 0,
        categoryCount: 0
      },
      liuliTrendData: {
        title: '内容新增趋势 (近30天)',
        xAxisData: [],
        seriesData: []
      },
      categoryDistributionData: {
        title: '内容分类占比',
        seriesData: []
      },
      tagRankingData: {
        title: '热门标签 TOP 10',
        xAxisData: [],
        seriesData: []
      },
      authorRankingData: {
        title: '作者发布排行 TOP 10',
        xAxisData: [],
        seriesData: []
      }
    }
  },
  created() {
    this.fetchKpiData();
    this.fetchLiuliTrend();
    this.fetchCategoryDistribution();
    this.fetchTagRanking();
    this.fetchAuthorRanking();
  },
methods: {
    fetchKpiData() {
      getKpiData().then(response => {
        this.kpiData = response.data;
      })
    },
    fetchLiuliTrend() {
      getLiuliTrend().then(response => {
        this.liuliTrendData.xAxisData = response.data.map(item => item.name);
        this.liuliTrendData.seriesData = response.data.map(item => item.value);
      })
    },
    fetchCategoryDistribution() {
      getCategoryDistribution().then(response => {
        this.categoryDistributionData.seriesData = response.data;
      })
    },
    fetchTagRanking() {
      getTagRanking().then(response => {
        // 条形图数据是反的
        this.tagRankingData.xAxisData = response.data.map(item => item.name).reverse();
        this.tagRankingData.seriesData = response.data.map(item => item.value).reverse();
      })
    },
    fetchAuthorRanking() {
      getAuthorRanking().then(response => {
        this.authorRankingData.xAxisData = response.data.map(item => item.name);
        this.authorRankingData.seriesData = response.data.map(item => item.value);
      })
    },
    handleSetLineChartData(type) {
      // 可用于点击卡片时联动图表，此处备用
      console.log(type);
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>
