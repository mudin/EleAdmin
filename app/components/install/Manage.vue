<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 36px;">管理员</span>
    </div>
    <div class="el-form-item">
      <el-input type="text" v-model="value.admin.name">
        <template slot="prepend">超级管理员</template>
      </el-input>
    </div>
    <div class="el-form-item">
      <el-input type="password" v-model="value.db.password">
        <template slot="prepend">密码</template>
      </el-input>
    </div>
    <div class="el-form-item">
      <el-input type="text" v-model="value.admin.email">
        <template slot="prepend">Email</template>
      </el-input>
    </div>
    <div class="el-form-item"></div>
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
          admin: {
            name: 'admin',
            password: '',
            email: ''
          }
        }
      };
    },
    methods: {
    }
  };
</script>
