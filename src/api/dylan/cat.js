import request from '@/utils/request'

// 查询类型列表
export function listCat(query) {
  return request({
    url: '/dylan/cat/list',
    method: 'get',
    params: query
  })
}

// 查询类型详细
export function getCat(id) {
  return request({
    url: '/dylan/cat/' + id,
    method: 'get'
  })
}

// 新增类型
export function addCat(data) {
  return request({
    url: '/dylan/cat',
    method: 'post',
    data: data
  })
}

// 修改类型
export function updateCat(data) {
  return request({
    url: '/dylan/cat',
    method: 'put',
    data: data
  })
}

// 删除类型
export function delCat(id) {
  return request({
    url: '/dylan/cat/' + id,
    method: 'delete'
  })
}
