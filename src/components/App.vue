<template>
  <div id="app">
    <component :view="com" v-bind:is="com.name" @redirect="onRedirect"/>
    <trace :traces="trace"/>
  </div>
</template>

<script>
import Father from './Container';
import Admin from './apps/admin/Index';
import Trace from './apps/Trace';
import Login from './apps/Login';
// import Install from './apps/install/Index';

export default {
  name: 'App',
  extends: Father,
  data() {
    return {
      trace: {
        rows: [],
      },
    };
  },
  created() {
    // 挂载跳转处理器
    this.$root.$EventBus.on('App', this.onRedirect);
    // 挂载调试信息处理器
    this.$addReceiver((data) => {
      // 跳转处理
      if (data.redirect) {
        this.onRedirect(data.redirect);
        return false;
      }
      // 捕获调试信息
      if (data.trace) this.trace = data.trace;

      // 捕获提示信息
      if (data.message) {
        this.$message({
          showClose: true,
          message: data.message.text,
          type: data.message.type,
        });
      }
      return true;
    });
    // 启动时显示的默认页面
    this.$nextTick(() => {
      this.onRedirect({ url: window.index });
    });
  },
  components: {
    Admin,
    Trace,
    Login,
    // Install,
  },
  methods: {
  },
};
</script>

<style>
html,body {
  height: 100%;
  overflow: hidden;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
}

/** 居中布局元素 */
.center {
  text-align: center;
  align-self: center;
}

.tree-view .el-tree-node__content {
  height: 50px;
  border-bottom: 1px solid #ebeef5;
}
.tree-view-row>:first-child {
  flex: 1;
  text-align: left;
}
</style>
