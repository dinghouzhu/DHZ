<template>
<div class="body">

    <el-carousel arrow="always"  :autoplay="false" style="height:400px">
        <el-carousel-item style="height:400px">
            <div style="width:800px;height:400px" ref="chart" class="Mychart"></div>
        </el-carousel-item>
        <el-carousel-item style="height:400px">
            <div style="width:800px;height:400px" ref="chartZhe" class="Mychart"></div>
        </el-carousel-item>
        <el-carousel-item style="height:400px">
            <div style="width:800px;height:400px" ref="chartYuan" class="Mychart"></div>
        </el-carousel-item>
    </el-carousel>

    <div class="content">
   <ul v-if="list">
        <li>地区</li>
        <li style="background: #e8effc;color: blue">新增确诊</li>
        <li style="background: #fdeeee;color: #f55a5b">累计确诊</li>
        <li style="background: #e9f7ec;color: #99ceb1">治愈</li>
        <li style="background: #f3f6f8;color: #626d77">死亡</li>
        <li>疫情</li>
   </ul>
   <ul v-for="(item,index) in list" :key="index" v-if="index <20" >
      <li>{{item.name}}</li>
      <li>{{item.confirmAdd}}</li>
      <li>{{item.confirm}}</li>
      <li>{{item.heal}}</li>
      <li>{{item.dead}}</li>
      <li style="color: blue"  @click="toggle(item)">详情</li>
   </ul>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"  ref="ruleForm">
            <el-form :model="conForm">
                <el-form-item label="国家名称" :label-width="formLabelWidth" prop="class" >
                    <el-input  v-model="conForm.name" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="洲际" :label-width="formLabelWidth" prop="class">
                    <el-input  v-model="conForm.continent" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="日期" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="conForm.date" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="新增确诊" :label-width="formLabelWidth" prop="age">
                    <el-input v-model="conForm.confirmAdd" autocomplete="of3f" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="confirmAddCut" :label-width="formLabelWidth" prop="city">
                    <el-input v-model="conForm.confirmAddCut" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="确诊" :label-width="formLabelWidth" prop="city">
                    <el-input v-model="conForm.confirm" autocomplete="off" :disabled="disabled"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button  @click="dialogVisible = false">关闭</el-button>
            </div>

        </el-dialog>

  </div>
</div>
</template>

<script>
 import {getXinguan,getMsg,getHubei} from "../../api";
    export default {
      data(){
      return{
        disabled:true,
        formLabelWidth:'100px',
        dialogVisible:false,//弹框显示标记
        dialogTitle:'', //弹框标题
        showMissionList:false,
        FAutoGlobalDailyList:[], //世界疫情总体列表
        list:[],  //国家列表
        topList:[],//新增国家名称列表排名
        topPeopleList:[], //新增国家确诊列表排名
        option:{
          title: { text: '昨日新增国家TOP10' },
          tooltip: {},
          xAxis: {
            axisLabel: {
              interval:0,//代表显示所有x轴标签显示
            },
            data: []
          },
          yAxis: {},
          series: {
            barWidth:30,
            name: '确诊数',
            type: 'bar',
            data: []
          }
        },  //柱状图配置
        optiontwo:{
          title: { text: '世界疫情统计' },
          legend: {
            data: ['确诊', '治愈','死亡']
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name:'确诊',
            itemStyle : { normal: {label : {show: true}}},
            data: [],
            type: 'line'
          },
            {
              name:'治愈',
              itemStyle : { normal:
                  {label : {show: true},
                    color:'#00FF00'
                  }},
              data: [],
              type: 'line',
              lineStyle:{
                color:'#99ceb1'
              }
            },
            {
              name:'死亡',
              itemStyle : { normal: {label : {show: true}}},
              data: [],
              type: 'line',

            },

          ]
        },  //折线图配置
        optionYuan :{
          title: {
            text: '洲际新增确诊比例',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['亚洲', '其他', '北美洲', '南美洲', '大洋洲','欧洲','非洲']
          },
          series:
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data:[
                {value: 335, name: '亚洲'},
                {value: 310, name: '其他'},
                {value: 234, name: '北美洲'},
                {value: 135, name: '南美洲'},
                {value: 1548, name: '大洋洲'},
                {value: 135, name: '欧洲'},
                {value: 1548, name: '非洲'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }

        },  //饼图配置
        conForm:{
          name: "美国",
          continent: "北美洲",
          date: "04.02",
          isUpdated: false,
          confirmAdd: 26679,
          confirmAddCut: 0,
          confirm: 216768,
          suspect: 0,
          dead: 5148,
          heal: 8710,
          nowConfirm: 202910,
          confirmCompare: 26679,
          nowConfirmCompare: 24064,
          healCompare: 1569,
          deadCompare: 1046,
        }    //国家疫情详情实例
      }
    },

      created(){
        this.getXinguan();
        this.getMsg();

      },
      mounted(){
         this.initCharts();
         this.init();
         this.initYuan()
      },
      methods:{
        toggle(item){
          console.log(item);
          this.conForm='';
          this.dialogVisible=true;
          this.conForm=item;
        },
        //绘制柱状图
        initCharts () {
          let myChart = this.$echarts.init(this.$refs.chart);
          // 绘制图表
          myChart.setOption( this.option);
        },
        //绘制折线图
        init(){
          let myChart2 = this.$echarts.init(this.$refs.chartZhe);
          // 绘制图表
          myChart2.setOption( this.optiontwo);
        },
        //绘制饼图
        initYuan(){
          let myChart3 = this.$echarts.init(this.$refs.chartYuan);
          // 绘制图表
          myChart3.setOption( this.optionYuan);
        },

         getXinguan(){
         getXinguan()
           .then(res=>{
             this.list=res.data.data
           })
           .catch(err=>{
             console.log(err);
           })
        },
          getMsg(){
          var _this=this;
          getMsg()
            .then(res=>{
              console.log(res.data.data);
              res.data.data.FAutoCountryWeekCompRank.map((item,index)=>{
                _this.topList.push(item.nation);
                _this.topPeopleList.push(item.day);
              });
              _this.option.series.data=_this.topPeopleList;
              _this.option.xAxis.data=_this.topList;
              //取最后七天的数据
              _this.FAutoGlobalDailyList=res.data.data.FAutoGlobalDailyList.splice(-7,res.data.data.FAutoGlobalDailyList.length);
              _this.FAutoGlobalDailyList.map((item,index)=>{
                _this.optiontwo.xAxis.data.push(item.date);
                _this.optiontwo.series[0].data.push(item.all.confirm); //世界确诊人数
                _this.optiontwo.series[1].data.push(item.all.heal);   //世界治愈人数
                _this.optiontwo.series[2].data.push(item.all.dead)   //世界死亡人数
              });
              let length=res.data.data.FAutoContinentStatis.length;
              let Statis=res.data.data.FAutoContinentStatis.splice(-1,length);
              _this.optionYuan.title.subtext=Statis[0].range;
              let shumu=Object.values(Statis[0].statis);
              console.log(shumu,'shumu');
              shumu.map((item,index)=>{
                _this.optionYuan.series.data[index].value=shumu[index];
              });
              console.log(_this.FAutoGlobalDailyList,'FAutoGlobalDailyList');
            })
            .catch(err=>{
              console.log(err);
            })

        },



      },
      watch:{
        option: {
          handler(newVal, oldVal) {
            if (this.myChart) {
              console.log(this.myChart);
              if (newVal) {
                console.log(newVal);
                this.myChart.setOption(newVal);
              } else {
                console.log(oldVal);
                this.myChart.setOption(oldVal);
              }
            } else {
              this.initCharts();
            }
          },
          deep: true //深度监听
        },
        optiontwo: {
          handler(newVal, oldVal) {
            if (this.myChart2) {
              console.log(this.myChart);
              if (newVal) {
                console.log(newVal);
                this.myChart2.setOption(newVal);
              } else {
                console.log(oldVal);
                this.myChart2.setOption(oldVal);
              }
            } else {
              this.init();
            }
          },
          deep: true //深度监听
        },
        optionYuan: {
          handler(newVal, oldVal) {
            if (this.myChart3) {
              console.log(this.myChart3);
              if (newVal) {
                console.log(newVal);
                this.myChart3.setOption(newVal);
              } else {
                console.log(oldVal);
                this.myChart3.setOption(oldVal);
              }
            } else {
              this.initYuan();
            }
          },
          deep: true //深度监听
        },

      },


  };
</script>

<style scoped>
.shrink{
  width: 200px;
    height: 50px;
}
.Mychart{
    margin: 0 auto;
}
 .content{
   width: 100%;
   clear: both;
   position: relative;
     top: 20px;
  }
 .body{
  text-align: center;
 }
 ul{
  width: 1200px;
  height: 80px;
  margin: 0 auto;
  background: #f5f5f5;
 }
ul li{
 display: block;
 float: left;
 width: 200px;
 height: 80px;
 line-height: 80px;
 font-size: 20px;
 word-wrap:break-word;
 word-break:break-all;
}

</style>