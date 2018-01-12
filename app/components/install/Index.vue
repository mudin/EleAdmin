<template>
  <el-container id="install">
        <el-header class="install-box">
          <el-steps :space="200" :active="step" finish-status="success" align-center>
            <el-step title="安装协议" description=""/>
            <el-step title="完成安装" description=""/>
          </el-steps>
        </el-header>

        <el-main id="content">
          <transition name="el-fade-in">
            <component v-bind:is="view" @activeNext="activeNext" :value="value" @change="onChange"/>
          </transition>
        </el-main>

        <el-footer class="but-group">
          <el-button @click.native.prevent="handlePreStep" :disabled="!prev">上一步</el-button>
          <el-button @click.native.prevent="handleNextStep" :disabled="!next" v-show="!isComplete">下一步</el-button>
          <el-button @click.native.prevent="handleComplete" :disabled="!next" v-show=" isComplete">完成</el-button>
        </el-footer>

  </el-container>
</template>

<script>
  import License from './License.vue';

  export default {
    components: {
      License,
      Config,
      Manage
    },
    props: {
      config: Object
    },
    data () {
      return {
        next: false,
        prev: false,
        step: 0,
        views: ['License'],
        value: {}
      };
    },
    computed: {
      /**
       *  获取视图
       *
       * @return String
       */
      view () {
        return this.views[this.step];
      },
      /**
       * 视图个数
       */
      max () {
        return this.views.length - 1;
      },
      isComplete () {
        return (this.step >= this.max);
      }
    },
    watch: {
    },
    methods: {
      /**
       * 响应子视图激活/关闭【下一步】按钮
       *
       * @param next
       */
      activeNext (next) {
        this.next = next;
      },
      handleNextStep () {
        if (this.step < this.max) {
          this.step++;
          this.prev = false;
          this.next = true;
        }
      },
      handlePreStep () {
        if (this.step > 0) {
          this.step--;
          this.next = false;
          this.prev = (this.step <= 0);
        }
      },
      handleComplete () {
        this.$root.ajaxer(this.config.url, this.value, true).then(() => {
          this.$emit('monitor', this.config.admin);
        }, () => {
          this.handlePreStep();
        });
      },
      onChange (tag, v) {
        this.config[tag] = v;
      }
    }
  };
</script>

<style scoped>
  #install {
    margin: 0 auto;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }

  .el-header {

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

