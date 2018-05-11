<template>
  <div id="chart" :style="style"></div>
</template>

<script>
const echarts = require('echarts');

export default {
  props: {
    view: Object,
  },
  data() {
    return {
      option: this.view.option,
    };
  },
  computed: {
    style() {
      return {
        width: this.view.width || '600px',
        height: this.view.height || '400px',
        float: 'left',
      };
    },
  },
  mounted() {
    this.instance = echarts.init(this.$el);
    this.instance.setOption(this.option);
  },
  watch: {
    options(v) {
      this.instance.setOption(v);
    },
  },
};
</script>
