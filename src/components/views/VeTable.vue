<template>
  <el-table
    ref="table"
    :data="rows"
    tooltip-effect="dark"
    style="width: 100%"
    border
    stripe
    @selection-change="handleSelectionChange"
    @sort-change="sortChange">
    <el-table-column
      header-align="center"
      type="selection"
      align="center"
      width="55">
    </el-table-column>
    <el-table-column
      v-for="col in columns"
      :key="col.index"
      :label="col.label"
      :prop="col.name"
      :width="col.colWidth"
      :sortable="col.sortable"
      :header-align="col.header || 'center'"
      :align="col.align || 'center'"
    >
      <template slot-scope="scope">
        <el-table-cell
          :row="scope.row"
          :col="col"
          @eidt="edit"
        />
        </template>
    </el-table-column>
    <el-table-column label="操作" v-if="actions"
      header-align="center" :width="actionsWidth">
      <template slot-scope="scope">
        <el-btn
          v-for="act in actions.items" :key="act.index"
          :act="act" :row="scope.row"
          @action="handleRowBtn"
          size="mini"
        />
      </template>
    </el-table-column>
  </el-table>
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
    actionsWidth() {
      return `${this.actions.items.length * 90}px`;
    },
  },
  methods: {
    // 响应行按钮
    handleRowBtn(btn, row) {
      this.$emit('action', btn, { id: row.id });
    },
    /**
     * 响应选择动作
     */
    handleSelectionChange(val) {
      this.$emit('multipleSelection', val);
    },
    /**
     * 排序动作
     */
    sortChange(sort) {
      this.$emit('sort', sort);
    },
    /**
     * 重置选中行
     */
    rowSelect(s) {
      // 没有选择行
      if (!s) this.$refs.table.clearSelection();
      this.rows.forEach((row) => {
        // eslint-disable-next-line
        if (row.id && (s.findIndex(id => id == row.id) !== -1)) {
          this.$refs.table.toggleRowSelection(row);
        }
      });
    },
    edit(row, col, v) {
      this.$emit('edit', row, col, v);
    },
  },
};
</script>
<style scoped>
</style>
