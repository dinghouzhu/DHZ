<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
    >
        <el-table-column
                prop="rid"
                label="编号"
                sortable
                >
        </el-table-column>
        <el-table-column
                prop="rtype"
                label="型号"
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
                           @click="handleEdit(scope.index, scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {getRooms} from "../../api"
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      handleEdit(index,row){
        console.log(index,row);
        
      },
      getRoom(){
        getRooms()
          .then(res=>{
               this.tableData=res.data.data.result
          })
          .catch(err=>{
             console.log(err);
          })
      }


    },
    created(){
      this.getRoom();
    },
  }
</script>