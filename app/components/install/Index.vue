<template>
<div>
  <div id="install">
    <main>
      <!-- 主内容区 -->
      <div  class="main" >
        <div class="install-box">
          <el-steps :space="200" :active="step" finish-status="success" :center="true">
            <el-step title="安装协议" description=""></el-step>
            <el-step title="数据库配置" description=""></el-step>
            <el-step title="设置管理员" description=""></el-step>
            <el-step title="完成安装" description=""></el-step>
          </el-steps>

          <div id="content">
            <transition name="el-fade-in">
              <component v-bind:is="view" @activeNext="activeNext" :value="value" @change="onChange"></component>
            </transition>
          </div>

          <div class="but-group">
            <el-button @click.native.prevent="handlePreStep" :disabled="prev">上一步</el-button>
            <el-button @click.native.prevent="handleNextStep" :disabled="next" v-show="!isComplete">下一步</el-button>
            <el-button @click.native.prevent="handleComplete" v-show="isComplete" :disabled="next">完成</el-button>
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
    props: {
      config: Object
    },
    data () {
      return {
        next: true,
        prev: true,
        step: 0,
        views: ['License', 'Config', 'Manage'],
        value: {
          checked: false,
          db: {
            type: '0',
            host: 'localhost',
            port: '3306',
            user: 'root',
            pass: '',
            name: ''
          },
          admin: {
            name: 'admin',
            password: '',
            email: ''
          }
        }
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
        return this.views.length;
      },
      isComplete () {
        return (this.step >= this.max);
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
        if (this.step < this.max - 1) {
          this.step++;
          this.prev = false;
          this.next = true;
        } else {
          this.runComplete();
        }
      },
      handlePreStep () {
        if (this.step > 0) {
          this.step--;
          this.next = false;
          this.prev = (this.step <= 0);
        }
      },
      runComplete () {
        this.$root.ajaxer(this.config.url, this.value, true).then((data) => {
          this.step = this.max;
          this.prev = true;
          this.next = false;
        });
        // 成功后step = 3
        // 显示安装成功页面
      },
      handleComplete () {
        this.step++;
      },
      onChange (tag, v) {
        this.config[tag] = v;
      }
    }
  };
</script>

<style scoped>
  #install {
    width: 1200px;
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

