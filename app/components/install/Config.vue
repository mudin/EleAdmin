<template>
  <el-card class="box-card">
    <div slot="header" class="header">
      <span>数据库</span>
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="数据库驱动">
        <el-radio-group v-model="value.db.type">
          <el-radio label="0">Mysql</el-radio>
          <el-radio label="1">Mssql</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主机地址">
        <el-input v-model="value.db.host"></el-input>
      </el-form-item>
      <el-form-item label="主机端口">
        <el-input v-model="value.db.port"></el-input>
      </el-form-item>
      <el-form-item label="数据库名称">
        <el-input v-model="value.db.name"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="value.db.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="value.db.password"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    props: {
      mate: Object
    },
    data () {
      return {
        value: {
          db: {
            type: 0,
            host: 'localhost',
            port: '3306',
            username: 'root',
            password: '',
            name: ''
          }
        }
      };
    },
    methods: {
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
