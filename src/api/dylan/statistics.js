import request from '@/utils/request'

// 查询核心KPI指标
export function getKpiData(params) {
  return request({
    url: '/dylan/statistics/kpi',
    method: 'get',
    params
  })
}

// 查询内容新增趋势
export function getLiuliTrend(params) {
  return request({
    url: '/dylan/statistics/liuli-trend',
    method: 'get',
    params
  })
}

// 查询分类分布
export function getCategoryDistribution(params) {
  return request({
    url: '/dylan/statistics/category-distribution',
    method: 'get',
    params
  })
}

// 查询标签排行
export function getTagRanking(params) {
  return request({
    url: '/dylan/statistics/tag-ranking',
    method: 'get',
    params
  })
}

// 查询作者发布排行
export function getAuthorRanking(params) {
  return request({
    url: '/dylan/statistics/author-ranking',
    method: 'get',
    params
  })
}
