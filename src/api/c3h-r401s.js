import request from '@/utils/request'

export function getR401SSwitchInfo() {
  return request({
    url: '/c3h/r401s/switch',
    method: 'get'
  })
}

export function getR401SOperationVars() {
  return request({
    url: '/c3h/r401s/operation-vars',
    method: 'get'
  })
}

export function getR401SConfoundingVars() {
  return request({
    url: '/c3h/r401s/confounding-vars',
    method: 'get'
  })
}

export function getR401SStatusVars() {
  return request({
    url: '/c3h/r401s/status-vars',
    method: 'get'
  })
}

export function getR401SReactorPerformance() {
  return request({
    url: '/c3h/r401s/reactor-performance',
    method: 'get'
  })
}

export function setR401SSwitch(data) {
  return request({
    url: '/c3h/r401s/switch',
    method: 'post',
    data
  })
}

export function resetR401SVar(data) {
  return request({
    url: '/c3h/r401s/reset',
    method: 'post',
    data
  })
}

export function confirmReactorPerformance(data) {
  return request({
    url: '/c3h/t401s/reactor-performance',
    method: 'post',
    data
  })
}

