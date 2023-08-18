<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column min-width="120px" align="center" label="参数名">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="描述">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="实际值">
        <template slot-scope="{row}">
          <span>{{ row.realValue }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="设定值">
        <template slot-scope="{row}">
          <template>
            <template v-if="row.edit">
              <el-input v-model="row.setValue" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="mini"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.setValue }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="高限">
        <template slot-scope="scope">
          <span>{{ scope.row.highLimit }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="低限">
        <template slot-scope="scope">
          <span>{{ scope.row.lowLimit }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="40px" align="center" label="单位">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOperationVars } from '@/api/c3h-control-net'

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
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true

      await getOperationVars().then((res) => {
        this.list = res.data.list.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalSetValue = v.setValue //  will be used when user click the cancel botton
          if (v.isSwitch) {
            v.setValue = v.switchStatus
            v.originalSetValue = v.switchStatus
          }
          return v
        })
        this.listLoading = false
      }, (response) => {
        this.listLoading = false
      })

      // const { data } = await getOperationVars()
      // this.list = data.list.map(v => {
      //   this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      //   v.originalSetValue = v.setValue //  will be used when user click the cancel botton
      //   return v
      // })
      // this.listLoading = false
    },
    cancelEdit(row) {
      row.setValue = row.originalSetValue
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      this.listLoading = true
      row.edit = false
      const data = {
        'name': row.name,
        'set_value': row.setValue
      }
      setOperationVars(data).then(() => {
        row.originalSetValue = row.setValue //  will be used when user click the cancel botton
        if (row.isSwitch) {
          row.setValue = row.switchStatus
          row.originalSetValue = row.switchStatus
        }
        this.$notify({
          title: 'Success',
          message: row.name + 'Created Successfully',
          type: 'success',
          duration: 2000
        })
        this.listLoading = false
      }, (response) => {
        row.edit = true
        row.setValue = row.originalSetValue
        this.listLoading = false
      })
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
