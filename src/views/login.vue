<template>

  <div class="box">
    <div class="logLogo">
      <h3>Login</h3>
    </div>
    <el-form ref="loginFormRef" :model="user" :rules="loginFormRules">
      <div class="account">
        账号
      </div>
      <el-form-item prop="username">
        <el-input v-model="user.userName" placeholder="请输入你的帐号" clearable/>
      </el-form-item>
      <div class="password">
        密码
      </div>
      <el-form-item prop="password">
        <el-input v-model="user.userPassword" type="password" placeholder="请输入你的密码" show-password/>
      </el-form-item>
    </el-form>
    <div class="loginButton">
      <el-button type="primary" round @click="handleLogin">登录</el-button>
      <el-button type="info" round @click="resetLoginForm">重置</el-button>
    </div>

  </div>
  <!---->
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "admin",
        userPassword: "123456",
      },
      //表单验证规则对象
      loginFormRules: {
        userName: [
          {require: true, message: "请输入登录名称", trigger: "blur"},
          {min: 3, max: 15, message: "长度在3到15个字符", trigger: "blur"}
        ],
        userPassword: [
          {require: true, message: "请输入登录密码", trigger: "blur"},
          {min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur"}
        ],
      }
    }

  },
  methods: {
    handleLogin() {
      var vm = this;
      vm.$http({
        url: '/user/login',
        method: 'post',
        data: {
          "userName": this.user.userName,
          "userPassword": this.user.userPassword
        }
      }).then(res => {
        if (String(res.data.code) === "1") {
          //将token和user保存到localStorage中
          localStorage.setItem('token',res.data.token)
          // vm.$store.commit('setToken', res.data.token);
          // vm.$store.commit('setUser', res.data.user);
          this.$message.success("登录成功！");
          this.$router.push("/home");
        }
      })
    }
  }
}

</script>

//登录前预验证
//   this.$refs.loginFormRef.validate(async(valid) => {
//         console.log(valid);
//         if (!valid) {
//           return;
//         }
//         //向后台发送请求
//         await this.$http({
//           url: 'http://localhost:8080/user/login',
//           method: 'post',
//           data: {
//             "userName":this.user.userName,
//             "userPassword":this.user.userPassword
//           }
//         }).then(res => {
//           if (String(res.data.code) === "1") {
//             localStorage.setItem("user", this.user.userName)
//             //将token和user保存到localStorage中
//             //vm.$store.commit('setToken',res.data.token)
//             //vm.$store.commit('setUser',res.data.user)
//             this.$message.success("登陆成功！");
//             this.$router.push("/home");
//           } else {
//             this.$message.error("账号或密码错误");
//           }
//         })
//       },
//   )
// },
// resetLoginForm() {
//   this.$refs.loginFormRef.resetFields();
// }

<style scoped>

.box {
  margin-top: 150px;
  margin-left: 520px;
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  /*align-items: center;*/
  width: 350px;
  height: 380px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 40px;
}

.logLogo {
  margin-top: 20px;
  margin-left: 40%;
}

.account {
  margin-top: 40px;
  margin-bottom: 10px;
  /*margin-left: 50%;*/
}

.password {
  margin-top: 20px;
  margin-right: 310px;
  margin-bottom: 10px;
}

.loginButton {
  margin-top: 30px;
  margin-left: 30%;
}

</style>

