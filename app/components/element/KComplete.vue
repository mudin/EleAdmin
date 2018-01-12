<template>
  <div>
    <el-autocomplete
      :options="options"
      v-model="selectedOptions"
      :fetch-suggestions="querySearch"
      :placeholder="label"
      @select="handleSelect">
      <template slot="prepend">{{label}}</template>
      <el-button slot="append" icon="plus" @click="dialog = true"/>
    </el-autocomplete>
    <el-dialog title="添加" v-model="dialog">
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="newName" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  /**
   * 带添加功能的自动完成提示框
   */
  export default {
    props: {
      value: [String, Number],
      options: {
        type: Array,
        'default': []
      },
      label: {
        type: String,
        'default': ''
      },
      name: String,
      url: String
    },
    data () {
      return {
        selectedOptions: '',
        dialog: false,
        newName: ''
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
      onValue (newValue) {
        console.log('newValue = ' + newValue);
        let v = this.options.find((n) => {
          /* eslint-disable */
          return n.id == newValue;
          /* eslint-enable */
        });
        if (v) {
          this.selectedOptions = v.value;
        } else {
          console.log('set empty');
          this.selectedOptions = '';
        }
      },
      querySearch (queryString, cb) {
        let restaurants = this.options;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect (item) {
        console.log('setValue = ' + item.id);
        this.$emit('input', item.id);
      },
      update () {
        this.$root.ajax({url: this.url}, {name: this.newName}).then((data) => {
          if (data.item) {
            this.options.push(data.item);
            this.handleSelect(data.item);
            this.dialog = false;
          }
        });
      }
    }
  };
</script>

<style scoped>
.el-autocomplete {
  width: 100%;
}
</style>
