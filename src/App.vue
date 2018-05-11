<template>
  <div id="app">
    <component :view="com" v-bind:is="com.name" @redirect="onRedirect"/>
    <trace :information="trace"/>
    </div>
</template>

<script>
import Father from './components/views/Container';
import Admin from './components/Admin';
import Trace from './components/Trace';
import Login from './components/Login';

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
    this.$addReceiver((data) => {
      // 捕获调试信息
      if (data.trace) this.trace = data.trace;
      // 捕获提示信息
      if (data.message) {
        this.$message({
          showClose: true,
          message: data.message.information,
          type: data.message.type,
        });
      }
    });
    this.$root.$EventBus.on('App', this.onRedirect);
    // 启动时显示的默认页面
    this.$nextTick(() => {
      this.$HttpGet().then(data => this.onRedirect(data));
    });
  },
  components: {
    Admin,
    Trace,
    Login,
  },
  methods: {
    passUp() {
      return false;
    },
  },
};
</script>

<style>
html,body{
  height: 100%;
  overflow: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
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
