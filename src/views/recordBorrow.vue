<template>
  <el-card class="box-card">
    <el-row>
      <div class="head">借阅记录</div>
    </el-row>
    <p></p>
    <el-row>
      图书名称：<el-col :span="5">
      <el-input v-model="this.searchBookName" placeholder="请输入图书名称"></el-input>
    </el-col>&nbsp;
      借阅者：<el-col :span="5">
      <el-input v-model="this.searchBorrowerName" placeholder="请输入借阅者姓名"></el-input>
    </el-col>&nbsp;
      <el-col :span="2">
        <el-button @click="search">
          <el-icon>
            <Search/>
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="this.bookBorrowRecord" border stripe>
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column label="图书名称" prop="recordBookname" align="center"></el-table-column>
      <el-table-column label="标准ISBN" prop="recordBookisbn" align="center"></el-table-column>
      <el-table-column label="借书人" prop="recordBorrower" align="center"></el-table-column>
      <el-table-column label="借书时间" prop="recordBorrowtime" align="center"></el-table-column>>
      <el-table-column label="归还时间" prop="recordRemandtime" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "recordBorrow",
  data(){
    return{
      searchBookName:'',
      searchBorrowerName:'',
      bookBorrowRecord:[],
    }
  },
  created() {
    this.$http({
      url: 'http://localhost:8080/record/recordSelect',
      method: 'post',
      data:{
        "recordBookname":this.searchBookName,
        "recordBorrower":this.searchBorrowerName
      }
    }).then(res => {
      this.bookBorrowRecord = res.data.data;
    })
  },
  methods:{
    search(){
      this.$http({
        url: 'http://localhost:8080/record/recordSelect',
        method: 'post',
        data:{
          "recordBookname":this.searchBookName,
          "recordBorrower":this.searchBorrowerName
        }
      }).then(res => {
        this.bookBorrowRecord = res.data.data;
      })
    }
  }
}
</script>

<style scoped>

</style>