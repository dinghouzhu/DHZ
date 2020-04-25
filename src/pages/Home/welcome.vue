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
            <el-button type="success" icon="el-icon-c-scale-to-original" circle
                       @click="handleEdit(scope.index, scope.row)"></el-button>

        </template>
        </el-table-column>
    </el-table>

        <el-drawer
                title="酒店详情"
                :visible.sync="drawer"
                :with-header="false">
            <el-form :model="form">
                <el-form-item label="酒店名称:" :label-width="formLabelWidth">
                    <el-input v-model="form.hname" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="酒店城市:" :label-width="formLabelWidth">
                    <el-input v-model="form.hcity" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="建造时间" :label-width="formLabelWidth">
                    <el-input v-model="form.hopen" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="电话:" :label-width="formLabelWidth">
                    <el-input v-model="form.hphone" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="营业时间:" :label-width="formLabelWidth">
                    <el-input v-model="form.hrenovation" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="酒店等级:" :label-width="formLabelWidth">
                    <el-input v-model="form.lev" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="酒店描述:" :label-width="formLabelWidth">
                    <el-input v-model="form.hdesc" autocomplete="off" :disabled="disabled" type="textarea"
                              :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="评价:" :label-width="formLabelWidth">
                    <!--<template slot="scope" >-->
                        <!-- <el-rate v-model="scope.row.evaValue" :allow-half="true"  disabled show-score text-color="#ff9900" score-template="{value}"></el-rate> -->
                        <el-rate v-model="form.lev" :allow-half="true"  disabled text-color="#ff9900"></el-rate>
                    <!--</template>-->
                </el-form-item>
            </el-form>
        </el-drawer>


    </div>
</template>


<script>
    import {getHotel} from "@/api";

    export default {
       name:'welcome',
        data() {
            return {
                Hotels:[],
                drawer: false,
                form:{},
                formLabelWidth:'80px',
                disabled:true,
            }
        },
      methods:{

        handleEdit(index,item){
          console.log(index,item);
          this.form=item;
          this.drawer=true;
          //  this.$router.push('/welcome/details');
          // localStorage.setItem("table", JSON.stringify(item))
        }

      },
      computed:{

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
    .el-input__inner textarea{
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
    }
</style>