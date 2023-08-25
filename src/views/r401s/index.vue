<template>
  <div class="tab-container">
    <APC-control :props-apc-vars="apcVars" />

    <!-- <el-tag>mounted times ：{{ createdTimes }}</el-tag> -->
    <!-- <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" /> -->
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleSelect">
      <el-tab-pane key="OperationVars" label="操作变量" name="OperationVars">
        <operation-vars :props-op-vars="opVars" />
      </el-tab-pane>
      <el-tab-pane key="ConfoundingVars" label="干扰变量" name="ConfoundingVars">
        <confounding-vars :props-cf-vars="cfVars" />
      </el-tab-pane>
      <el-tab-pane key="StatusVars" label="状态变量" name="StatusVars">
        <status-vars :props-st-vars="stVars" />
      </el-tab-pane>
      <el-tab-pane key="ReactorPerformance" label="反应器性能" name="ReactorPerformance">
        <reactor-performance :props-rp-vars="rpVars" />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import APCControl from './components/APCControl'
import OperationVars from './components/OperationVars'
import ConfoundingVars from './components/ConfoundingVars'
import StatusVars from './components/StatusVars'
import ReactorPerformance from './components/ReactorPerformance'

import { getR401SAll } from '@/api/c3h-r401s'

export default {
  name: 'Tab',
  components: {
    APCControl,
    OperationVars,
    ConfoundingVars,
    StatusVars,
    ReactorPerformance
  },
  data() {
    return {
      activeName: 'OperationVars',
      apcVars: null,
      opVars: null,
      cfVars: null,
      stVars: null,
      rpVars: null,
      ws: null
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  mounted() {
    // this.getOperationVars()
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    // this.startInterval()
    this.getAll()
    this.initWebSocket()
  },
  beforeDestroy() {
    // this.stopInterval()
    this.wsOnClose()
  },
  methods: {
    // showCreatedTimes() {
    //   this.createdTimes = this.createdTimes + 1
    // }
    handleSelect(tab, event) {
      // console.log(tab)
      // console.log(tab.$options.propsData.name)
    },
    async getAll() {
      this.listLoading = true

      await getR401SAll().then((res) => {
        this.apcVars = res.data.ApcVars
        this.opVars = res.data.OperationVars
        this.cfVars = res.data.ConfoundingVars
        this.stVars = res.data.StatusVars
        this.rpVars = res.data.ReactorPerformanceVars
        this.listLoading = false
      }, (response) => {
        this.listLoading = false
      })
    },
    startInterval() {
      this.timer = setInterval(() => {
        this.getOperationVars()
      }, 5000)
    },
    stopInterval() {
      clearInterval(this.timer)
    },
    initWebSocket() {
      const wsUri = process.env.VUE_APP_BASE_WS_SERVER
      this.ws = new WebSocket(wsUri)
      this.ws.onopen = this.wsOnOpen
      this.ws.onerror = this.wsOnError
      this.ws.onmessage = this.wsOnMessage
      this.ws.onclose = this.wsOnClose
      this.ws.binaryType = 'arraybuffer'
      console.log(wsUri)
    },
    wsOnOpen() {
      console.log('WebSocket连接成功')
    },
    wsOnError(e) {
      console.log('WebSocket连接发生错误', e)
    },
    wsOnMessage(e) {
      // const dv = new DataView(e.data)
      // const msgType = dv.getInt32(0)
      const d = event.data.slice(4)

      // const dv = new DataView(d)
      // const d = Buffer.from(evt.data).toJSON()
      const uint8Arr = new Uint8Array(d)
      const decoder = new TextDecoder()
      const jsonStr = decoder.decode(uint8Arr)
      const res = JSON.parse(jsonStr)
      // console.log('on message', msgType, jsonObj)
      if (res.code === 20000) {
        this.apcVars = res.data.ApcVars
        this.opVars = res.data.OperationVars
        this.cfVars = res.data.ConfoundingVars
        this.stVars = res.data.StatusVars
        this.rpVars = res.data.ReactorPerformanceVars
      }
    },
    wsOnSend(wsReq) {
      // this.ws.send(wsReq)
      console.log('on send', wsReq)
    },
    wsOnClose(e) {
      console.log('connection closed (' + e + ')')
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
