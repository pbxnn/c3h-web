import request from '@/utils/request'

export function getR401SAPCControl() {
  return request({
    url: '/c3h/r401s/apc-control',
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

export function setR401SAPCControl(data) {
  return request({
    url: '/c3h/r401s/apc-control',
    method: 'post',
    data
  })
}

export function setR401SControlSwitch(data) {
  return request({
    url: '/c3h/r401s/control-switch',
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
    url: '/c3h/r401s/reactor-perf',
    method: 'post',
    data
  })
}

export function getR401SAll() {
  return request({
    url: '/c3h/r401s/all',
    method: 'get'
  })
}
