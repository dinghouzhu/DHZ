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
                prop="hopen"
                label="开业时间">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.hopen }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="evaValue" label="评分">
            <template slot-scope="scope" >
                <!-- <el-rate v-model="scope.row.evaValue" :allow-half="true"  disabled show-score text-color="#ff9900" score-template="{value}"></el-rate> -->
                <el-rate v-model="scope.row.lev" :allow-half="true"  disabled text-color="#ff9900"></el-rate>
            </template>
        </el-table-column>

        <el-table-column
                label="查看详情"
        >
        <template slot-scope="scope">
            <el-button type="success" icon="el-icon-c-scale-to-original
" circle
                       @click="handleEdit(scope.index, scope.row)"></el-button>
        </template>
        </el-table-column>
    </el-table>




    </div>
</template>


<script>
    import {getHotel} from "@/api";
    export default {
        data() {
            return {
                Hotels:[],


            }
        },
      methods:{
        handleEdit(index,item){
          console.log(index,item);
          this.$router.push({name:"/details",params:{val:"111"}})

        }

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