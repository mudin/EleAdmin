<template>
  <div>
    <el-chart v-for="chart in this.view.charts" :key="chart.index" :view="chart" />
  </div>
</template>

<script>
import ElChart from '../elements/ElChart';
import View from './View';

export default {
  extends: View,
  components: [ElChart],
  props: ['view'],
};
</script>
