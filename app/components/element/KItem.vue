<template>
  <el-row :class="{'el-item-line' : !isGroup}">
    <el-col :span="4" class="el-item" v-if="item.holder !== 'group'">{{label}}</el-col>
    <el-col :span="(isGroup ? 24 : 20)" >
      <el-row v-for="(v, index) in local" :key="index">
        <el-col :span="(isGroup ? 24 : 20)" class="el-item">
          <el-switch         v-if="item.holder === 'switch'" v-model="local[index]"
                             :active-color="item.onColor||'#13ce66'"
                             :inactive-color="item.offColor||'#ff4949'"
                             :active-text="item.onText||'开启'"
                             :inactive-text="item.offColor||'关闭'"
                             :disabled="disabled"

          ></el-switch>
          <k-pair       v-else-if="item.holder === 'pair'"   v-model="local[index]"
                             :disabled="disabled"
          ></k-pair>
          <el-select    v-else-if="item.holder === 'select'" v-model="local[index]"
                        :disabled="disabled"
          >
            <el-option :label="o.label" v-for="o in item.options" :value="o.value" :key="o.label"></el-option>
          </el-select>
          <k-item-group v-else-if="item.holder === 'group'"  v-model="local[index]"
                        :item="item" :label="label" @remove="handleRemove(index)"
          ></k-item-group>
          <el-input        v-else="item.holder === 'input'"  v-model="local[index]"
                           :disabled="disabled"
          ></el-input>
        </el-col>
        <el-col :span="4" class="el-item" v-if="item.holder !== 'group'">
          <el-button :icon="btnIcon" :type="btnType" @click="handleRemove(index)" round size="mini"></el-button>
        </el-col>
      </el-row>
      <el-row v-if="item.asArray" v-show="!disabled">
        <el-button type="info" style="width: 100%;" @click="add">+</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    props: {
      label: String,
      item: {
        type: Object,
        'default': () => { return {}; }
      },
      value: {
        'default': null
      }
    },
    data () {
      return {
        disabled: false,
        // 本地值 local ===  value
        local: []
      };
    },
    components: {
      KItemGroup: function index (resolve) {
        require(['./KItemGroup.vue'], resolve);
      },
      KPair: function index (resolve) {
        require(['./KPair.vue'], resolve);
      }
    },
    created () {
      this.defaultValue();
    },
    watch: {
      local (val) {
        if (this.disabled) return;

        if (this.item.asArray) {
          this.$emit('input', val);
        } else {
          this.$emit('input', val[0]);
        }
      },
      value () {
        this.defaultValue();
      }
    },
    computed: {
      btnType () {
        return (this.disabled ? 'primary' : 'danger');
      },
      btnIcon () {
        return 'el-icon-' + (this.disabled ? 'edit' : 'minus');
      },
      isGroup () {
        return this.item.holder === 'group';
      }
    },
    methods: {
      defaultValue () {
        // console.log(this.label + '=' + this.value);

        if (this.value !== null) {
          this.local = ((this.item.asArray) ? this.value : [this.value]);
          return;
        }

        this.local = [];
        this.actRemove();
      },
      add () {
        if (this.item.holder === 'group' || this.item.holder === 'pair') this.local.push({});
        else this.local.push(null);
      },
      handleRemove (index) {
        // 启动
        if (this.disabled) {
          this.disabled = false;
          return;
        }
        // 删除
        this.local.splice(index, 1);
        // 赋值为默认值用于占位并禁用
        if (this.local.length === 0) {
          // console.log('remove' + this.label + index);
          this.actRemove();
          // return;
        }
        // 提示
        // console.log('delete' + this.label + index);
      },
      actRemove () {
        this.disabled = true;
        this.add();
        this.$emit('remove', this.label);
      }

    }
  };
</script>

<style scoped="true">
  .el-row{
    margin: 10px 0;
  }

  .el-item{
    padding: 10px;
    line-height: 36px;
  }

  .el-item-line{
    border-bottom: #cccccc solid 1px;
  }

  .item-btn{
    padding: 0 5px;
  }

  .center{
    text-align: center;
  }
</style>
