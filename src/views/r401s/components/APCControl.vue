<template>
  <el-row :gutter="24" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            MAPD控制模式
          </div>
          <template v-if="swithInfo.R401S_MAPD_control_mode.edit">
            <el-row :gutter="18">
              <el-col :span="12">
                <el-input v-model="swithInfo.R401S_MAPD_control_mode.setValue" class="edit-input" size="small" />
              </el-col>
              <el-col :span="6">
                <el-button
                  class="cancel-btn"
                  size="small"
                  type="warning"
                  @click="cancelEdit(swithInfo.R401S_MAPD_control_mode)"
                >
                  取消
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-button
                  class="cancel-btn"
                  size="small"
                  type="primary"
                  @click="confirmEdit(swithInfo.R401S_MAPD_control_mode)"
                >
                  确认
                </el-button>
              </el-col>
            </el-row>
          </template>
          <el-button
            v-else
            class="card-panel-num"
            type="primary"
            round
            @click="swithInfo.R401S_MAPD_control_mode.edit=true"
          >
            {{ swithInfo.R401S_MAPD_control_mode.setValue }}
          </el-button>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <!-- <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            APC 主开关
          </div>
          <template>
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定修改APC主开关状态吗？"
              @onConfirm="confirmEdit(swithInfo.R401S_APC_main_switch)"
            >
              <el-button slot="reference" :type="swithInfo.R401S_APC_main_switch.buttonType" class="card-panel-num" round>
                {{ swithInfo.R401S_APC_main_switch.buttonText }}
              </el-button>
            </el-popconfirm>
          </template>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            APC 写入开关
          </div>
          <template>
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定修改APC写入开关状态吗？"
              @onConfirm="confirmEdit(swithInfo.R401S_APC_write_switch)"
            >
              <el-button slot="reference" :type="swithInfo.R401S_APC_write_switch.buttonType" class="card-panel-num" round>
                {{ swithInfo.R401S_APC_write_switch.buttonText }}
              </el-button>
            </el-popconfirm>
          </template>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            通讯
          </div>
          <el-button :type="swithInfo.R401S_communication.buttonType" class="card-panel-num" round>
            {{ swithInfo.R401S_communication.buttonText }}
          </el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import CountTo from 'vue-count-to'
import { getR401SAPCControl, setR401SAPCControl } from '@/api/c3h-r401s'

export default {
  props: {
    'propsApcVars': {
      type: Array,
      default: null
    }},
  data() {
    return {
      swithInfo: {
        R401S_MAPD_control_mode: {},
        R401S_APC_main_switch: {},
        R401S_APC_write_switch: {},
        R401S_communication: {}
      }
    }
  },
  watch: {
    propsApcVars(newVal, oldVal) {
      // console.log('propsOpVars changed', newVal)
      newVal.map(v => {
        if (v.type === 1) {
          v.swithStatus = Boolean(v.setValue)
          if (v.swithStatus) {
            v.buttonType = 'success'
            v.buttonText = 'on'
          } else {
            v.buttonType = 'danger'
            v.buttonText = 'off'
          }
        }
        v.edit = false
        this.swithInfo[v.key] = v
      })
    }
  },
  mounted() {
    // this.getSwitchInfo()
  },
  created() {
    // this.getSwitchInfo()
    // this.startInterval()
  },
  beforeDestroy() {
    // this.stopInterval()
  },
  methods: {
    getSwitchInfo() {
      this.loading = true
      // this.$emit('create') // for test
      getR401SAPCControl().then(res => {
        res.data.list.map(v => {
          if (v.type === 1) {
            v.swithStatus = Boolean(v.setValue)
            if (v.swithStatus) {
              v.buttonType = 'success'
              v.buttonText = 'on'
            } else {
              v.buttonType = 'danger'
              v.buttonText = 'off'
            }
          }
          v.edit = false
          this.swithInfo[v.key] = v
        })
        // this.swithInfo = response.data
        // console.log(this.swithInfo)

        this.loading = false
      }, (response) => {
        this.loading = false
      })
    },
    cancelEdit(switchDetail) {
      console.log(switchDetail)
      switchDetail.edit = false
      switchDetail.setValue = switchDetail.realValue
    },
    confirmEdit(switchDetail) {
      this.loading = true
      // console.log(switchDetail, switchDetail.type === 1, switchDetail.setValue === 1)
      if (switchDetail.type === 1) {
        if (switchDetail.setValue === 1) {
          switchDetail.setValue = 0
        } else {
          switchDetail.setValue = 1
        }
      }

      const req = {
        'key': switchDetail.key,
        'type': switchDetail.type,
        'set_value': switchDetail.setValue
      }
      setR401SAPCControl(req).then((res) => {
        switchDetail.edit = false
        this.loading = false

        if (switchDetail.type === 1) {
          switchDetail.swithStatus = Boolean(switchDetail.setValue)
          if (switchDetail.swithStatus) {
            switchDetail.buttonType = 'success'
            switchDetail.buttonText = 'on'
          } else {
            switchDetail.buttonType = 'danger'
            switchDetail.buttonText = 'off'
          }
        } else {
          switchDetail.setValue = res.data.setValue
          switchDetail.realValue = res.data.realValue
          switchDetail.calcValue = res.data.calcValue
        }

        // if (switchDetail.type === 1) {
        //   switchDetail.swithStatus = Boolean(switchDetail.realValue)
        //   if (switchDetail.swithStatus) {
        //     switchDetail.buttonType = 'success'
        //     switchDetail.buttonText = 'on'
        //   } else {
        //     switchDetail.buttonType = 'danger'
        //     switchDetail.buttonText = 'off'
        //   }
        // }

        this.$message({
          message: switchDetail.desc + '修改成功',
          type: 'success',
          center: true
        })
      }, (res) => {
        switchDetail.edit = false
        this.loading = false
      })
    },
    startInterval() {
      this.timer = setInterval(() => {
        this.getSwitchInfo()
      }, 5000)
    },
    stopInterval() {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  // margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
    text-align: center;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      // float: right;
      font-weight: bold;
      margin: 26px;
      // margin-left: 0px;

      .card-panel-text {
        line-height: 14px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 22px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
