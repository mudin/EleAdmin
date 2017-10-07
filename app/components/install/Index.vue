<template>
<div>
  <div id="install">
    <main>
      <!-- 主内容区 -->
      <div  class="main" >
        <div class="install-box">
          <el-steps :space="200" :active="step" finish-status="success" center="true">
            <el-step title="安装协议" description=""></el-step>
            <el-step title="基本配置" description=""></el-step>
            <el-step title="设置管理员" description=""></el-step>
            <el-step title="完成安装" description=""></el-step>
          </el-steps>

          <div id="content">
            <transition name="el-fade-in">
              <component v-bind:is="view" @activeNext="activeNext"></component>
            </transition>
          </div>

          <div class="but-group">
            <el-button @click.native.prevent="handlePreStep" :disabled="prev">上一步</el-button>
            <el-button @click.native.prevent="handleNextStep" :disabled="next" v-show="!isComplete">下一步</el-button>
            <el-button @click.native.prevent="handleComplete" :disabled="next" v-show="isComplete">完成</el-button>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
</template>

<script>
  import License from './License.vue';
  import Config from './Config.vue';
  import Manage from './Manage.vue';
  export default {
    components: {
      License,
      Config,
      Manage
    },
    data () {
      return {
        next: true,
        prev: true,
        step: 0,
        isComplete: false,
        views: ['License', 'Config', 'Manage']
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
      max () {
        return this.views.length - 1;
      }
    },
    watch: {
    },
    methods: {
      /**
       * 激活/关闭【下一步】按钮
       *
       * @param next
       */
      activeNext (next) {
        this.next = !next;
      },
      handleNextStep () {
        if (this.step < this.max) {
          this.step++;
          this.prev = false;
          this.isComplete = (this.step === this.max);
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
        // this.step--;
        // this.next = (this.step <= 0);
      }
    }
  };
</script>

<style scoped>
  #install {
    width: 1000px;
    margin: 0 auto;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }
  main{
    display: flex;
    min-height: 800px;
    border: solid 40px #E9ECF1;
    background-color: #FCFCFC;
  }
  main .main{
    flex:1;
    background-color: #fff;
    padding: 50px 70px;
  }
  main .el-menu{
    background-color: transparent!important;
  }
  #content {
    margin: 50px;
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

  .install-box .but-group .el-button{margin-right: 20px;}
</style>

