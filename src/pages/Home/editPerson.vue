<template>
    <div>
        <template>
            <div class="Search">
            <template>
                <el-select v-model="value"
                           @change="searchResultChange"
                           clearable
                           filterable
                           remote
                           reserve-keyword
                           placeholder="请输入学员姓名 "
                           :remote-method="searchInput">
                    <el-option v-for="item in searchResult"
                               :key="item.username"
                               :value="item.username">
                    </el-option>
                </el-select>
            </template>
            <el-button type="success"
                       @click="dialogVisible=true">添加信息</el-button>
            </div>

            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :rules="stuRules" ref="ruleForm">
                <el-form :model="stuForm">

                    <el-form-item label="用户名" :label-width="formLabelWidth" prop="class">
                        <el-input  v-model="stuForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="别名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="stuForm.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth" prop="age">
                        <el-input v-model="stuForm.des" autocomplete="of3f"></el-input>
                    </el-form-item>
                    <el-form-item label="爱好" :label-width="formLabelWidth" prop="city">
                        <el-input v-model="stuForm.habit" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="degree">
                        <el-input  v-model="stuForm.sex" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="formLabelWidth" prop="productUrl" >
                        <el-input v-model="stuForm.age" autocomplete="off"></el-input>
                    </el-form-item>



                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAddstu('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>


            <el-table
                    :data="userList"
                    style="width: 100%;margin-top:20px"
            >


                <el-table-column align="center"
                                 prop="username"
                                 label="用户名"
                >
                </el-table-column>
                <el-table-column
                        prop="nickname"
                        label="别名" align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="des"
                        label="描述" align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="habit"
                        label="爱好" align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别" align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="age"
                        label="年龄" align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="lev"
                        label="等级" align="center"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作" align="center"
                >
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle
                                   @click="handleEdit(scope.index, scope.row)"></el-button>
                        <el-button
                                @click.native.prevent="deleteRow(scope.index, scope.row)"
                                type="danger" icon="el-icon-delete" circle>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    import {getUsers,deleteUser,searchUser} from "../../api"
  export default {
    data(){
      return{
        dialogVisible:false,
        value:'',
        userList:[],
        level:'',
        searchResult:[],
        formLabelWidth: '100px',
        dialogTitle: "",//dialog标题
        stuRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          class: [
            {required: true, message: '请输入班级', trigger: 'blur'},
          ],
          city: [
            {required: true, message: '请输入城市', trigger: 'blur'},
          ],
          degree: [
            {required: true, message: '请输入学历', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入描述', trigger: 'blur'},
          ],
          productUrl: [
            {required: true, message: '请输入作品地址', trigger: 'blur'},
          ],
          avatar: [
            {required: true, message: '头像', trigger: 'blur'},
          ],
        },

        stuForm: {
          username: '',
          nickname: '',
          des: '',
          habit: '',
          sex: '',
          age: '',
        },
      }
    },
    methods:{
      searchResultChange(key){
        if (!key) {
          this.getUsers()
        } else {
          this.userList = this.searchResult.filter(item => item.username === key)
        }
      },

      searchInput(key) {
        searchUser(key)
          .then(res => {
            if (res.data.code) {
              this.searchResult = [];
              this.searchResult.push(res.data.data);
            } else {
              this.searchResult = []
            }
            console.log(res)
          })
          .catch(err => {
            throw new Error(err)
          });
        console.log(key)
      },
      handleEdit(){
        this.dialogVisible=true;
      },
      deleteRow(index,row){
        var name=row.username;
        var _this=this;
        if (_this.level == 3){
          deleteUser(name)
            .then(res=>{
              console.log(res);
              getUsers()
                .then(res=>{
                  this.userList=res.data.data.res
                })
            })
            .catch(err=>{
              console.log(err);
            })
        } else {
          _this.$message({
            type:'error',
            message:'对不起,您的等级不足'
          })
        }

      },
    },
    created(){
      getUsers()
        .then(res=>{
          this.userList=res.data.data.res
        })
        .catch(err=>{
          console.log(err);
        })
    },
    mounted(){
      this.level=localStorage.getItem('level');
    }
  };
</script>

<style scoped>
    .Search{
        float: left;
        margin-bottom: 5px;
    }
</style>