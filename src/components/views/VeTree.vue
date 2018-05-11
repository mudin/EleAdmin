<template>
  <div class="tree-view">
      <div class="tree-view-row tree-view-header">
        <div v-for="col in columns" :key="col.index"
        :style="colStyle(col)" class="title">{{col.label}}</div>
        <div :style="actionsStyle" v-if="actions" class="title">操作</div>
      </div>
      <el-tree :data="rows" show-checkbox ref="tree" class="tree-view-box">
        <div slot-scope="{ node, data }" class="tree-view-row">
          <el-table-cell v-for="(col, index) in columns" :key="data.index + col.index"
          :col="col" :row="data" :style="colStyle(col, index)"/>
          <span :style="actionsStyle" v-if="actions">
            <el-btn
              v-for="act in actions.items" :key="act.index"
              :act="act" :row="data"
              @action="ajax"
              size="mini" />
          </span>
        </div>
      </el-tree>
    </div>
</template>

<script>
import ElTableCell from '../elements/ElTableCell';
import ElBtn from '../elements/ElBtn';

export default {
  props: ['columns', 'rows', 'actions'],
  components: {
    ElTableCell,
    ElBtn,
  },
  computed: {
    actionsStyle() {
      const width = this.actions ? `${this.actions.items.length * 80}px` : 0;
      return {
        width,
        textAlign: 'center',
        paddingRight: '0 10px',
      };
    },
  },
  methods: {
    ajax(act) {
      this.$emit('action', act);
    },
    /**
     * 重置选中行
     */
    rowSelect(s) {
      if (s) this.$refs.tree.setCheckedKeys(s);
    },
    colStyle(col, index = 1) {
      const style = {
        width: col.width || '60px',
      };
      if (index) style.textAlign = col.textAlign || 'center';
      else if (col.textAlign) style.textAlign = col.textAlign;
      return style;
    },
  },
};
</script>

<style scoped>
.tree-view {
  flex: 1;
}
.tree-view-box {
  flex: 1;
  align-items: center;
}
.tree-view-row {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
}

.title {
  border-right : 1px solid #e0e6ed;
  white-space: nowrap;
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  min-width: 0;
  text-overflow: ellipsis;
  box-sizing: border-box;
  font-size: 14px;
  color: #ffffff;
}

.tree-view-header {
  border: 1px solid #e0e6ed;
  margin-bottom: 5px;
  background-color: #1f2d3d;
}
.tree-view-header>:last-child {
  border-right: 0;
}
</style>

