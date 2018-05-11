<template>
  <div>
    <el-autocomplete
      :options="options"
      v-model="selected"
      :fetch-suggestions="querySearch"
      :placeholder="label"
      @select="handleSelect"
      :label="label" />
  </div>
</template>
<script>
/**
 * 带添加功能的自动完成提示框
 * 返回选项的Id
 */
export default {
  props: {
    value: [String, Number],
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    name: String,
    url: String,
  },
  data() {
    return {
      selected: undefined,
    };
  },
  methods: {
    querySearch(qs, cb) {
      const rs = this.options;
      const results = qs ? rs.filter(this.createFilter(qs)) : rs;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(qs) {
      return rs => rs.value.indexOf(qs.toLowerCase()) !== -1;
    },
    handleSelect(item) {
      // 发生了什么？
      if (!item) return;
      // 选中的情况下
      if (item.id) {
        this.$emit('input', item.id);
        return;
      }
      // 清空了
      if (item.value === '') {
        this.$emit('input', item.id);
        return;
      }
      // 自定义:先标记为错误再异步修正
      this.$emit('input', -1);
      this.$HttpPost({ url: this.url }, { value: item.value }).then((data) => {
        if (!data.item) return;
        this.options.push(data.item);
        this.$emit('input', item.id);
      });
    },
  },
};
</script>

<style scoped>
.el-autocomplete {
  width: 100%;
}
</style>
