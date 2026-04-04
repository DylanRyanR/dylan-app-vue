<template>
  <div class="statistics-page">
    <div class="page-hero">
      <div class="page-hero__main">
        <div class="page-hero__eyebrow">Dylan · Statistics</div>
        <div class="page-hero__title-row">
          <h2 class="page-hero__title">琉璃数据看板</h2>
          <el-tag type="info" effect="plain" round>近30天</el-tag>
        </div>
        <p class="page-hero__desc">聚合内容、分类、标签和作者四个维度，快速查看当前数据分布与变化趋势。</p>
      </div>
      <div class="page-hero__meta">
        <div class="meta-card">
          <span class="meta-card__label">统计口径</span>
          <span class="meta-card__value">有效内容数据</span>
        </div>
        <div class="meta-card">
          <span class="meta-card__label">图表数量</span>
          <span class="meta-card__value">4 个核心视图</span>
        </div>
      </div>
    </div>

    <div v-if="pageError" class="page-status page-status--error">
      <div class="page-status__icon">!</div>
      <div class="page-status__content">
        <div class="page-status__title">统计数据加载失败</div>
        <div class="page-status__desc">接口请求未成功完成，请重试后重新查看看板数据。</div>
      </div>
      <el-button type="primary" @click="reloadAll">重新加载</el-button>
    </div>

    <el-row :gutter="20" class="panel-group">
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <div class="metric-card metric-card--blue" :class="{ 'is-loading': loading.kpi }">
          <div class="metric-card__top">
            <span class="metric-card__label">内容总数</span>
            <div class="metric-card__icon">
              <svg-icon icon-class="documentation" class-name="metric-card__icon-svg" />
            </div>
          </div>
          <template v-if="loading.kpi">
            <el-skeleton animated>
              <template #template>
                <div class="metric-card__skeleton">
                  <el-skeleton-item variant="text" style="width: 68%; height: 36px; margin-bottom: 12px;" />
                  <el-skeleton-item variant="text" style="width: 82%; height: 16px;" />
                </div>
              </template>
            </el-skeleton>
          </template>
          <template v-else>
            <div class="metric-card__value">
              <count-to :start-val="0" :end-val="kpiData.liuliCount" :duration="2600" />
            </div>
            <div class="metric-card__footer">当前系统内累计有效内容</div>
          </template>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <div class="metric-card metric-card--red" :class="{ 'is-loading': loading.kpi }">
          <div class="metric-card__top">
            <span class="metric-card__label">今日新增</span>
            <div class="metric-card__icon">
              <svg-icon icon-class="edit" class-name="metric-card__icon-svg" />
            </div>
          </div>
          <template v-if="loading.kpi">
            <el-skeleton animated>
              <template #template>
                <div class="metric-card__skeleton">
                  <el-skeleton-item variant="text" style="width: 68%; height: 36px; margin-bottom: 12px;" />
                  <el-skeleton-item variant="text" style="width: 82%; height: 16px;" />
                </div>
              </template>
            </el-skeleton>
          </template>
          <template v-else>
            <div class="metric-card__value">
              <count-to :start-val="0" :end-val="kpiData.todayLiuliCount" :duration="3000" />
            </div>
            <div class="metric-card__footer">按当天新增记录统计</div>
          </template>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <div class="metric-card metric-card--green" :class="{ 'is-loading': loading.kpi }">
          <div class="metric-card__top">
            <span class="metric-card__label">标签总数</span>
            <div class="metric-card__icon">
              <svg-icon icon-class="component" class-name="metric-card__icon-svg" />
            </div>
          </div>
          <template v-if="loading.kpi">
            <el-skeleton animated>
              <template #template>
                <div class="metric-card__skeleton">
                  <el-skeleton-item variant="text" style="width: 68%; height: 36px; margin-bottom: 12px;" />
                  <el-skeleton-item variant="text" style="width: 82%; height: 16px;" />
                </div>
              </template>
            </el-skeleton>
          </template>
          <template v-else>
            <div class="metric-card__value">
              <count-to :start-val="0" :end-val="kpiData.tagCount" :duration="3200" />
            </div>
            <div class="metric-card__footer">当前可用标签维度数量</div>
          </template>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <div class="metric-card metric-card--cyan" :class="{ 'is-loading': loading.kpi }">
          <div class="metric-card__top">
            <span class="metric-card__label">分类总数</span>
            <div class="metric-card__icon">
              <svg-icon icon-class="tree-table" class-name="metric-card__icon-svg" />
            </div>
          </div>
          <template v-if="loading.kpi">
            <el-skeleton animated>
              <template #template>
                <div class="metric-card__skeleton">
                  <el-skeleton-item variant="text" style="width: 68%; height: 36px; margin-bottom: 12px;" />
                  <el-skeleton-item variant="text" style="width: 82%; height: 16px;" />
                </div>
              </template>
            </el-skeleton>
          </template>
          <template v-else>
            <div class="metric-card__value">
              <count-to :start-val="0" :end-val="kpiData.categoryCount" :duration="3600" />
            </div>
            <div class="metric-card__footer">用于内容归类的分类项</div>
          </template>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-grid">
      <el-col :xs="24" :lg="14">
        <div class="chart-panel chart-panel--primary">
          <div class="chart-panel__header">
            <div>
              <div class="chart-panel__title">内容新增趋势</div>
              <div class="chart-panel__sub">观察近30天新增内容变化，识别峰值和活跃时段</div>
            </div>
            <el-tag type="danger" effect="light" round>趋势</el-tag>
          </div>
          <div v-loading="loading.trend" class="chart-panel__body">
            <line-chart v-if="hasTrendData" :chart-data="liuliTrendData" />
            <div v-else class="chart-empty">
              <div class="chart-empty__title">暂无趋势数据</div>
              <div class="chart-empty__desc">当前时间范围内没有可展示的新增内容趋势。</div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :lg="10">
        <div class="chart-panel">
          <div class="chart-panel__header">
            <div>
              <div class="chart-panel__title">内容分类占比</div>
              <div class="chart-panel__sub">查看不同分类下的内容结构占比</div>
            </div>
            <el-tag type="warning" effect="light" round>分布</el-tag>
          </div>
          <div v-loading="loading.category" class="chart-panel__body">
            <pie-chart v-if="hasCategoryData" :chart-data="categoryDistributionData" />
            <div v-else class="chart-empty">
              <div class="chart-empty__title">暂无分类分布数据</div>
              <div class="chart-empty__desc">当前没有分类维度数据，暂时无法生成占比图表。</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-grid">
      <el-col :xs="24" :lg="12">
        <div class="chart-panel">
          <div class="chart-panel__header">
            <div>
              <div class="chart-panel__title">热门标签 TOP 10</div>
              <div class="chart-panel__sub">按标签使用频次排序，识别高频内容主题</div>
            </div>
            <el-tag type="success" effect="light" round>排行</el-tag>
          </div>
          <div v-loading="loading.tag" class="chart-panel__body">
            <bar-chart v-if="hasTagData" :chart-data="tagRankingData" />
            <div v-else class="chart-empty">
              <div class="chart-empty__title">暂无标签排行数据</div>
              <div class="chart-empty__desc">标签使用记录为空时，这里会显示排行结果。</div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :lg="12">
        <div class="chart-panel">
          <div class="chart-panel__header">
            <div>
              <div class="chart-panel__title">作者发布排行 TOP 10</div>
              <div class="chart-panel__sub">按发布数量聚合，查看核心活跃作者分布</div>
            </div>
            <el-tag type="info" effect="light" round>作者</el-tag>
          </div>
          <div v-loading="loading.author" class="chart-panel__body">
            <radar-chart v-if="hasAuthorData" :chart-data="authorRankingData" />
            <div v-else class="chart-empty">
              <div class="chart-empty__title">暂无作者排行数据</div>
              <div class="chart-empty__desc">作者字段为空或数据不足时，这里会显示空态提示。</div>
            </div>
          </div>
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
        xAxisData: [],
        seriesData: []
      },
      categoryDistributionData: {
        seriesData: []
      },
      tagRankingData: {
        xAxisData: [],
        seriesData: []
      },
      authorRankingData: {
        xAxisData: [],
        seriesData: []
      },
      loading: {
        kpi: false,
        trend: false,
        category: false,
        tag: false,
        author: false
      },
      pageError: false
    }
  },
  computed: {
    hasTrendData() {
      return this.liuliTrendData.seriesData.length > 0
    },
    hasCategoryData() {
      return this.categoryDistributionData.seriesData.length > 0
    },
    hasTagData() {
      return this.tagRankingData.seriesData.length > 0
    },
    hasAuthorData() {
      return this.authorRankingData.seriesData.length > 0
    }
  },
  created() {
    this.reloadAll()
  },
  methods: {
    reloadAll() {
      this.pageError = false
      this.fetchKpiData()
      this.fetchLiuliTrend()
      this.fetchCategoryDistribution()
      this.fetchTagRanking()
      this.fetchAuthorRanking()
    },
    handleRequestError() {
      this.pageError = true
    },
    fetchKpiData() {
      this.loading.kpi = true
      getKpiData().then(response => {
        this.kpiData = response.data || {
          liuliCount: 0,
          todayLiuliCount: 0,
          tagCount: 0,
          categoryCount: 0
        }
      }).catch(() => {
        this.handleRequestError()
      }).finally(() => {
        this.loading.kpi = false
      })
    },
    fetchLiuliTrend() {
      this.loading.trend = true
      getLiuliTrend().then(response => {
        const data = response.data || []
        this.liuliTrendData = {
          xAxisData: data.map(item => item.name),
          seriesData: data.map(item => item.value)
        }
      }).catch(() => {
        this.liuliTrendData = {
          xAxisData: [],
          seriesData: []
        }
        this.handleRequestError()
      }).finally(() => {
        this.loading.trend = false
      })
    },
    fetchCategoryDistribution() {
      this.loading.category = true
      getCategoryDistribution().then(response => {
        this.categoryDistributionData = {
          seriesData: response.data || []
        }
      }).catch(() => {
        this.categoryDistributionData = {
          seriesData: []
        }
        this.handleRequestError()
      }).finally(() => {
        this.loading.category = false
      })
    },
    fetchTagRanking() {
      this.loading.tag = true
      getTagRanking().then(response => {
        const data = response.data || []
        this.tagRankingData = {
          xAxisData: data.map(item => item.name).reverse(),
          seriesData: data.map(item => item.value).reverse()
        }
      }).catch(() => {
        this.tagRankingData = {
          xAxisData: [],
          seriesData: []
        }
        this.handleRequestError()
      }).finally(() => {
        this.loading.tag = false
      })
    },
    fetchAuthorRanking() {
      this.loading.author = true
      getAuthorRanking().then(response => {
        const data = response.data || []
        this.authorRankingData = {
          xAxisData: data.map(item => item.name),
          seriesData: data.map(item => item.value)
        }
      }).catch(() => {
        this.authorRankingData = {
          xAxisData: [],
          seriesData: []
        }
        this.handleRequestError()
      }).finally(() => {
        this.loading.author = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-page {
  padding: 4px;
  background: linear-gradient(180deg, #f6f8fc 0%, #f2f5fb 100%);
}

.page-hero {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  margin-bottom: 20px;
  padding: 24px 28px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1f5eff 0%, #4c8dff 55%, #7aa8ff 100%);
  color: #fff;
  box-shadow: 0 12px 30px rgba(31, 94, 255, 0.18);
}

.page-hero__main {
  flex: 1;
}

.page-hero__eyebrow {
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  opacity: 0.78;
}

.page-hero__title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.page-hero__title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}

.page-hero__desc {
  max-width: 680px;
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
}

.page-hero__meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  min-width: 220px;
}

.meta-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
}

.meta-card__label {
  margin-bottom: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.76);
}

.meta-card__value {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.page-status {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px 18px;
  border: 1px solid #fde2e2;
  border-radius: 18px;
  background: linear-gradient(180deg, #fff6f6 0%, #fff 100%);
}

.page-status--error {
  box-shadow: 0 10px 24px rgba(239, 68, 68, 0.08);
}

.page-status__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #ef4444;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.page-status__content {
  flex: 1;
}

.page-status__title {
  margin-bottom: 4px;
  font-size: 15px;
  font-weight: 700;
  color: #7f1d1d;
}

.page-status__desc {
  font-size: 13px;
  line-height: 1.6;
  color: #b45309;
}

.panel-group {
  margin-bottom: 4px;
}

.card-panel-col {
  margin-bottom: 20px;
}

.metric-card {
  height: 100%;
  min-height: 148px;
  padding: 20px;
  border: 1px solid #e9eef7;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.09);
}

.metric-card.is-loading:hover {
  transform: none;
}

.metric-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.metric-card__label {
  font-size: 14px;
  font-weight: 600;
  color: #5b6475;
}

.metric-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: rgba(64, 158, 255, 0.12);
}

.metric-card__icon-svg {
  font-size: 20px;
}

.metric-card__value {
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
  color: #1f2937;
}

.metric-card__footer {
  font-size: 12px;
  line-height: 1.6;
  color: #8a94a6;
}

.metric-card__skeleton {
  padding-top: 6px;
}

.metric-card--blue .metric-card__icon {
  background: rgba(54, 163, 247, 0.14);
  color: #36a3f7;
}

.metric-card--red .metric-card__icon {
  background: rgba(244, 81, 108, 0.14);
  color: #f4516c;
}

.metric-card--green .metric-card__icon {
  background: rgba(52, 191, 163, 0.14);
  color: #34bfa3;
}

.metric-card--cyan .metric-card__icon {
  background: rgba(64, 201, 198, 0.14);
  color: #40c9c6;
}

.chart-grid {
  margin-top: 0;
}

.chart-panel {
  height: 100%;
  margin-bottom: 20px;
  padding: 18px 18px 10px;
  border: 1px solid #e9eef7;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);
}

.chart-panel--primary {
  border-color: rgba(64, 99, 255, 0.18);
  box-shadow: 0 12px 30px rgba(64, 99, 255, 0.08);
}

.chart-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
}

.chart-panel__title {
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.chart-panel__sub {
  font-size: 12px;
  line-height: 1.6;
  color: #8a94a6;
}

.chart-panel__body {
  position: relative;
  min-height: 360px;
}

.chart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  padding: 24px;
  border: 1px dashed #dbe4f0;
  border-radius: 16px;
  background: linear-gradient(180deg, #f9fbff 0%, #f5f8fd 100%);
  text-align: center;
}

.chart-empty__title {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #334155;
}

.chart-empty__desc {
  max-width: 280px;
  font-size: 13px;
  line-height: 1.7;
  color: #8a94a6;
}

:deep(.el-tag) {
  border: none;
}

@media (max-width: 992px) {
  .page-hero {
    flex-direction: column;
    padding: 22px;
  }

  .page-hero__meta {
    min-width: 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .statistics-page {
    padding: 0;
  }

  .page-hero {
    border-radius: 16px;
    padding: 18px;
  }

  .page-hero__title {
    font-size: 24px;
  }

  .page-hero__title-row {
    flex-wrap: wrap;
  }

  .page-hero__meta {
    grid-template-columns: 1fr;
  }

  .page-status {
    align-items: flex-start;
    flex-direction: column;
  }

  .metric-card {
    min-height: 136px;
    padding: 18px;
  }

  .metric-card__value {
    font-size: 26px;
  }

  .chart-panel {
    padding: 16px 16px 8px;
    border-radius: 16px;
  }

  .chart-panel__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .chart-panel__body,
  .chart-empty {
    min-height: 320px;
  }
}
</style>
