<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
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

      <el-table-column min-width="60px" align="center" label="低限">
        <template slot-scope="scope">
          <span>{{ scope.row.lowLimit }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="高限">
        <template slot-scope="scope">
          <span>{{ scope.row.highLimit }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="设定值">
        <template slot-scope="{row}">
          <span>{{ row.setValue }}</span>
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
import { getR401SConfoundingVars } from '@/api/c3h-r401s'

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  mounted() {
    this.getList()
  },
  created() {
    this.startInterval()
  },
  beforeDestroy() {
    this.stopInterval()
  },
  methods: {
    async getList() {
      this.listLoading = true

      await getR401SConfoundingVars().then((res) => {
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
