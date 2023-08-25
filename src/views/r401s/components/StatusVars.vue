<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="propsStVars" border fit highlight-current-row style="width: 100%">
      <el-table-column min-width="60px" align="center" label="参数名">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="80px" align="center" label="描述">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="实际值">
        <template slot-scope="{row}">
          <span>{{ row.realValue }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="高限">
        <template slot-scope="{row}">
          <span>{{ row.highLimit }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="低限">
        <template slot-scope="{row}">
          <span>{{ row.lowLimit }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="40px" align="center" label="单位">
        <template slot-scope="{row}">
          <span>{{ row.unit }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getR401SStatusVars } from '@/api/c3h-r401s'

export default {
  props: {
    'propsStVars': {
      type: Array,
      default: null
    }},
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  watch: {
    propsCfVars(newVal, oldVal) {
      // console.log('propsCfVars changed', newVal)
      this.list = newVal
    }
  },
  mounted() {
    // this.getList()
  },
  created() {
    // this.getList()
    // this.startInterval()
  },
  beforeDestroy() {
    // this.stopInterval()
  },
  methods: {
    async getList() {
      this.listLoading = true

      await getR401SStatusVars().then((res) => {
        this.list = res.data.list.map(v => {
          return v
        })
        this.listLoading = false
      }, (response) => {
        this.listLoading = false
      })
    },
    startInterval() {
      this.timer = setInterval(() => {
        this.getList()
      }, 5000)
    },
    stopInterval() {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
