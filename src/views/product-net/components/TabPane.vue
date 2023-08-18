<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="参数名"
      min-width="120"
      element-loading-text="请给我点时间！"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="180px" align="center" label="描述">
      <template slot-scope="scope">
        <span>{{ scope.row.desc }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="实际值">
      <template slot-scope="{row}">
        <span>{{ row.realValue }}</span>
        <!-- <el-tag>{{ row.real_value }}</el-tag> -->
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="设定值">
      <template slot-scope="{row}">
        <span>{{ row.setValue }}</span>
        <!-- <el-tag>{{ row.real_value }}</el-tag> -->
      </template>
    </el-table-column>

    <el-table-column min-width="60px" align="center" label="单位">
      <template slot-scope="scope">
        <span>{{ scope.row.unit }}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" align="center" label="高限">
      <template slot-scope="scope">
        <!-- <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" /> -->
        <span>{{ scope.row.highLimit }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="低限" width="120px">
      <template slot-scope="scope">
        <span>{{ scope.row.lowLimit }}</span>
      </template>
    </el-table-column>

    <!-- <el-table-column class-name="status-col" label="Status" width="110">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
// import { fetchList } from '@/api/article'
import { getControlledVars, getConfoundingVars, getControllVars, getCatalyst } from '@/api/c3h-product-net'

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'info',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  props: {
    type: {
      type: String,
      default: 'ControlledVars'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        type: this.type
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      // this.$emit('create') // for test
      switch (this.type) {
        case 'ControlledVars':
          getControlledVars().then(response => {
            // console.log(response)
            this.list = response.data.list
            this.loading = false
          }, () => {
            this.loading = false
          })
          break

        case 'ControllVars':
          getControllVars().then(response => {
            // console.log(response)
            this.list = response.data.list
            this.loading = false
          }, () => {
            this.loading = false
          })
          break

        case 'ConfoundingVars':
          getConfoundingVars().then(response => {
            // console.log(response)
            this.list = response.data.list
            this.loading = false
          }, () => {
            this.loading = false
          })
          break

        case 'Catalyst':
          getCatalyst().then(response => {
            // console.log(response)
            this.list = response.data.list
            this.loading = false
          }, () => {
            this.loading = false
          })
          break
      }
    }
  }
}
</script>

