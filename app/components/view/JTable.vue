<template>
  <Boxer :config="config" :hasSelected="hasSelected" @action="handleButton" ref="Boxer">
    <div slot="search" class="search">
      <j-form :config="config.search" v-if="config.search" v-on:search="search"/>
    </div>
    <div slot="main">
      <el-row>
        <el-col :span="24">
          <el-table ref="table" :data="rows" border
                    @selection-change="handleSelectionChange" @sort-change="sortChange"
                    style="width: 100%"
          >
            <el-table-column type="selection" width="50"/>
            <el-table-column v-for="col in config.columns" :key="col.label"
                             :label="col.label" :prop="col.name"
                             :width="col.width" :sortable="col.sortable"
            >
              <template slot-scope="scope">
                <a v-if="col.holder === 'link'" :href="scope.row[col.link]">{{scope.row[col.name]}}</a>
                <template v-else-if="col.holder === 'switch'">{{getSwitchValue(col, scope.row[col.name])}}</template>
                <template v-else>{{scope.row[col.name]}}</template>
              </template>
            </el-table-column>
            <el-table-column label="操作" :width="actionWidth" v-if="config.actions">
              <template slot-scope="scope">
                <k-btn
                  v-for="act in config.actions" :key="act.index"
                  size="small" :act="act" :row="scope.row"
                  @action="handleAction"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="page"  v-if="pSize > 0">
      <el-col :span="12">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout="total,prev, pager, next"
          :total="total"
          :page-size ="pSize">
        </el-pagination>
      </el-col>
      </el-row>
    </div>
  </Boxer>
</template>
<script>
import KBtn from '../element/KBtn.vue';
import Boxer from './Boxer.vue';

export default {
  components: {
    KBtn,
    Boxer,
    JForm: function index (resolve) {
      require(['./JForm.vue'], resolve);
    }
  },
  props: {
    config: Object
  },
  data () {
    return {
      // 顶部按钮
      multipleSelection: [],
      // 查询
      searchValues: {},
      // 排序
      sortValues: {},
      action: null,
      // 分页变量
      page: 0,
      rows: [],
      pSize: 10,
      total: 0,
      selected: []
    };
  },
  created () {
    this.updateData(this.config);
  },
  watch: {
    config  (newConfig) {
      this.$nextTick(() => {
        this.updateData(newConfig);
      });
    }
  },
  computed: {
    actionWidth () {
      return this.config.actions.length * 60 + 30;
    },
    hasSelected () {
      return (this.multipleSelection.length !== 0);
    }
  },
  //  mounted () {
  //    this.rowSelect();
  //  },
  // 需要添加刷新消息
  methods: {
    // 响应顶部按钮
    handleButton (btnAction) {
      this.send(btnAction, (btnAction.multiSelect) ? {id: this.multipleSelection.map((r) => r.id)} : null);
    },
    // 响应行按钮
    handleAction (rowAction, row) {
      this.send(rowAction, {id: row.id});
    },

    send (act, value) {
      this.$root.action(act, value, (act, value) => {
        this.$emit('monitor', act, value);
      }, () => {
        // 不跳转就刷新
        this.getData();
      });
    },
    /**
     * 重置选中行
     */
    rowSelect () {
      // 没有选择行
      if (!(this.selected)) return;
      // 有选择行
      this.config.rows.forEach(row => {
        let select = (
          row.id &&
          (this.selected.findIndex((id) => {
            /* eslint-disable */
            return id == row.id;
            /* eslint-enable */
          }) !== -1)
        );
        this.$refs.table.toggleRowSelection(row, Boolean(select));
      });
    },
    /**
     * 响应选择动作
     */
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    /**
     * 相应翻页动作
     */
    handleCurrentChange (val) {
      console.log('翻页动作');
      this.page = val;
      this.getData();
    },
    /**
     * 重新远程获取数据
     */
    getData () {
      // console.log(this.config.dataApi);
      let url = this.config.dataApi;
      let param = {
        search: this.searchValues,
        page: this.page,
        sort: this.sortValues
      };
      this.$refs.table.clearSelection();
      this.$root.ajaxer(url, param).then((data) => {
        this.updateData(data);
      });
    },
    /**
     * 刷新数据
     */
    updateData (data) {
      if (data.rows) this.rows = data.rows;
      if (data.total) this.total = data.total;
      this.selected = data.selected || [];
      if (data.size) this.pSize = data.size;
      this.$nextTick(() => { this.rowSelect(); });
    },
    /**
     * 排序动作
     */
    sortChange (sort) {
      if (!sort || !sort.column || !sort.column.sortable) return;
      this.sortValues = {order: sort.order, column: sort.prop};
      console.log('排序动作');
      this.getData();
    },
    /**
     * 查询时 页面自动重置
     *
     * @param data 查询参数
     */
    search (data) {
      this.searchValues = data;
      this.page = 0;
      console.log('查询动作');
      this.getData();
    },
    getSwitchValue (col, is) {
      if (typeof is === 'boolean' && col['active-text'] && col['inactive-text']) {
        return is ? col['active-text'] : col['inactive-text'];
      } else {
        return is;
      }
    }
  }
};
</script>

<style scoped>
  .page {
    margin-top: 20px;
  }

  .search {
    display: inline-block;
    margin-left: 30px;
    float: left;
  }
  .el-form--inline .el-form-item {
    margin-bottom: 0
  }
</style>
