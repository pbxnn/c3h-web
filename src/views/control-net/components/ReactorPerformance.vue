<template>
  <el-form ref="form" :model="form" label-width="140px" size="medium">
    <el-col :span="12">
      <el-form-item label="入口MAPD(mol%)" required>
        <el-input v-model="form.name" maxlength="120px" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="出口MAPD(mol%)" required>
        <el-input v-model="form.name" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="入口丙烯(mol%)" required>
        <el-input v-model="form.name" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="出口丙烯(mol%)" required>
        <el-input v-model="form.name" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="入口丙烷(mol%)" required>
        <el-input v-model="form.name" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="出口丙烷(mol%)" required>
        <el-input v-model="form.name" />
      </el-form-item>
    </el-col>

    <el-form-item label="氢炔比(%)" required>
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="选择性(%)" required>
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="转化率(%)" required>
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="分析时间" required>
      <el-col :span="11">
        <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
