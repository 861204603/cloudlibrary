<template>
  <el-card class="box-card">
    <el-row>
      <div class="head">图书管理</div>
    </el-row>
    <p></p>
    <el-row>
      <el-button @click="this.dialogFormVisible2=true">新增图书</el-button>&nbsp;
      图书名称：<el-col :span="5">
      <el-input v-model="this.searchBookName" placeholder="请输入图书名称"></el-input>
    </el-col>&nbsp;
      图书作者：<el-col :span="5">
      <el-input v-model="this.searchAuthorName" placeholder="请输入作者姓名"></el-input>
    </el-col>&nbsp;
      <el-col :span="2">
        <el-button @click="search">
          <el-icon>
            <Search/>
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="this.bookRecommend" border stripe>
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column label="图书名称" prop="bookName" align="center"></el-table-column>
      <el-table-column label="图书作者" prop="bookAuthor" align="center"></el-table-column>
      <el-table-column label="出版社" prop="bookPress" align="center"></el-table-column>
      <el-table-column label="标准ISBN" prop="bookIsbn" align="center"></el-table-column>
      <el-table-column label="书籍状态"  align="center">
        <template v-slot="scope">
          <el-tag v-if="scope.row.bookStatus==1">借阅中</el-tag>
          <el-tag v-if="scope.row.bookStatus==0">可借阅</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="借阅人" prop="bookBorrower" align="center"></el-table-column>
      <el-table-column label="借阅时间" prop="bookBorrowtime" align="center"></el-table-column>
      <el-table-column label="预计归还时间" prop="bookReturntime" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button type="success" v-if="scope.row.bookStatus==1" disabled>
            删除
          </el-button>
          <el-button type="success" v-if="scope.row.bookStatus==0"
                     @click="getBookId(scope.row.bookId)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="删除图书" style="text-align: center">
      <el-descriptions
          :column="4"
          :size="size"
          border
      >
      </el-descriptions>
      <p></p>
      <el-button type="info" round @click="this.dialogFormVisible=false">取消</el-button>
      <el-button type="success" round @click="deleteBook(this.ID)">确定</el-button>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible2" title="新增图书" style="text-align: center">
      <el-descriptions
          :column="4"
          :size="size"
          border
      >
        <el-descriptions-item label="图书名称">
          <el-input v-model="this.book.bookName"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="标准ISBN">
          <el-input v-model="this.book.bookIsbn"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="出版社" :span="2">
          <el-input v-model="this.book.bookPress"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="作者">
          <el-input v-model="this.book.bookAuthor"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="书籍页数">
          <el-input v-model="this.book.bookPagination"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="价格">
          <el-input v-model="this.book.bookPrice"></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <p></p>
      <el-button type="info" round @click="this.dialogFormVisible=false">取消</el-button>
      <el-button type="success" round @click="addBook(this.book)">确定</el-button>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  name: "bookAdd",
  data(){
    return {
      searchBookName:'',
      searchAuthorName:'',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      bookRecommend: [],
      ID:'',
      book: {
        bookId:'',
        bookName:'',
        bookIsbn:'',
        bookPress:'',
        bookAuthor:'',
        bookPagination:'',
        bookReturntime:'',
        bookPrice:'',
        bookUploadtime:'',
        bookStatus:'',
        bookBorrower:'',
        bookBorrowtime:'',
      }
    }
  },
  created() {
    this.$http({
      url: 'http://localhost:8080/book/bookSelect',
      method: 'post',
      data:{
        "bookName":this.searchBookName,
        "bookAuthor":this.searchAuthorName
      }
    }).then(res => {
      this.bookRecommend = res.data.data;
    })
  },
  methods:{
    search(){
      this.$http({
        url: 'http://localhost:8080/book/bookSelect',
        method: 'post',
        data:{
          "bookName":this.searchBookName,
          "bookAuthor":this.searchAuthorName
        }
      }).then(res => {
        this.bookRecommend = res.data.data;
      })
    },
    getBookId(id){
      this.dialogFormVisible=true;
      this.ID=id;
    },
    deleteBook(id){
      this.dialogFormVisible=false;
      this.$http({
        url:'http://localhost:8080/book/delete/'+id,
        method:'post',
      }).then(res=>{
        if(res.data.code==1){
          this.$message.success(res.data.data);
          this.$http({
            url: 'http://localhost:8080/book/bookSelect',
            method: 'post',
            data:{
              "bookName":this.searchBookName,
              "bookAuthor":this.searchAuthorName
            }
          }).then(res => {
            this.bookRecommend = res.data.data;
          })
        }else{
          this.$message("借阅失败");
        }
      })
    },
    addBook(book){
      this.dialogFormVisible2=false;
      this.$http({
        url:'http://localhost:8080/book/add',
        method:'post',
        data:{
          "bookId":'',
          "bookName":book.bookName,
          "bookIsbn":book.bookIsbn,
          "bookPress":book.bookPress,
          "bookAuthor":book.bookAuthor,
          "bookPagination":book.bookPagination,
          "bookPrice":book.bookPrice,
          "bookUploadtime":'',
          "bookStatus":"0",
          "bookBorrower":'',
          "bookBorrowtime":'',
          "bookReturntime":''
        }
      }).then(res=>{
        if(res.data.code==1){
          book.bookName='',
          book.bookPagination='';
          book.bookIsbn='';
          book.bookAuthor='';
          book.bookPrice='';
          book.bookPress='';
          this.$message.success(res.data.data);
          this.$http({
            url: 'http://localhost:8080/book/bookSelect',
            method: 'post',
            data:{
              "bookName":this.searchBookName,
              "bookAuthor":this.searchAuthorName
            }
          }).then(res => {
            this.bookRecommend = res.data.data;
          })
        }else{
          this.$message("借阅失败");
        }
      })
    }
  }
}
</script>

<style scoped>

</style>