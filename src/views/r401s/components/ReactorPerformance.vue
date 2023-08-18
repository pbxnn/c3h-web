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
          <el-input v-model="form.R401S_c3h6_selectivity" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MAPD转化率(%)" required>
          <el-input v-model="form.R401S_MAPD_inversion_rate" />
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
          <el-input v-model="form.R401S_ingress_MAPD_analysis" :placeholder="form.R401S_ingress_MAPD_analysis" maxlength="120px" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出口MAPD(ppm)" required>
          <el-input v-model="form.R401S_egress_MAPD_analysis" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="入口丙烯(mol%)" required>
          <el-input v-model="form.R401S_ingress_c3h6_analysis" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出口丙烯(mol%)" required>
          <el-input v-model="form.R401S_egress_c3h6_analysis" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="入口丙烷(mol%)" required>
          <el-input v-model="form.R401S_ingress_c3h8_analysis" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出口丙烷(mol%)" required>
          <el-input v-model="form.R401S_egress_c3h8_analysis" />
        </el-form-item>
      </el-col>
      <el-form-item label="分析时间" required>
        <el-date-picker v-model="form.R401S_analysis_time" type="datetime" style="width: 100%;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
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
      }
    }
  },
  mounted() {
    this.form.R401S_analysis_time = new Date()
  },
  created() {
    this.getPerformanceData()
  },
  methods: {
    async getPerformanceData() {
      this.listLoading = true

      await getR401SReactorPerformance().then((res) => {
        res.data.list.map(v => {
          this.$set(this.form, v.key, v.realValue)
        })
        this.listLoading = false
      }, (response) => {
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
