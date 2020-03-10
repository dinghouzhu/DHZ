<template>
    <div>
    <el-table
            :data="Hotels"
            border
            style="width: 100%"
    >
        <el-table-column
                prop="hid"
                label="酒店编号"
        >
        </el-table-column>
        <el-table-column
                prop="hname"
                label="酒店名称"
               >
        </el-table-column>
        <el-table-column
                prop="hcity"
                label="城市"
              >
        </el-table-column>
        <el-table-column
                prop="haddress"
                label="酒店地址">
        </el-table-column>
        <el-table-column
                prop="hphone"
                label="酒店电话"

         >
        </el-table-column>
        <el-table-column
                prop="hdesc"
                label="酒店描述">
        </el-table-column>
    </el-table>




    </div>
</template>


<script>
    import {getHotel} from "@/api";
    export default {
        data() {
            return {
                Hotels:[]
            }
        },
      methods:{

      },
      created() {
        getHotel()
              .then(res=>{
                this.Hotels=res.data.data.res;
              })
              .catch(err=>{
                  console.log(err)
              });

              
      },
        
        

    }
</script>

<style scoped>

</style>