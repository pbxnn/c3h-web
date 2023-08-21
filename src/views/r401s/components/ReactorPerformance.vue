<template>
  <el-form ref="form" :model="form" label-width="140px" size="medium">
    <!-- <el-el-header width="160px">
      催化剂性能参数
    </el-el-header> -->
    <!-- <el-divider content-position="left">催化剂性能参数</el-divider> -->
    <!-- <el-container> -->
    <!-- <aside>催化剂性能参数</aside> -->
    <el-col :span="24"><aside>催化剂性能参数</aside></el-col>
    <!-- </el-container> -->
    <!-- <el-container> -->
    <el-main>
      <el-col :span="12">
        <el-form-item label="丙烯选择性(%)" required>
          <el-input v-model="form.R401S_c3h6_selectivity" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MAPD转化率(%)" required>
          <el-input v-model="form.R401S_MAPD_inversion_rate" :disabled="true" />
        </el-form-item>
      </el-col>
    </el-main>
    <!-- </el-container> -->
    <!-- <el-el-header width="120px">
      在线分析
    </el-el-header> -->

    <!-- <el-container> -->
    <el-col :span="24"><aside>在线分析</aside></el-col>
    <!-- </el-container> -->
    <!-- <el-container> -->
    <el-main>
      <el-col :span="12">
        <el-form-item label="入口MAPD(mol%)" required>
          <el-input v-model="form.R401S_ingress_MAPD_analysis" :placeholder="form.R401S_ingress_MAPD_analysis" maxlength="120px" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出口MAPD(ppm)" required>
          <el-input v-model="form.R401S_egress_MAPD_analysis" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="入口丙烯(mol%)" required>
          <el-input v-model="form.R401S_ingress_c3h6_analysis" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出口丙烯(mol%)" required>
          <el-input v-model="form.R401S_egress_c3h6_analysis" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="入口丙烷(mol%)" required>
          <el-input v-model="form.R401S_ingress_c3h8_analysis" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出口丙烷(mol%)" required>
          <el-input v-model="form.R401S_egress_c3h8_analysis" :disabled="true" />
        </el-form-item>
      </el-col>
      <el-form-item label="分析时间" required>
        <el-date-picker v-model="form.R401S_analysis_time" type="datetime" style="width: 100%;" :disabled="true" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showConfirmDialog=true">确认</el-button>

        <el-dialog
          title="提示"
          :visible.sync="showConfirmDialog"
          width="30%"
        >
          <span>是否确认反应器性能数据？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showConfirmDialog = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
    </el-main>
    <!-- </el-container> -->

  </el-form>

</template>

<script>
import { getR401SReactorPerformance, confirmReactorPerformance } from '@/api/c3h-r401s'

export default {
  data() {
    return {
      form: {
        R401S_c3h6_selectivity: '',
        R401S_MAPD_inversion_rate: '',
        R401S_ingress_MAPD_analysis: '',
        R401S_egress_MAPD_analysis: '',
        R401S_ingress_c3h6_analysis: '',
        R401S_egress_c3h6_analysis: '',
        R401S_ingress_c3h8_analysis: '',
        R401S_egress_c3h8_analysis: '',
        R401S_analysis_time: ''
      },
      showConfirmDialog: false
    }
  },
  mounted() {
    // this.form.R401S_analysis_time = new Date()
  },
  created() {
    this.getPerformanceData()
  },
  methods: {
    async getPerformanceData() {
      await getR401SReactorPerformance().then((res) => {
        res.data.list.map(v => {
          this.$set(this.form, v.key, v.realValue)
          this.form.R401S_analysis_time = new Date()
        })
      })
    },
    onSubmit() {
      this.showConfirmDialog = false
      this.listLoading = true
      const req = {
        'confirmData': this.form
      }
      confirmReactorPerformance(req).then(() => {
        // this.form.R401S_analysis_time = new Date()
        this.$message({
          title: 'Success',
          message: '反应器性能确认成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
