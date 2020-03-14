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
                           placeholder="目前只支持精确查找 "
                           :remote-method="searchInput">
                    <el-option v-for="item in searchResult"
                               :key="item.username"
                               :value="item.username">
                    </el-option>
                </el-select>
            </template>
            <el-button type="success"
                       @click="addUserInfo">添加信息</el-button>
            </div>

            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :rules="userRules" ref="ruleForm">
                <el-form :model="userForm">

                    <el-form-item label="用户名" :label-width="formLabelWidth" prop="class" >
                        <el-input  v-model="userForm.username" autocomplete="off" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" prop="class">
                        <el-input  v-model="userForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="别名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="userForm.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth" prop="age">
                        <el-input v-model="userForm.des" autocomplete="of3f"></el-input>
                    </el-form-item>
                    <el-form-item label="爱好" :label-width="formLabelWidth" prop="city">
                        <el-input v-model="userForm.habit" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="degree">
                        <el-input  v-model="userForm.sex" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="formLabelWidth" prop="productUrl" >
                        <el-input v-model="userForm.age" autocomplete="off" @keyup.native="UpNumber" maxlength="3"></el-input>
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
                        prop="level"
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
    import {getUsers,deleteUser,searchUser,addUser,updateUser} from "../../api"
  export default {
    data(){
      return{

        disabled:false,          //是否禁用属性
        dialogVisible:false, //用于定义dialog是否显示
        value:'',
        userList:[],
        level:'',
        dialogEvents:'', //保存用于触发dialog的事件名
        searchResult:[],
        formLabelWidth: '100px',
        dialogTitle: "",//dialog标题
        userRules: {
          username: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          nickname: [
            {required: true, message: '请输入别名', trigger: 'blur'},
          ],
          des: [
            {required: true, message: '请输入描述', trigger: 'blur'},
          ],
          habit: [
            {required: true, message: '请输入爱好', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'blur'},
          ],
          age: [
            {required: true, message: '请输入年龄', trigger: 'blur'},
          ]
        },

        userForm: {
          username: '',
          password:'',
          nickname: '',
          des: '',
          habit: '',
          sex: '',
          age: '',
        },
      }
    },

    methods: {
      //  只可输入数字
      UpNumber(e) {
        e.target.value = e.target.value.replace(/[^\d]/g, "");
      },
      //添加用户按钮事件
      addUserInfo() {
        this.userForm = {}; //添加的时候先清空列表
        this.dialogVisible = true;
        this.dialogEvents = 'addMenu';//更改添加事件名
        this.dialogTitle = "添加用户信息";
        this.disabled=false;
      },
      //弹窗确认按钮提交表单数据  根据按钮内容执行不同方法
      confirmAddstu(forName) {
        //执行dialogEvents值对应的方法
        this[this.dialogEvents]();
        this.dialogVisible = false;
      },

      //添加用户方法
      addMenu() {
        //注意 用户名和密码必填   其他选填
        var { username, password, nickname, des, habit, sex, age } = this.userForm;
        var _this = this;
        addUser(username, password, nickname, des, habit, sex, age)
          .then(res => {
            console.log(res);
            if (res.data.code == 200 && res.data.msg == '注册成功') {
              _this.$message({
                type: 'success',
                message: res.data.msg
              })
            } else {
              _this.$message({
                type: 'warning',
                message: res.data.msg
              })
            }
          })
          .catch(err => {
            _this.$message({
              type: 'error',
              message: err.data.msg
            })
          })
      },


      searchResultChange(key) {
        //过滤请求到的数据  如果没有  刷新页面
        if (!key) {
          this.getUsers()
        } else {
          this.userList = this.searchResult.filter(item => item.username === key)
        }
      },

      //目前只支持精确查找
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

      //编辑行数据
      handleEdit(index, row) {
        var _this = this;
        if (this.level == 3) {
          this.dialogVisible = true;
          this.disabled=true;
          this.userForm = row;  //打开时展现原信息
          this.dialogEvents = 'updateUser';//更改添加事件名
          this.dialogTitle = "修改用户信息"
        } else {
          _this.$message({
            type: 'error',
            message: '对不起,您的等级不足'
          })
        }
      },

      //更新用户信息方法
      updateUser() {
        var _this = this;
        if (_this.level == 3) {
          var { username, password, nickname, des, habit, sex, age } = this.userForm;
          updateUser(username, password, nickname, des, habit, sex, age)
            .then(res => {
              console.log(res);
              if (res.data.code == 200 && res.data.msg == '信息修改成功') {
                _this.$message({
                  type: 'success',
                  message: res.data.msg
                })
              } else {
                _this.$message({
                  type: 'warning',
                  message: res.data.msg
                })
              }
            })
            .catch(err => {
              console.log(err);
            })

        } else {
          _this.$message({
            type: 'error',
            message: '对不起,您的等级不足'
          })
        }
      },

      //删除行数据
      deleteRow(index, row) {
        var name = row.username;
        var _this = this;
        if (_this.level == 3) {
          deleteUser(name)
            .then(res => {
              console.log(res);
              getUsers()
                .then(res => {
                  this.userList = res.data.data.res
                })
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          _this.$message({
            type: 'error',
            message: '对不起,您的等级不足'
          })
        }
      }
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