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
    },
    Install: function index (resolve) {
      require(['./components/Install/Index.vue'], resolve);
    }
  },
  created () {
    let self = this;
    this.$root.ajaxer = function (url = '', data = {}, post = false) {
      if (url === '') url = window.bench;
      // console.log(url);
      return this.ajax(url, data, post).then((response) => {
        self.trace = response.__trace__ || {};
        // 这里是为了级联then
        return response;
      });
    };
    /**
     * 返回Promise是为了统一返回值
     */
    this.$root.monitor = function (url = '', data = {}) {
      let promise = this.ajaxer(url, data).then((response) => {
        self.view = response.view || {
          name: 'Simple',
          config: {
            message: response.message
          }
        };
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
    delete this.$root.ajaxer;
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
