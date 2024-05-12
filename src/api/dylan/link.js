import request from '@/utils/request'

// 查询琉璃链接列表
export function listLink(query) {
  return request({
    url: '/dylan/link/list',
    method: 'get',
    params: query
  })
}

// 查询琉璃链接详细
export function getLink(id) {
  return request({
    url: '/dylan/link/' + id,
    method: 'get'
  })
}

// 新增琉璃链接
export function addLink(data) {
  return request({
    url: '/dylan/link',
    method: 'post',
    data: data
  })
}

// 修改琉璃链接
export function updateLink(data) {
  return request({
    url: '/dylan/link',
    method: 'put',
    data: data
  })
}

// 删除琉璃链接
export function delLink(id) {
  return request({
    url: '/dylan/link/' + id,
    method: 'delete'
  })
}
