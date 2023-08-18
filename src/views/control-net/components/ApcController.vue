<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="参数名">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column> -->

      <el-table-column label="设定值">
        <template slot-scope="{row}">
          <template v-if="row.isSwitch">
            <template v-if="row.edit">
              <!-- <el-input v-model="row.setValue" class="edit-input" size="small" /> -->
              <el-switch v-model="row.setValue" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <!-- <span v-else>{{ row.setValue }}</span> -->
            <el-switch v-else v-model="row.setValue" disabled />
          </template>
          <template v-else>
            <template v-if="row.edit">
              <el-input v-model="row.setValue" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
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

      <el-table-column align="center" label="Actions">
        <template v-if="row.editAble" slot-scope="{row}">
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
import { getR401APC, setR401APC } from '@/api/c3h-control-net'

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
      await getR401APC().then((res) => {
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

      // const { data } = await getR401APC()
      // this.list = data.list.map(v => {
      //   this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      //   v.originalSetValue = v.setValue //  will be used when user click the cancel botton
      //   if (v.isSwitch) {
      //     v.setValue = v.switchStatus
      //     v.originalSetValue = v.switchStatus
      //   }
      //   return v
      // })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.setValue = row.originalSetValue
      row.edit = false
      this.$message({
        message: row.name + ' has been restored to the original value',
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
      setR401APC(data).then(() => {
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
