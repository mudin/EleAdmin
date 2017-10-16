<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span>数据库</span>
    </div>
    <el-form ref="form" :model="db" label-width="100px"  :rules="rules">
      <el-form-item label="数据库驱动" prop="type">
        <el-radio-group v-model="db.type">
          <el-radio label="0" :validateEvent="false">Mysql</el-radio>
          <el-radio label="1" :validateEvent="false">Mssql</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主机地址" prop="host">
        <el-input v-model="db.host" :validateEvent="false"></el-input>
      </el-form-item>
      <el-form-item label="主机端口" prop="port">
        <el-input v-model="db.port" :validateEvent="false"></el-input>
      </el-form-item>
      <el-form-item label="数据库名称" prop="name">
        <el-input v-model="db.name" :validateEvent="false"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="user">
        <el-input v-model="db.user" :validateEvent="false"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="db.pass" :validateEvent="false"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    props: {
      value: Object
    },
    data () {
      return {
        db: this.value.db,
        rules: {
          name: [{required: true, message: '请输入数据库名称', trigger: 'blur'}],
          pass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        }
      };
    },
    created () {
    },
    mounted () {
      this.$watch('db', () => {
        this.$refs['form'].validate((valid) => {
          // this.$emit('change', 'db', this.db);
          this.$emit('activeNext', !!(valid));
        });
      }, {
        deep: true
      });
    },
    methods: {
    },
    watch: {
    }
  };
</script>

<style scoped>
  .box-card {
    width:500px;
    margin: auto;
    text-align: left;
  }
  .header {
    text-align: center;
    line-height: 36px;
  }
</style>
