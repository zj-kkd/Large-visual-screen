<template>
  <div class="page-login">
    <el-form label-width="80px" :model="loginData" :rules="loginCheck" ref="login">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="loginData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input placeholder="请输入密码" v-model="loginData.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { username, pwd } from "../tool/validator";

export default {
  data() {
    return {
      loginData: {
        username: "",
        pwd: ""
      },

      // 校验
      loginCheck: {
        username: [{ trigger: "change", validator: username }],
        pwd: [{ trigger: "change", validator: pwd }]
      }
    };
  },

  methods: {
    login() {
      this.$refs.login.validate(res => {
        if (res) {
          this.$http.get("/login", this.loginData).then(res => {
            console.log(234, res)
            if (res.status == 200) {
              localStorage.setItem("token", JSON.stringify(res.data));
              this.$store.commit("token", res.data);
              this.$router.push("/home");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-login {
  width: 40%;
  margin: auto;
}
</style>