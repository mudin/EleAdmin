<template>
  <span>
    <el-button type="primary" @click="handleExtend">添加</el-button>
    <el-dialog :title="title" :visible.sync="visible" :modal="false" width="60%">
      <k-item
        label="添加"
        v-model="value"
        :item="schema.item"
      />
      <span slot="footer">
        <el-button type="primary" @click="extend">插入</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
  import KItem from './KItem.vue';

  function getSchema () {
    return {
      item: {
        items: {
          '标签': {
            must: true
          },
          '形式': {
            holder: 'select',
            options: [
              {label: '字符串', value: 'input'},
              {label: '下拉菜单', value: 'select'},
              {label: '开关', value: 'switch'},
              {label: '控件组', value: 'group'}
            ]
          },
          '数组化': {
            holder: 'switch'
          },
          '下拉选项': {
            holder: 'pair',
            asArray: true,
            on: {
              label: '形式',
              value: 'select'
            }
          }
        },
        holder: 'group',
        notInsert: true
      }
    };
  }

  export default {
    data () {
      return {
        title: '添加项',
        visible: false,
        value: {},
        schema: getSchema()
      };
    },
    components: {
      KItem
    },
    methods: {
      handleExtend () {
        this.visible = true;
      },
      extend () {
        let v = {};
        v.options = [];
        Object.keys(this.schema.item.items).forEach((index) => {
          switch (index) {
            case '标签':
              if (this.value['标签']) v['label'] = this.value['标签'];
              break;
            case '形式':
              if (this.value['形式']) v['holder'] = this.value['形式'];
              break;
            case '数组化':
              v['asArray'] = !!(this.value['数组化']);
              break;
            case '下拉选项':
              if (this.value['下拉选项']) {
                this.value['下拉选项'].forEach((e) => {
                  v.options.push(JSON.parse(JSON.stringify(e)));
                });
              }
              break;
            default:
              v[index] = this.value[index];
          }
        });
        // 无标签不添加
        if (v.label) this.$emit('extend', v);
        // 重置
        this.reset();
      },
      reset () {
        // 重置
        this.value = {};
        this.visible = false;
      }
    }
  };
</script>

<style scoped>
  span {
    padding-right: 10px;
  }
</style>
