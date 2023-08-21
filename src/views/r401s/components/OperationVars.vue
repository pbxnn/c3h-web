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
        <template slot-scope="scope">
          <span>{{ scope.row.setValue }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="计算值">
        <template slot-scope="scope">
          <span>{{ scope.row.calcValue }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="40px" align="center" label="单位">
        <template slot-scope="{row}">
          <span>{{ row.unit }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="复位">
        <template slot-scope="{row}">
          <el-popconfirm
            v-if="row.extra.resetAble"
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            :title="'确认复位' + row.desc + '的计算值吗？'"
            @onConfirm="resetVar(row)"
          >
            <el-button slot="reference" type="warning" class="cancel-btn">
              reset
            </el-button>
          </el-popconfirm>
          <!-- <el-button
            class="cancel-btn"
            size="mini"
            type="warning"
            @click="resetVar(row)"
          >
            reset
          </el-button> -->
        </template>
      </el-table-column>

      <el-table-column min-width="60px" align="center" label="控制开关">
        <template slot-scope="{row}">
          <el-popconfirm
            v-if="row.extra.resetAble"
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            :title="'确认修改' + row.desc + '的开关状态吗？'"
            @onConfirm="changeSwitch(row)"
          >
            <el-button
              v-if="row.extra.hasControlSwitch"
              slot="reference"
              :type="row.extra.controlSwitchButtonType"
              size="small"
            >
              {{ row.extra.controlSwitchButtonText }}
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getR401SOperationVars, setR401SControlSwitch, resetR401SVar } from '@/api/c3h-r401s'

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

      await getR401SOperationVars().then((res) => {
        this.list = res.data.list.map(v => {
          if (v.extra.controlSwitchStatus === 1) {
            v.extra.controlSwitchButtonType = 'success'
            v.extra.controlSwitchButtonText = 'on'
          } else {
            v.extra.controlSwitchButtonType = 'danger'
            v.extra.controlSwitchButtonText = 'off'
          }
          return v
        })
        this.listLoading = false
      }, (response) => {
        this.listLoading = false
      })
    },
    resetVar(row) {
      this.listLoading = true
      const req = {
        'key': row.key
      }
      resetR401SVar(req).then((res) => {
        row.calcValue = res.data.calcValue
        this.$notify({
          title: 'Success',
          message: row.desc + '复位成功',
          type: 'success',
          duration: 2000
        })
        this.listLoading = false
      }, () => {
        this.listLoading = false
      })
    },
    changeSwitch(row) {
      this.listLoading = true
      let controlSwitchStatus = 1

      if (row.extra.controlSwitchStatus) {
        controlSwitchStatus = 0
      }
      const req = {
        'key': row.key,
        'status': controlSwitchStatus
      }
      setR401SControlSwitch(req).then((res) => {
        row.extra.controlSwitchStatus = res.data.extra.controlSwitchStatus
        if (res.data.extra.controlSwitchStatus === 1) {
          row.extra.controlSwitchButtonType = 'success'
          row.extra.controlSwitchButtonText = 'on'
        } else {
          row.extra.controlSwitchButtonType = 'danger'
          row.extra.controlSwitchButtonText = 'off'
        }

        this.$notify({
          title: 'Success',
          message: row.desc + '控制开关修改为' + row.extra.controlSwitchButtonText,
          type: 'success',
          duration: 2000
        })
        this.listLoading = false
      }, () => {
        this.listLoading = false
      })
    }

    // confirmEdit(row) {
    // this.listLoading = true
    // row.edit = false
    // const data = {
    //   'name': row.name,
    //   'set_value': row.setValue
    // }
    // setOperationVars(data).then(() => {
    //   row.originalSetValue = row.setValue //  will be used when user click the cancel botton
    //   if (row.isSwitch) {
    //     row.setValue = row.switchStatus
    //     row.originalSetValue = row.switchStatus
    //   }
    //   this.$notify({
    //     title: 'Success',
    //     message: row.name + 'Created Successfully',
    //     type: 'success',
    //     duration: 2000
    //   })
    //   this.listLoading = false
    // }, (response) => {
    //   row.edit = true
    //   row.setValue = row.originalSetValue
    //   this.listLoading = false
    // })
    // }
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
