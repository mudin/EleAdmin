<template>
  <pannel class="el-main">
    <div slot="top" class="top">
      <div>
        <el-btn v-for="btn in view.btns" :act="btn" :key="btn.label"
        :multiSelect="true" :plain="true" @action="handleButton"/>
      </div>
    </div>
    <ve-tree slot="content" ref="tree"
    :rows="rows" :columns="view.columns" :actions="view.actions"
    @action="ajax" />
  </pannel>
</template>

<script>
import Rank from '../../Util/Rank';
import ElBtn from '../elements/ElBtn';
import Pannel from './Pannel';
import VeTree from './VeTree';
import View from './View';

export default {
  extends: View,
  components: {
    ElBtn,
    Pannel,
    VeTree,
  },
  mixins: [Rank],
  data() {
    return {
      rows: this.view.rows,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleButton(btn) {
      let value;
      if (btn.multiSelect) value = { id: this.$refs.tree.getCheckedKeys() };
      this.ajax(btn, value);
    },
    getData() {
      this.load(this.view.url).then((data) => {
        this.rows = data.rows;
        this.$nextTick(() => {
          this.rowSelect(data.selected);
        });
      });
    },
    /**
     * 重置选中行
     */
    rowSelect(s) {
      if (s) this.$refs.tree.setCheckedKeys(s);
    },
  },
};
</script>

<style scoped>
.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}
</style>
