<template>
  <div id="app">
    <component :config="view.config" v-bind:is="view.name"></component>
    <trace :trace="trace"></trace>
  </div>
</template>

<script>
import Trace from './components/Trace.vue';

export default {
  name: 'app',
  data () {
    return {
      view: {},
      trace: {}
    };
  },
  components: {
    Trace,
    Admin: function index (resolve) {
      require(['./components/Admin.vue'], resolve);
    },
    Login: function index (resolve) {
      require(['./components/Login.vue'], resolve);
    },
    Simple: function index (resolve) {
      require(['./components/Simple.vue'], resolve);
    },
    Module: function index (resolve) {
      require(['./components/module/Index.vue'], resolve);
    }
  },
  created () {
    let self = this;
    /**
     * 返回Promise是为了统一返回值
     */
    this.$root.monitor = function (url = '', data = {}) {
      if (url === '') url = window.bench;
      // console.log(url);
      let promise = self.$root.ajax(url, data).then((response) => {
        self.view = response.view || {};
        self.trace = response.__trace__ || {};
        throw new Error('route');
      });
      promise.catch((e) => {});
      return promise;
    };
    // 启动
    this.$nextTick(() => {
      this.$root.monitor();
    });
  },
  beforeDestroy () {
    delete this.$root.monitor;
  }
};
</script>

<style scoped>
  html, body, #app {
    margin: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
