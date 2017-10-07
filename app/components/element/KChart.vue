<template>
  <div id="chart"></div>
</template>

<script>
let echarts = require('echarts');
export default {
  props: {
    mate: Object
  },
  mounted () {
    this.instance = echarts.init(this.$el);
    this.instance.setOption(this.mate.options);
  },
  watch: {
    options (v) {
      this.instance.setOption(v);
    }
  }
};
</script>

<style>
</style>
