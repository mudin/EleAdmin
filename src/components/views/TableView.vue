<template>
  <pannel class="el-main">
    <div slot="top" class="top">
      <div>
        <el-btn v-for="btn in view.btns" :act="btn" :key="btn.label"
        :multiSelect="multiSelect" :plain="true" @action="handleButton"/>
      </div>
      <ve-form :view="view.search" class="form-inline" @search="search">
      </ve-form>
    </div>
    <ve-table
      v-loading = "loading"
      slot="content"
      ref="table"
      :rows="rows"
      :columns="view.columns"
      :actions="view.actions"
      @action="ajax"
      @edit="edit"
      @sort="sortChange"
      @multipleSelection="handleSelectionChange">
    </ve-table>
    <el-pagination
      slot="foot"
      v-if="pSize > 0"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      layout="total,prev, pager, next"
      :total="total"
      :page-size ="pSize"
    >
    </el-pagination>
  </pannel>
</template>
<script>
import Rank from '../../Util/Rank';
import Pannel from './Pannel';
import VeTable from './VeTable';
import ElBtn from '../elements/ElBtn';
import VeForm from './VeForm';

export default {
  props: ['view'],
  mixins: [Rank],
  data() {
    return {
      // 数据
      rows: [],
      // 查询
      multipleSelection: [],
      searchValues: {},
      // 排序
      sort: {},
      // action: null,
      // 分页变量
      page: 1,
      pSize: 10,
      total: 0,
      // 搜索
      formInline: {
        user: '',
        region: '',
      },
    };
  },
  components: {
    Pannel,
    VeTable,
    ElBtn,
    VeForm,
  },
  mounted() {
    this.getData();
  },
  computed: {
    params() {
      const self = this;
      return {
        page: self.page,
        sort: self.sort,
        search: self.searchValues,
      };
    },
    multiSelect() {
      return this.multipleSelection.length !== 0;
    },
  },
  methods: {
    handleButton(btn) {
      let value;
      if (btn.multiSelect) value = { id: this.multipleSelection.map(r => r.id) };
      this.ajax(btn, value);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search(form) {
      this.search = form;
      this.getData();
    },
    /**
     * 相应翻页动作
     */
    handleCurrentChange() {
      this.getData();
    },
    /**
     * 排序动作
     */
    sortChange(sort) {
      if (!sort || !sort.column || !sort.column.sortable) return;
      this.page = 1;
      this.sort = { column: sort.column.property, order: sort.order };
      this.getData();
    },
    /**
     * 重新远程获取数据
     */
    getData() {
      const url = this.view.url;
      this.load(url, this.params).then((data) => {
        this.freshTable(data);
      });
    },
    /**
     * 刷新数据
     */
    freshTable(data) {
      if (!data) return;
      if (data.rows) this.rows = data.rows;
      if (data.total) this.total = data.total;
      this.$nextTick(() => {
        this.$refs.table.rowSelect(data.selected);
      });
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
.form-inline {
  margin-bottom: -18px;
}
</style>
