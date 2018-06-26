<template>
<div class="trace">
  <el-badge :value="traces.length" class="trace-icon" v-show="!open">
    <el-button size="small" @click="onOpen">调试</el-button>
  </el-badge>
  <el-card class="trace-card" v-show="open" shadow="always" body-style="{overflow:auto;}">
    <div slot="header" class="clearfix trace-card-header">
      <span>调试信息</span>
      <el-button class="trace-close-btn" type="text" @click="open = false">关闭</el-button>
    </div>
    <div v-for="(o, i) in traces.rows" :key="i" class="text item">
      <span :class="o.type">{{o.text}}</span>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  props: [
    'traces',
  ],
  data() {
    const value = this.traces.length;
    return {
      open: false,
      value,
    };
  },
  methods: {
    onOpen() {
      this.open = true;
      this.value = 0;
    },
  },
};
</script>
<style scoped>
.trace {
  position: fixed;
  max-width: 700px;
  /* left: 30px; */
  bottom: 30px;
  right: 30px;
  max-height: 400px;
  overflow:auto;
}

.trace-close-btn {
  float: right; padding: 3px 0
}

.trace-card-header {
}

.item {
  margin-bottom: 30px;
}

.trace .error, .trace, danger {
  color:#F56C6C;
}
.trace .success {
  color: #67C23A;
}
.trace .warning {
  color: #E6A23C;
}
.trace .info {
  color: #909399;
}
</style>

