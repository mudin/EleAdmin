<template>
  <el-card>
    <div slot="header" class="header">
      <span>{{config.label}}</span>
    </div>
    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
      <el-checkbox v-for="item in items" :label="item.id" :key="item.id">{{item.label}}</el-checkbox>
    </el-checkbox-group>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      checked: [],
      items: []
    };
  },
  props: {
    /**
     * config = {id,label,children}
     */
    config: Object,
    value: {
      type: Array,
      'default': () => { return []; }
    }
  },
  created () {
    this.items = this.config.children;
    this.checked = [];
    if (this.value && this.value.length > 0) {
      this.config.children.forEach((v) => {
        if (this.value.indexOf(Number(v.id)) > -1) this.checked.push(v.id);
      });
    }
    this.handleCheckedChange();
  },
  computed: {},
  methods: {
    handleCheck () {
      let checkedCount = this.checked.length;
      let value = [];
      if (checkedCount > 0 && checkedCount <= this.items.length) {
        value = this.checked.slice();
        value.push(this.config.id);
      }
      return value;
    },
    handleCheckedChange () {
      this.$emit('input', this.handleCheck());
    }
  }
};
</script>

<style>
  .header {
    line-height: 36px;
  }
</style>
