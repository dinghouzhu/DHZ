<template>
    <div class="content">

        <div class="search">
<!--            远程搜索框-->
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
                               :key="item.value"
                               :value="item.name">
                    </el-option>
                </el-select>
            </template>

            <el-button type="success"
                       @click="addStuInfo('addDialog')">添加信息</el-button>
        </div>

            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :rules="stuRules" ref="ruleForm">
                <el-form :model="stuForm">
                    <el-upload class="upload-demo"
                               action="http://106.12.79.128:1901/students/uploadStuAvatar"
                               name="avatar"
                               :show-file-list="showAvatar"
                               :on-success="uploadStuAvatar"
                               list-type="picture">
                        <el-button size="small"
                                   type="primary">点击上传</el-button>
                    </el-upload>
                    <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
                        <el-input  v-model="stuForm.avatar" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" :label-width="formLabelWidth" prop="class">
                        <el-input  v-model="stuForm.class" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="stuForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="formLabelWidth" prop="age" >
                        <el-input v-model="stuForm.age" autocomplete="of3f"></el-input>
                    </el-form-item>
                    <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
                        <el-input v-model="stuForm.city" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学历" :label-width="formLabelWidth" prop="degree">
                        <el-input  v-model="stuForm.degree" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目地址" :label-width="formLabelWidth" prop="productUrl" >
                        <el-input v-model="stuForm.productUrl" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth"  prop="description">
                        <el-input v-model="stuForm.description" autocomplete="off"></el-input>
                    </el-form-item>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirmAddstu('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>


        <!--<div class="select-class">-->
            <!--<b>选择班级</b>-->
            <!--<el-select v-model="classValue"-->
                       <!--@click.native="searchClassMenu"-->
                       <!--@change="chooseClasses"-->
                      <!--&gt;-->
                <!--<el-option value="all"-->
                           <!--label="全部"-->
                <!--&gt;</el-option>-->
                <!--<el-option v-for="item in classes"-->
                           <!--:key="item.value"-->
                           <!--:value="item">-->
                <!--</el-option>-->
            <!--</el-select>-->
        <!--</div>-->


        <template>
        <el-table
                :data="logss"
                style="width: 100%;margin-top:20px"
               >
            <!--<el-table-column label="头像" width="80px" height="80px" align="center">-->
                <!--<template slot-scope="scope">-->
                    <!--<img width="100%" height="100%" :src="scope.row.avatarUrl" alt />-->
                <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column align="center"
                    prop="id"
                    label="ID"
                    >
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名" align="center"
                    >
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="别名" align="center"
                    >
            </el-table-column>
            <el-table-column
                    prop="IP"
                    label="IP" align="center"
                    >
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="登入时间" align="center"
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
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                     @current-change="pagechange">
            </el-pagination>

    </div>
</template>

<script>
    import {selectloginLog} from "../../api"
    export default {
      name:'Loginlog',
        data() {
            return {
                total: 100,
                pageSize: 5,
                dialogVisible: false,//用于定义dialog是否显示
                dialogEvents: "",//保存用于触发dialog的事件名
                dialogTitle: "",//dialog标题
                value: "",
                classValue: "",
                formLabelWidth: '120px',
                classes: [],
                searchResult: [],
                showAvatar: true,
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
                        {required: false, message: '头像', trigger: 'blur'},
                    ],
                },
                stuForm: {
                    avatar: '',
                    class: '',
                    name: '',
                    age: '',
                    city: '',
                    degree: '',
                    productUrl: '',
                    description: '',
                    token: localStorage.getItem("token")
                },
                logss: [],
            }
        },
       created(){
         this.getLog();
       },
        mounted() {
            // this.upDateList();
            // this.upDatedList();

        },

        methods: {
        //获取全部日志
         getLog(){
           selectloginLog()
             .then(res=>{
               let tableData=res.data.data.res;
               this.logss=tableData;
               this.total=tableData.length
             })
             .catch(err=>{
               console.log(err);
             })
         },

            //分页
            upDatedList() {
                getStuList(10, 1)
                    .then(res => {
                        this.total = res.data.total;
                        this.logss = res.data.data;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            pagechange(pageSize) {
                console.log(pageSize);
                // this.logss.map((item,index)=>{
              //   console.log(item,index);
              // })
               this.$message({
                 type:'warning',
                 message:'暂未实现'
               })
            },

            chooseClasses(key) {
                if (key === "all") {
                    this.upDateList()
                } else {
                    getClass().then(res => {
                        this.logss = res.data.data;
                        this.logss = this.logss.filter(item => item.class === key);
                    });
                }
            },

            searchClassMenu() {
                getClasses()
                    .then(res => {
                        if (res.data.state) {
                            this.classes = res.data.data;
                        } else {
                            this.classes = []
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            searchInput(key) {
                searchStu({key})
                    .then(res => {
                        if (res.data.state) {
                            this.searchResult = res.data.data
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

            searchResultChange(key) {
                console.log(key);
                // 判断一下key是否为空 如果为空 再次重新获取数据即可
                if (!key) {
                    this.upDateList()
                } else {
                    this.logss = this.searchResult.filter(item => item.name === key)
                }
            },
            addStuInfo(param) {
                this.stuForm = {}; //添加的时候先清空列表
                this.dialogVisible = true;
                this.dialogEvents = 'addStudentinfo';//更改添加事件名
                this.dialogTitle = "增加学员信息"
            },



            //上传头像
            uploadStuAvatar(res) {
                if (res.state) {
                    this.stuForm.avatarUrl = res.avatarUrl;
                    console.log(res);
                } else {
                    this.$message({
                        message: '上传失败',
                        type: 'warning'
                    });
                }

            },
            //添加信息
            addStudentinfo() {
                let data = this.stuForm;
            },
              //不知道干啥
            handleEdit(){
              this.$message({
                type:'warning',
                message:'不知道干啥'
              })
            },
            //删除信息
            deleteRow(index, row) {
                if (confirm('你想抹除这条痕迹?') === true) {
                   console.log('抹除个毛');
                } else {
                    return false;

                }
            }
        }
    }
</script>

<style scoped>
.content{
    position: relative;
}
    .search{
        float: left;
        margin-top: 10px;
    }
    .select-class{
        float: left;
        clear: both;
        margin-top: 15px;
    }


</style>