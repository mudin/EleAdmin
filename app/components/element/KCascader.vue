<template>
  <div style="text-align:left;">
    <el-cascader
      :options="options"
      v-model="selectedOptions"
      :change-on-select="true"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
<script>
  /**
   * 自动搜索上级信息的级联菜单
   */
  export default {
    props: {
      value: [String, Number],
      options: Array
    },
    data () {
      return {
        selectedOptions: []
      };
    },
    created: function () {
      this.onValue(this.value);
    },
    watch: {
      value: function (newValue) {
        this.onValue(newValue);
      }
    },
    methods: {
      handleChange (value) {
        this.$emit('input', value[value.length - 1]);
      },
      findIndex (arr, value, o, level) {
        arr[level] = o.value;
        if ((o.value + '') === (value + '')) return true;

        if (o.children) {
          return o.children.some((child) => {
            return this.findIndex(arr, value, child, level + 1);
          });
        }
        return false;
      },
      onValue (newValue) {
        let v = [];
        if (newValue) {
          for (let option of this.options) {
            v = [];
            if (this.findIndex(v, newValue, option, 0)) {
              this.selectedOptions = v;
              return;
            }
          }
        }
        this.selectedOptions = [];
      }
    }
  };
</script>

<style>
  .demo-block {
    border:1px solid #eaeefb;
    border-radius:4px;
    transition:.2s
  }
  .demo-block.hover {
    box-shadow:0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5)
  }
  .demo-cascader .block {
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    float: left;
    width: 50%;
    box-sizing: border-box;
  }
  .demo-cascader {
    overflow: hidden;
  }
</style>
