<template>
  <el-row>
    <el-col :span="10">
      <el-input v-model="value.key" :disabled="disabled"/></el-col>
    <el-col :span="4" class="devide"><hr /></el-col>
    <el-col :span="10">
      <el-input v-model="value.value" :disabled="disabled"/></el-col>
  </el-row>
</template>

<script>
/**
 * 通过v-model来传递数据
 */
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style>
.devide {
  padding: 10px 20px 0 20px;
}
</style>
