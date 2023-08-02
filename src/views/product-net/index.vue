<template>
  <div class="tab-container">
    <panel-group />

    <!-- <el-tag>mounted times ：{{ createdTimes }}</el-tag> -->
    <!-- <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" /> -->
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleSelect">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './components/TabPane'
import PanelGroup from './components/PanelGroup'

export default {
  name: 'Tab',
  components: {
    TabPane,
    PanelGroup
  },
  data() {
    return {
      tabMapOptions: [
        { label: '被控变量', key: 'ControlledVars' },
        { label: '控制变量', key: 'ControllVars' },
        { label: '干扰变量', key: 'ConfoundingVars' },
        { label: '催化剂性能', key: 'Catalyst' }
      ],
      activeName: 'ControlledVars',
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
