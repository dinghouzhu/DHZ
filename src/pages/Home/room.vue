<template>
    <div>
    <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
    >
        <el-table-column
                prop="rid"
                label="编号"
                sortable
                >
        </el-table-column>
        <el-table-column
                prop="rtype"
                label="类型"
                >
        </el-table-column>
        <el-table-column
                prop="rbreakfast"
                label="早餐级别"
                sortable
                >
        </el-table-column>
        <el-table-column
                prop="rprice"
                label="价格"
                sortable

                >
        </el-table-column>
        <el-table-column
                prop="raccount"
                label="账户"

                >
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作" align="center"
        >
            <template slot-scope="scope">
                <el-button type="success" icon="el-icon-key" circle
                           @click="handleEdit(scope.index,scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"  ref="ruleForm">
        <el-form :model="roomForm">
            <el-form-item label="编号" :label-width="formLabelWidth" prop="class" >
                <el-input  v-model="roomForm.rid" autocomplete="off" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth" prop="class">
                <el-input  v-model="roomForm.rtype" autocomplete="off" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="早餐级别" :label-width="formLabelWidth" prop="name">
                <el-input v-model="roomForm.rbreakfast" autocomplete="off" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth" prop="age">
                <el-input v-model="roomForm.rprice" autocomplete="of3f" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="账户点数" :label-width="formLabelWidth" prop="city">
                <el-input v-model="roomForm.raccount" autocomplete="off" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="用户名称" :label-width="formLabelWidth" prop="city">
                <el-input v-model="roomForm.username" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAddstu('ruleForm')">确 定</el-button>
        </div>

    </el-dialog>
    </div>
</template>

<script>
    import {getRooms,updateOrders} from "../../api"
  export default {
    name:'room',
    data() {
      return {
        disabled:true,
        tableData: [],
        dialogVisible:false,
        formLabelWidth: '100px',
        dialogTitle: "",//dialog标题
        roomForm: {
          rid: '',
          rtype:'',
          rbreakfast: '',
          rprice: '',
          raccount: '',
          username:''
        },
      }
    },
    methods: {
     //编辑订单
      handleEdit(index,row){
        this.dialogVisible=true;
        this.roomForm.username='';
        this.roomForm=row;
      },

      //获取房间信息
      getRoom(){
        getRooms()
          .then(res=>{
               this.tableData=res.data.data.result
          })
          .catch(err=>{
             console.log(err);
          })
      },
      //提交订单的方法
      confirmAddstu(){
        var _this=this;
        this.dialogVisible=false;
        let nowDate=new Date().format("yyyy-MM-dd hh:mm:ss");
        var {username,rid,rtype,rprice,rbreakfast}=this.roomForm;
        //username,roomid,type,price,breakfast ,date,token
        var token=localStorage.getItem('token');
        updateOrders(username,rid,rtype,rprice,rbreakfast,nowDate,token)
          .then(res=>{
            console.log(res);
            if (res.data.code == 200 ){
              _this.$message({
                type:'success',
                message:res.data.msg
              })
            }else if (res.data.code == -2){
              _this.$message({
                type:'warning',
                message:res.data.msg
              });
              localStorage.clear();
              _this.$router.push('/')
            }else {
              _this.$message({
                type:'warning',
                message:res.data.msg
              })
            }
          })
          .catch(err=>{
            console.log(err);
            _this.$message({
              type:'warning',
              message:err.data.msg
            })
          })
      }
    },

    created(){
      this.getRoom();
    },
  }
</script>