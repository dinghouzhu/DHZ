<template>
    <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="ruleForm.newPassword"  type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="againPassword">
            <el-input v-model="ruleForm.againPassword"  type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="resetPass">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    import {resetPassword} from "../../api";
    export default {
      name:'addPerson',
        data() {
            var checkWord = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
            };

            return {
                ruleForm: {
                     username:'',
                  oldPassword: '',
                  newPassword: '',
                  againPassword: ''
                },
                rules: {
                    username: [
                        { validator: checkWord, trigger: 'blur' }
                    ],
                  oldPassword: [
                        { validator: checkWord, trigger: 'blur' }
                    ],
                  newPassword: [
                        { validator: checkWord, trigger: 'blur' }
                    ],
                  againPassword: [
                    { validator: checkWord, trigger: 'blur' }
                  ]
                }
            };
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            
            resetPass(){
                let {username,oldPassword,newPassword,againPassword}=this.ruleForm;
                 var that=this;
                resetPassword(username,oldPassword,newPassword,againPassword)
                    .then(res=>{
                      if (res.data.code === 200  ) {
                        that.$message({
                          type:'success',
                          message:res.data.msg+',请重新登录'
                        });
                        localStorage.clear();
                        setTimeout(() => {
                          //修改成功退出页面重新登录
                          that.$router.push('/')
                        }, 500);
                      }else {
                        that.$message({
                          type:'error',
                          message:res.data.msg
                        })
                      }

                    })
                    .catch(err=>{
                      console.log(err);
                      that.$message({
                        type:'warning',
                        message:'密码修改失败'
                      })
                    })

            }
        }
    }
</script>

<style scoped>
.el-form-item{
    width: 400px;
}
</style>