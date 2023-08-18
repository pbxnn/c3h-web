import request from '@/utils/request'

export function getR401APC() {
  return request({
    url: '/c3h/control-net/r401-apc',
    method: 'get'
  })
}

export function getOperationVars() {
  return request({
    url: '/c3h/control-net/operation-vars',
    method: 'get'
  })
}

export function setR401APC(data) {
  return request({
    url: '/c3h/control-net/r401-apc',
    method: 'post',
    data
  })
}

export function setOperationVars(data) {
  return request({
    url: '/c3h/control-net/operation-vars',
    method: 'post',
    data
  })
}

export function confirmReactorPerformance(data) {
  return request({
    url: '/c3h/control-net/reactor-performance',
    method: 'post',
    data
  })
}

// export function getConfoundingVars() {
//   return request({
//     url: '/c3h/product-net/confounding-vars',
//     method: 'get'
//   })
// }

// export function getCatalyst() {
//   return request({
//     url: '/c3h/product-net/catalyst',
//     method: 'get'
//   })
// }

// export function getSwitchInfo() {
//   return request({
//     url: '/c3h/product-net/switch',
//     method: 'get'
//   })
// }

