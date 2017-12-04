<template>
  <el-card class="box-card">
    <div slot="header" style="height: 36px">
      <span style="float:left;">{{label}}</span>
      <span  style="float:right;">
        <k-item-insert @extend="extend">添加</k-item-insert>
        <el-button type="primary" @click="showValue">查看</el-button>
        <el-button type="primary" @click="handleShow">{{btnShow}}</el-button>
        <el-button type="primary" @click="handleRemoveMe" v-if="item.notInsert !== true">删除</el-button>
      </span>
    </div>
    <div v-show="show">
      <k-item v-for="(ele, index) in item.items"
              :item="ele"
              :label="ele.label||index"
              v-model="value[ele.label||index]"
              :key="index"
              @remove="handleRemove"
      ></k-item>
    </div>
  </el-card>
</template>

<script>
  import KItem from './KItem.vue';
  import KItemInsert from './KItemInsert.vue';

  export default {
    props: {
      label: String,
      item: {
        type: Object,
        'default': () => { return {}; }
      },
      value: {
        type: Object,
        'default': () => { return {}; }
      }
    },
    computed: {
      btnShow () {
        return (this.show ? '收起' : '展开');
      }
    },
    data () {
      return {
        show: true,
        title: '添加项',
        visible: false
      };
    },
    components: {
      KItem,
      KItemInsert
    },
    watch: {
      value (val) {
        this.$emit('input', val);
      }
    },
    methods: {
      handleShow () {
        this.show = !this.show;
      },
      handleRemoveMe () {
        this.$emit('remove', this.label);
      },
      handleRemove (label) {
        this.$delete(this.value, label);
      },
      showValue () {
        console.log(JSON.stringify(this.value));
      },
      extend (schema) {
        if (!this.item.items) this.item.items = {};
        this.$set(this.item.items, schema.label, schema);
      }
    }
  };
</script>
