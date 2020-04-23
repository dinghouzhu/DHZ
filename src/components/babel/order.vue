<template>

    <div class="content">
        <div v-show="$store.state.show" class="dialog"></div>
        <div class="Search">

            <template>
                <el-select v-model="value"
                           @change="searchResultChange"
                           clearable
                           filterable
                           remote
                           reserve-keyword
                           placeholder="支持模糊查询"
                           :remote-method="searchInput">
                    <el-option v-for="item in searchResult"
                               :key="item.username"
                               :value="item.username">
                    </el-option>
                </el-select>
            </template>
            <el-button type="success" plain
                       @click="addMsg">编写信息</el-button>
            <el-button type="danger" plain
                       @click="deleteRowhandleEdit">批量删除</el-button>
        </div>
    <el-table
            border
            :data="dataTable"
            style="width: 100%;margin-top:20px"
            @selection-change="handleSelectionChange"
            :header-cell-style="{background:'#F2F2F2',fontWeight:500}"
    >
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>

        <el-table-column align="center"
                         prop="id"
                         label="ID"
        >
        </el-table-column>

        <el-table-column
                prop="username"
                label="发布者" align="center"
        >
        </el-table-column>
        <el-table-column
                prop="level"
                label="浏览权限" align="center"
        >
        </el-table-column>
        <el-table-column
                prop="date"
                label="发布时间" align="center"
        >
        </el-table-column>


        <el-table-column
                fixed="right"
                label="操作" align="center"
        >
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-zoom-in" size="mini"
                           @click="handleEdit(scope.index, scope.row)"></el-button>

                <el-button
                        @click.native.prevent="deleteRow(scope.index, scope.row)"
                        type="danger" icon="el-icon-delete" size="mini">
                </el-button>
            </template>
        </el-table-column>
    </el-table>
        <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="currentPage"-->
                <!--:page-sizes="[5, 10, 20, 40]"-->
                <!--:page-size="pagesize"-->
                 <!--layout="total, sizes, prev, pager, next, jumper"-->
                <!--:total="dataTable.length">-->
        <!--</el-pagination>-->
        <el-dialog title="编辑公告" :visible.sync="dialogFormVisible" :modal="false" width="100%" >
            <el-form :model="form">
                <el-form-item label="活动名称:" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off" placeholder="请输入公告标题"></el-input>
                </el-form-item>
                <el-form-item label="发布者:" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公开度:" :label-width="formLabelWidth">
                    <el-select v-model="form.level" placeholder="公开程度">
                        <el-option label="暂存" value="2"></el-option>
                        <el-option label="全体可见" value="1"></el-option>
                        <el-option label="仅管理员" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <div>
                    <el-card style="height:400px;width: 1200px">
                        <quill-editor v-model="form.msg" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                            <!-- 自定义toolar -->
                            <div id="toolbar" slot="toolbar">
                                <!-- Add a bold button -->
                                <button class="ql-bold" title="加粗">Bold</button>
                                <button class="ql-italic" title="斜体">Italic</button>
                                <button class="ql-underline" title="下划线">underline</button>
                                <button class="ql-strike" title="删除线">strike</button>
                                <button class="ql-blockquote" title="引用"></button>
                                <button class="ql-code-block" title="代码"></button>
                                <button class="ql-header" value="1" title="标题1"></button>
                                <button class="ql-header" value="2" title="标题2"></button>
                                <!--Add list -->
                                <button class="ql-list" value="ordered" title="有序列表"></button>
                                <button class="ql-list" value="bullet" title="无序列表"></button>
                                <!-- Add font size dropdown -->
                                <select class="ql-header" title="段落格式">
                                    <option selected>段落</option>
                                    <option value="1">标题1</option>
                                    <option value="2">标题2</option>
                                    <option value="3">标题3</option>
                                    <option value="4">标题4</option>
                                    <option value="5">标题5</option>
                                    <option value="6">标题6</option>
                                </select>
                                <select class="ql-size" title="字体大小">
                                    <option value="10px">10px</option>
                                    <option value="12px">12px</option>
                                    <option value="14px">14px</option>
                                    <option value="16px" selected>16px</option>
                                    <option value="18px">18px</option>
                                    <option value="20px">20px</option>
                                </select>
                                <select class="ql-font" title="字体">
                                    <option value="SimSun">宋体</option>
                                    <option value="SimHei">黑体</option>
                                    <option value="Microsoft-YaHei">微软雅黑</option>
                                    <option value="KaiTi">楷体</option>
                                    <option value="FangSong">仿宋</option>
                                    <option value="Arial">Arial</option>
                                </select>
                                <!-- Add subscript and superscript buttons -->
                                <select class="ql-color" value="color" title="字体颜色"></select>
                                <select class="ql-background" value="background" title="背景颜色"></select>
                                <select class="ql-align" value="align" title="对齐"></select>
                                <button class="ql-clean" title="还原"></button>
                                <!-- You can also add your own -->
                            </div>
                        </quill-editor>
                    </el-card>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendMsg">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {getMessage,insertMsg,deleteMsg} from "../../api";
    import {mapActions} from "vuex"
    import {
    Quill,
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  //引入font.css
  let Size = Quill.import('attributors/style/size');
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
  Quill.register(Size, true);

  // 自定义字体类型
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    '宋体', '黑体'
  ];
  var Font = Quill.import('formats/font');
  Font.whitelist = fonts;
  Quill.register(Font, true);

  export default {
    components: {
      quillEditor
    },
    name: "order",
    data(){
      return{
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
        editorOption: {
          placeholder: "请输入",
          theme: "snow", // or 'bubble'
          modules: {
            toolbar: {
              container: '#toolbar'
            }
          }
        },
        form: {
          username:'',
          level: '',
          title: '',
          msg: null,
        },
        formLabelWidth: '120px',
        dialogFormVisible:false,
        multipleSelection:[],
        searchResult:[],
        value:'',
        dataTable:[]
      }
    },
    created(){
     this.getMsg()
    },
    deactivated(){
      //离开页面时触发 keepalive专属
      this.getMsg()
    },

    methods:{
      ...mapActions(['getBusinessQyxz']),
      //利用循环批量删除
      deleteRowhandleEdit(){
        let token=localStorage.getItem('token');
        let Id=this.multipleSelection;
        var _this=this;
          this.$confirm('此操作将永久删除公告, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Id.map(function(item) {
              console.log(item);
              deleteMsg(item,token)
                .then(res=>{
                  if (res.data.code ==200){
                    _this.$message({
                      type:'success',
                      message:res.data.msg
                    });
                    _this.getMsg()
                  }
                })
                .catch(err=>{
                  console.log(err);
                })
            });
          })
            .catch(err=>{
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
      },
      //显示该条公告
      handleEdit(index,row){
       // this.dialogVisible=true;
        this.$message({
          type:'warning',
          message:'暂未实现'
        });

      },
      //删除单条公告
      deleteRow(index,row){
        var token=localStorage.getItem('token');
        var _this=this;
        var id=row.id;
        this.$confirm('此操作将永久删除该条公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '正在删除...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
            deleteMsg(id,token)
              .then(res=>{
                if (res.data.code ==200){
                  _this.timer=setTimeout(() => {
                    loading.close();
                    _this.$message({
                      type:'success',
                      message:res.data.msg
                    });
                  }, 700);

                  _this.getMsg();

                }
              })
              .catch(err=>{
                console.log(err);
              })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //多选公告列表
      handleSelectionChange(val) {
        var _this=this;
        _this.multipleSelection=[];
        val.map(function(item,index) {
          _this.multipleSelection.push(item.id);
        });
        _this.multipleSelection=Array.from(new Set( _this.multipleSelection));
        console.log( _this.multipleSelection);
      },
      searchResultChange(value){
           console.log(value);
      },
      searchInput(value){
        console.log(value);
      },
      //查询所有公告
      getMsg(){
        getMessage()
          .then(res=>{
            this.dataTable=res.data.data.res;
          })
          .catch(err=>{
            console.log(err);
          })
      },




      //添加公告
      addMsg(){
        this.dialogFormVisible=true;
      },
      sendMsg(){
     // username,nickname,date,title,msg,token
        let {username,level,title,msg}=this.form;
        var _this=this;
        var token=localStorage.getItem('token');
        let date=new Date().format("yyyy-MM-dd");
        insertMsg(username,level,title,msg,date,token)
          .then(res=>{
            if (res.data.code ==200){
              _this.$message({
                type:'success',
                message:res.data.msg
              });
            }
            _this.getMsg()
          })
          .catch(err=>{
            console.log(err);
          });
        this.dialogFormVisible=false;
        console.log(this.form.level);
      }
    },
    beforeDestroy(){
      clearTimeout(this.timer)
    }

  };
</script>

<style scoped>
    @import '../../assets/styles/font.css';
    .dialog{
        width: 100%;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        z-index: 10;
        background-color: blue;
    }
    .Search{
        float: left;
        margin-bottom: 5px;
    }
    .content{
        width: 100%;
        height: 100%;
        position: relative;

    }
    .el-input{
        width: 300px;
        float: left;
    }
    .el-select{
        float: left;
    }
</style>