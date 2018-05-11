<template>
  <div class="user">
    <div>
      <el-dropdown trigger="click" @command="exeCommand">
        <span class="userinfo-inner">
          <i class="el-icon-setting"></i> {{user.name}} <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :divided="item.divided"
            v-for="item of user.commands"
            :key="item.index"
            :command="item"
          >
            <span>{{item.label}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {
          name: '管理员',
          commands: [
          ],
        };
      },
    },
  },
  methods: {
    exeCommand(cmd) {
      this.$emit('redirect', cmd);
    },
  },
};
</script>


<style scoped>
.user {
  color: #E9EEF3;
}

.userinfo-inner {
  cursor: pointer;
  color: #fff;
  padding-left: 10px;
}
</style>
