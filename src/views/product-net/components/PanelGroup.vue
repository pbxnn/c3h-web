<template>
  <el-row :gutter="48" class="panel-group">
    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <!-- <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            DC402总开关
          </div>
          <el-button :type="$data.swithInfo.DC402Total.type" class="card-panel-num" round>
            {{ $data.swithInfo.DC402Total.text }}
          </el-button>
          <!-- <div class="card-panel-num">
            开启
          </div> -->
          <!-- <count-to :start-val="A" :end-val="A" :duration="1" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>

    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <!-- <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            DC402手动开关
          </div>
          <el-button :type="$data.swithInfo.DC402Manual.type" class="card-panel-num" round>
            {{ $data.swithInfo.DC402Manual.text }}
          </el-button>
          <!-- <count-to :start-val="0" :end-val="81212" :duration="1" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>

    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <!-- <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            DC402A/B选择
          </div>
          <el-button :type="$data.swithInfo.DC402AB.type" class="card-panel-num" round>
            {{ $data.swithInfo.DC402AB.text }}
          </el-button>
          <!-- <count-to :start-val="0" :end-val="9280" :duration="1" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>

    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <!-- <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            出口MAPD选择
          </div>
          <el-button :type="$data.swithInfo.MAPDExport.type" class="card-panel-num" round>
            {{ $data.swithInfo.MAPDExport.text }}
          </el-button>
          <!-- <count-to :start-val="0" :end-val="13600" :duration="1" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>

    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <!-- <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            干燥剂切换
          </div>
          <el-button :type="$data.swithInfo.drier.type" class="card-panel-num" round>
            {{ $data.swithInfo.drier.text }}
          </el-button>
          <!-- <count-to :start-val="0" :end-val="13600" :duration="1" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>

    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <!-- <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            通讯中断报警
          </div>
          <el-button :type="$data.swithInfo.communication.type" class="card-panel-num" round>
            {{ $data.swithInfo.communication.text }}
          </el-button>
          <!-- <count-to :start-val="0" :end-val="13600" :duration="1" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import CountTo from 'vue-count-to'
import { getSwitchInfo } from '@/api/c3h-product-net'

export default {
  components: {
    // CountTo
  },
  data() {
    return {
      swithInfo: {
        DC402Total: {
          text: '',
          type: ''
        },
        DC402Manual: {
          text: '',
          type: ''
        },
        DC402AB: {
          text: '',
          type: ''
        },
        MAPDExport: {
          text: '',
          type: ''
        },
        drier: {
          text: '',
          type: ''
        },
        communication: {
          text: '',
          type: ''
        }
      }
    }
  },
  created() {
    this.getSwitchInfo()
  },
  methods: {
    getSwitchInfo(type) {
      this.loading = true
      // this.$emit('create') // for test
      getSwitchInfo().then(response => {
        console.log(response)
        this.swithInfo = response.data
        this.loading = false
      }, (response) => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

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
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

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
