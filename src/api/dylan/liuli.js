import request from '@/utils/request'

// 查询琉璃-内容列表
export function listLiuli(query) {
  return request({
    url: '/dylan/liuli/list',
    method: 'get',
    params: query
  })
}

// 查询琉璃-内容详细
export function getLiuli(id) {
  return request({
    url: '/dylan/liuli/' + id,
    method: 'get'
  })
}

// 新增琉璃-内容
export function addLiuli(data) {
  return request({
    url: '/dylan/liuli',
    method: 'post',
    data: data
  })
}

// 修改琉璃-内容
export function updateLiuli(data) {
  return request({
    url: '/dylan/liuli',
    method: 'put',
    data: data
  })
}

// 删除琉璃-内容
export function delLiuli(id) {
  return request({
    url: '/dylan/liuli/' + id,
    method: 'delete'
  })
}
