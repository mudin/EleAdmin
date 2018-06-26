<template>
  <el-container class="drama">
        <el-header class="drama-box">
          <el-steps :space="200" :active="step" finish-status="success" align-center>
            <el-step v-for="(v, index) in steps"  :title="v.title" description="" :key="index"/>
          </el-steps>
        </el-header>

        <el-main class="drama-content">
          <transition name="el-fade-in">
            <component v-bind:is="view" @activeNext="activeNext" :value="value" @change="onChange"/>
          </transition>
        </el-main>

        <el-footer class="but-group">
          <el-button @click="handlePreStep" :disabled="!next || !trigger">{{prevLabel}}</el-button>
          <el-button @click="handleNextStep" :disabled="!prev">{{nextLabel}}</el-button>
        </el-footer>
  </el-container>
</template>

<script>
import View from './View';

/**
 * 由于引入组件的原因，这个类必须继承
 */
export default {
  extends: { View },
  data() {
    return {
      // 下一页
      trigger: false,
      // 当前页
      step: 0,
      // 数据项
      value: {},
    };
  },
  computed: {
    steps() {
      return this.view.steps || [];
    },
    /** 获取视图
     * @return String
     */
    view() {
      return this.steps[this.step];
    },
    /** 视图个数
     * @return Number
     */
    indexMax() {
      return this.steps.length;
    },
    /**
     * @return Boolean
     */
    nextLabel() {
      return this.next ? '下一步' : '完成';
    },
    next() {
      return this.step < this.indexMax;
    },
    canNext() {
      return this.next && this.trigger;
    },
    /**
     * @return Boolean
     */
    prevLabel() {
      return this.prev ? '上一步' : '';
    },
    prev() {
      return this.step > 0;
    },
  },
  methods: {
    /**
     * 激活/关闭【下一步】按钮
     *
     * @param {Boolean} trigger
     * @return Boolean
     */
    activeNext(trigger) {
      this.trigger = trigger;
    },
    /**
     * 下一步/完成
     */
    handleNextStep() {
      if (this.step >= this.indexMax) return;

      if (this.step === this.indexMax - 1) {
        this.handleComplete();
        return;
      }

      this.trigger = false;
      this.step += 1;
    },
    /**
     * 上一步
     */
    handlePreStep() {
      if (this.step <= 0) return;

      this.trigger = false;
      this.step -= 1;
    },
    /**
     * 完成后的动作
     */
    handleComplete() {
    },
    onChange(tag, v) {
      this.config[tag] = v;
    },
  },
};
</script>

<style scoped>
  #drama {
    margin: 0 auto;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }

  .main .el-menu{
    background-color: transparent!important;
  }

  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }

  .but-group .el-button{margin-right: 20px;}
</style>

