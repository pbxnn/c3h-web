<template>
  <div class="tab-container">
    <panel-group />

    <!-- <el-tag>mounted times ：{{ createdTimes }}</el-tag> -->
    <!-- <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" /> -->
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleSelect">
      <!-- <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <item.template v-if="activeName==item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane> -->

      <!-- <el-tab-pane key="R401_APC_Controller" label="R401 APC Controller" name="R401_APC_Controller">
        <apc-controller />
      </el-tab-pane> -->
      <el-tab-pane key="OperationVars" label="操作变量" name="OperationVars">
        <operation-vars />
      </el-tab-pane>
      <el-tab-pane key="ReactorPerformance" label="反应器性能" name="ReactorPerformance">
        <reactor-performance />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import ApcController from './components/ApcController'
import OperationVars from './components/OperationVars'
import ReactorPerformance from './components/ReactorPerformance'
import PanelGroup from './components/PanelGroup'

export default {
  name: 'Tab',
  components: {
    ApcController,
    OperationVars,
    ReactorPerformance,
    PanelGroup
  },
  data() {
    return {
      tabMapOptions: [
        { label: 'R401 APC Controller', key: 'R401_APC_Controller' },
        { label: '操作变量', key: 'OperationVars' },
        { label: '反应器性能', key: 'ReactorPerformance' }
      ],
      activeName: 'OperationVars',
      createdTimes: 0
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
