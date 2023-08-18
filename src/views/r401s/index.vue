<template>
  <div class="tab-container">
    <switch-info />

    <!-- <el-tag>mounted times ：{{ createdTimes }}</el-tag> -->
    <!-- <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" /> -->
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleSelect">
      <el-tab-pane key="OperationVars" label="操作变量" name="OperationVars">
        <operation-vars />
      </el-tab-pane>
      <el-tab-pane key="ConfoundingVars" label="干扰变量" name="ConfoundingVars">
        <confounding-vars />
      </el-tab-pane>
      <el-tab-pane key="StatusVars" label="状态变量" name="StatusVars">
        <status-vars />
      </el-tab-pane>
      <el-tab-pane key="ReactorPerformance" label="反应器性能" name="ReactorPerformance">
        <reactor-performance />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import SwitchInfo from './components/SwitchInfo'
import OperationVars from './components/OperationVars'
import ConfoundingVars from './components/ConfoundingVars'
import StatusVars from './components/StatusVars'
import ReactorPerformance from './components/ReactorPerformance'


export default {
  name: 'Tab',
  components: {
    SwitchInfo,
    OperationVars,
    ConfoundingVars,
    StatusVars,
    ReactorPerformance
  },
  data() {
    return {
      activeName: 'OperationVars'
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    // showCreatedTimes() {
    //   this.createdTimes = this.createdTimes + 1
    // }
    handleSelect(tab, event) {
      // console.log(tab)
      console.log(tab.$options.propsData.name)
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
