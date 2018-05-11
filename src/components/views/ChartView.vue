<template>
  <div>
    <el-chart v-for="chart in this.view.charts" :key="chart.index" :view="chart" />
  </div>
</template>

<script>
import ElChart from '../elements/ElChart';

export default {
  components: [ElChart],
  props: ['view'],
};
</script>
