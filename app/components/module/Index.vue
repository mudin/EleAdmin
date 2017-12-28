<template>
<div>
  <el-row type="flex" justify="center">
    <el-col>

          <k-item
            :label="config.label"
            :value="config.value"
            :item="config.item"
          ></k-item>

    </el-col>
  </el-row>
</div>
</template>

<script>
  import KItem from '../element/KItem.vue';

  export default {
    props: {
      config: Object
    },
    data () {
      return {
      };
    },
    components: {
      KItem
    },
    watch: {
      value (val) {
        this.$emit('input', val);
      }
    },
    methods: {
      handleOpen () {
        this.visible = true;
      }
    }
  };
</script>
<style scoped>
</style>
