import request from '@/utils/request'

export function getControlledVars() {
  return request({
    url: '/c3h/product-net/controlled-vars',
    method: 'get'
  })
}

export function getControllVars() {
  return request({
    url: '/c3h/product-net/control-vars',
    method: 'get'
  })
}

export function getConfoundingVars() {
  return request({
    url: '/c3h/product-net/confounding-vars',
    method: 'get'
  })
}

export function getCatalyst() {
  return request({
    url: '/c3h/product-net/catalyst',
    method: 'get'
  })
}

export function getSwitchInfo() {
  return request({
    url: '/c3h/product-net/switch',
    method: 'get'
  })
}

