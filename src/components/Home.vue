<template>

  <el-container class="home-container">
    <!--      头部区域-->
    <el-header>
      <div>
        <img src="../assets/logo.png" width="50" alt="">
        <span>云图书管理系统</span>
      </div>
      <el-button type="info" @click="logout()">退出登录</el-button>
    </el-header>
    <!--   页面主体区域   -->
    <el-container>
      <!--        侧边栏-->
      <el-aside width="200px">
        <!--        侧边栏菜单区域-->
        <el-col :span="24">
          <el-menu
              active-text-color="#65B787"
              background-color="#F6E2E8"
              class="el-menu-vertical-demo"
              text-color="#2B2B2B"
              @open="handleOpen"
              @close="handleClose"
              :unique-opened="true"
              router="true"
          >
            <!--首页-->
            <el-menu-item index="bookRecommend">
              <el-icon><icon-menu /></el-icon>
              <span>首页</span>
            </el-menu-item>

            <!--图书借阅-->
            <el-menu-item index="bookBorrow">
              <el-icon><icon-menu /></el-icon>
              <span>图书借阅</span>
            </el-menu-item>

            <!--当前借阅-->
            <el-menu-item index="currentBorrow">
              <el-icon><icon-menu /></el-icon>
              <span>当前借阅</span>
            </el-menu-item>

            <!--借阅记录-->
            <el-menu-item index="recordBorrow">
              <el-icon><icon-menu /></el-icon>
              <span>借阅记录</span>
            </el-menu-item>

            <!--图书管理-->
            <el-menu-item index="bookAdd">
              <el-icon><icon-menu /></el-icon>
              <span>图书管理</span>
            </el-menu-item>


          </el-menu>

        </el-col>

      </el-aside>
      <!--        右侧 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods:{
    logout(){
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #DDEBFD;
  display: flex;
  justify-content: space-between;
  /*padding-left: 0px;*/
  align-items: center;
}

.el-aside {
  background-color: #FBE1E8;
}

.el-main {
  background-color: #EAEDF0;
}
</style>