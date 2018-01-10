<template>
  <div class="box">
    <el-row>
      <el-col :span="24">
        <div class="btn-block">
          <div class="left">
            <k-btn v-for="btn in config.btns" :act="btn" :key="btn.label" :hasSelected="hasSelected" :plain="true"
                   @action="handleButton"/></div>
          <slot name="search"/>
        </div>
      </el-col>
    </el-row>
    <slot name="main"/>
  </div>
</template>

<script>
export default {
  components: {
    KBtn: function index (resolve) {
      require(['../element/KBtn.vue'], resolve);
    }
  },
  props: {
    config: Object,
    hasSelected: Boolean
  },
  methods: {
    handleButton (btn, row) {
      this.$emit('action', btn, row);
    }
  }
};
</script>

<style>
  .main-block .box {
    clear: both;
    overflow: hidden;
    transition: height .2s;
  }
  .btn-block {
    padding: 13px 24px 10px 0;
    overflow: hidden;
    border-bottom: 1px solid #eff2f6;
    height: 49px;
  }
  .left{
    float: left;
  }
</style>
