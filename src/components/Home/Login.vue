<template>

   <div id="bgc">
       <vue-particles color="#64f4e5"
                      :particleOpacity="0.3"
                      :particlesNumber="50"
                      shapeType="polygon"
                      :particleSize="30"
                      linesColor="#64f4e5"
                      :linesWidth="1"
                      :lineLinked="false"
                      :lineOpacity="0.4"
                      :linesDistance="150"
                      :moveSpeed="10"
                      :hoverEffect="true"
                      hoverMode="false"
                      :clickEffect="true"
                      clickMode="push"
                      class="lizi"></vue-particles>

       <div id="login"  >
           <el-avatar src="https://p4.music.126.net/V9tibxqfdJk-BXdyQLn-MQ==/109951163452834453.jpg" class="headimg"></el-avatar>
           <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
               <el-form-item class="lab" label="用户名" prop="username">
                   <el-input class="in" type="text" v-model="ruleForm.username" autocomplete="off" ref="write"></el-input>
               </el-form-item>
               <el-form-item class="lab" label="密码" prop="password">
                   <el-input class="in" type="password" v-model="ruleForm.password" @keydown.native.enter="submitForm('loginForm')" autocomplete="off"></el-input>
               </el-form-item>

               <el-form-item>
                   <el-button  @click="submitForm('loginForm')" id="btn1" class="btn btn-primary btn-ghost btn-shine" style="margin-right: 15px">登陆</el-button>
                   <el-button id="btn2" class="btn btn-primary btn-ghost btn-shine" style="margin-left: 15px">重置</el-button>
               </el-form-item>
           </el-form>




       </div>
       <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
           <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
               <el-form-item label="用户名" prop="username">
                   <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="旧密码" prop="oldPass">
                   <el-input type="text" v-model="ruleForm2.oldPassword" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="新密码" prop="newPass">
                   <el-input v-model="ruleForm2.newPassword"  type="text"></el-input>
               </el-form-item>
               <el-form-item label="确认新密码" prop="newPass">
                   <el-input v-model="ruleForm2.againPassword"  type="text"></el-input>
               </el-form-item>

           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
           </div>
       </el-dialog>

<div>




</div>




   </div>




</template>


<script>
  import {login,loginLog} from "@/api";
  export default {

    data(){
      var validateUsn = (rule, value, callback) => {
        var uPattern = /[a-zA-Z]{3}/;   //至少三位字符
        let  res=uPattern.test(value);
        if(res){
          callback();
        }else {
          callback('请正确输入用户名');
        }


      };
      var validatePass = (rule, value, callback) => {
        if (!value){
          callback("请输入密码")
        }else{
          callback()
        }
      };
      return{
        ip:'',
        personImg:'',
        dialogVisible:false,
        dialogFormVisible:false,
        ruleForm2: {
          username:'',
          oldPassword: '',
          newPassword: '',
          againPassword: ''
        },


        ruleForm: {
          username: '',
          password: '',
        },

        rules: {
          username: [
            { validator: validateUsn, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]

        }
      }
    },



    methods:{
      //利用访问搜狐的方式获取IP
      // ready(){
      //   //获取本地IP地址  原理就是访问搜狐网站获取IP
      //   //js 引入 <!-- 获取本机ip  -->
      //   //<script src="http://pv.sohu.com/cityjson?ie=utf-8">
      //   var cip = returnCitySN["cip"];
      //   //给vuedata对象里的字段赋值
      //   this.ip = cip;
      //   console.log(this.ip);
      //   localStorage.setItem('IP',this.ip)
      //   return cip
      // },

     //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //登陆动画
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });

            let {username,password}=this.ruleForm;
            var  _this=this;
            login(username,password)
              .then(res=>{
                loading.close();
                if (res.data.code ===200) {
                 // localStorage.setItem('token',res.data.data.userInfo);
                  localStorage.setItem('level',res.data.data.userInfo.level);
                  localStorage.setItem('nickname',res.data.data.userInfo.nickname);
                  localStorage.setItem('token',res.data.data.userInfo.token);       //真实获取的token
                //  localStorage.setToken('token',res.data.data.userInfo,1000*60*20); //模拟token 设置token20分钟过期
                  this.$router.push('/welcome');
                  _this.$message({
                    type:'success',
                    message:'登陆成功'
                  });
                  let nickname=res.data.data.userInfo.nickname;
                  // let IP=this.ready();  //获取IP
                  let date=new Date().format("yyyy-MM-dd hh:mm:ss");
                  // loginLog(username,nickname,date)
                  //   .then(res=>{
                  //     console.log(res);
                  //   })
                  //   .catch(err=>{
                  //     console.log(err);
                  //   })
                }else {
                    _this.$message({
                      type:'error',
                      message:'用户名或密码错误'
                    })
                }
              })
              .catch(err=>{
                loading.close();
                console.log(err);
                this.$message({
                  type:'error',
                  message:'网络错误'
                })
              });
          } else {
            console.log('提交错误');
            return false;
          }
        });

      },



      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    },

    created(){

      // this.$nextTick(()=>{
      //   this.$refs.write.focus()
      // })

    }

  }
</script>
<style>
    #login label{
        color: white;
        cursor: pointer;
    }
    #login{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -65%);
        width: 450px;
        height: 260px;
        text-align: center;
        border-radius: 30px;
        box-shadow:4px 4px 10px white;
    }
    .demo-ruleForm{
        position: absolute;
        margin-top: 30px;
    }
  .in{
        width: 275px;
    }
  #bgc{
      height: 100%;
      width: 100%;
      background: url("../../assets/imgs/BC.jpg");
      background-size: 100% 100%;
      -moz-animation: aa  3s .5s  alternate forwards;
      -webkit-animation: aa  3s .5s  alternate forwards;
      -o-animation: aa  3s .5s  alternate forwards;
  }
    #login:hover{
        box-shadow:0px 0px 10px 5px black;

        transition: .5s;
    }
    .lizi{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    @import url(https://fonts.googleapis.com/css?family=Lato);



    .btn {
        --hue: 190;
        position: relative;
        padding: .5rem 1.5rem;
        font-size: 1rem;
        line-height: 1.5;
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        background-color: hsl(var(--hue), 100%, 41%);
        border: 1px solid hsl(var(--hue), 100%, 41%);
        outline: transparent;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        transition: 0.25s;
        border-radius: 5px;
    }

    .btn:hover {
        background: hsl(var(--hue), 100%, 31%);
    }

    .btn-primary {
        --hue: 187;
    }

    .btn-ghost {
        color: hsl(var(--hue), 100%, 41%);
        background-color: transparent;
        border-color: hsl(var(--hue), 100%, 41%);
    }

    .btn:hover {
        color: white;

    }

    .btn-shine {
        color: white;
    }
    .btn::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
                120deg,
                transparent,
                hsla(var(--hue), 100%, 41%, 0.5),
                transparent
        );
        transform: translateX(-100%);
        transition: 0.6s;
    }

    .btn:hover {
        background: transparent;
        box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
    }

    .btn:hover::before {
        transform: translateX(100%);
    }

    #login:before {
        content: '';
        background: url("../../assets/imgs/BC.jpg") center center / cover no-repeat fixed;
        filter: blur(20px);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }




</style>