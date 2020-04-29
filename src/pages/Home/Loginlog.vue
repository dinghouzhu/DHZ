<template>
    <div class="content">




<template>
        <el-table
                :data="logss"
                style="width: 100%;margin-top:20px"
               >


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
                    <!--<el-button type="primary"   circle-->
                               <!--@click="handleEdit(scope.index, scope.row)"-->
                               <!--icon="el-icon-edit"-->
                    <!--&gt;</el-button>-->
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
                    :page-size="page"
                     @current-change="pagechange">
            </el-pagination>

    </div>
</template>

<script>
    import {selectloginLog,selectLimitLog,deleteLog} from "../../api"
    export default {
      name:'Loginlog',
        data() {
            return {
                total: 100,
                page: 5,
                dialogVisible: false,//用于定义dialog是否显示
                dialogEvents: "",//保存用于触发dialog的事件名
                dialogTitle: "",//dialog标题
                value: "",
                formLabelWidth: '120px',
                searchResult: [],
                logss: [],
                limit:null,
            }
        },
       created(){
         this.getLog();
       },
        mounted() {
            // this.upDateList();
            // this.upDatedList();
           this.pagechange();
        },

        methods: {
        //获取全部日志
          async  getLog(){
           selectloginLog()
             .then(res=>{
               let tableData=res.data.data.res;
               //this.logss=tableData;
               this.total=tableData.length
             })
             .catch(err=>{
               console.log(err);
             })
         },

          async  pagechange(limit) {
            this.limit=limit;
               clearTimeout(this.timer);
              const loading = this.$loading({
                lock: true,
                text: '正在查询...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
                let _this=this;
             this.timer= setTimeout(()=>{
                selectLimitLog(limit)
                  .then(res=>{
                    loading.close();
                    _this.logss=res.data.data.res
                  })
                  .catch(err=>{
                    loading.close();
                  });
              },700)
            },

         //前端静态资源过滤 暂未使用
            searchResultChange(key) {
                console.log(key);
                // 判断一下key是否为空 如果为空 再次重新获取数据即可
                if (!key) {
                    this.upDateList()
                } else {
                    this.logss = this.searchResult.filter(item => item.name === key)
                }
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
            let id=row.id;
            let token=localStorage.getItem('token');
              deleteLog(id,token)
                .then(res=>{
                  if (res.data.code ==200){
                    this.pagechange(this.limit)
                  }
                })
                .catch(err=>{
                  console.log(err);
                })
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