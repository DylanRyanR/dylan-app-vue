import request from '@/utils/request'

// 查询核心KPI指标
export function getKpiData() {
  return request({
    url: '/dylan/statistics/kpi',
    method: 'get'
  })
}

// 查询内容新增趋势
export function getLiuliTrend() {
  return request({
    url: '/dylan/statistics/liuli-trend',
    method: 'get'
  })
}

// 查询分类分布
export function getCategoryDistribution() {
  return request({
    url: '/dylan/statistics/category-distribution',
    method: 'get'
  })
}

// 查询标签排行
export function getTagRanking() {
  return request({
    url: '/dylan/statistics/tag-ranking',
    method: 'get'
  })
}

// 查询作者发布排行
export function getAuthorRanking() {
  return request({
    url: '/dylan/statistics/author-ranking',
    method: 'get'
  })
}
