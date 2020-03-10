import axios from "axios";
import da from "element-ui/src/locale/lang/da";
/*
axios.interceptors.request.use(function (config) {
   if (config.url == "/api/users/login"){
       return config
   }else {
       let Token =localStorage.getItem("qftoken");
       config.headers['authorization'] = Token;
       return config;
   }
});
axios.interceptors.response.use(function (config) {
    if (config.config.url !=="api/getloginlog"){
        if (!config.data.state && config.data.msg =="校验失败"){
            location.href="#/login";
            localStorage.removeItem("qftoken")
        }
    }
    return config
});
*/
//定义登陆方法
export const login=(username,password)=>axios({
    url:"http://localhost:8080/user/login",
    method:'post',
    data:{
      username,
      password
    },
    timeout:5000,
  }
);


//查询所有用户
export const getUsers=()=>axios({
  url:"http://localhost:8080/user/userlist",
  method:'post',
  params:{

  },
  timeout: 3000
});

//查询用户
export const searchUser=(username)=>axios({
  url:"http://localhost:8080/user/searchUser",
  method:'post',
  params:{
    username
  },
  timeout: 3000
});

//删除用户
export const deleteUser=(username)=>axios({
  url:"http://localhost:8080/user/deleteUser",
  method:'post',
  params:{
    username
  },
  timeout: 3000
});


//获取登入日志
export const getLoginLog=()=>axios({
    url:"/api/getloginlog",
});
export const getClass=()=>axios({
    url:"/api/students/getstulist",
});
export const delStu=(sId,token)=>axios({
    url:"/api/students/delstu",
    method:'get',
    params:{
        sId,
        token
    }
});
//添加数据
export const addstu=(data)=>axios({
    url:"/api/students/addstu",
    method:'post',
    data:data,
});
//更新数据
export const editStuInfo=data=>axios({
    url:"/api/students/updatestu",
    method:'post',
    data
});
//查找数据
export const searchStu=params=>axios({
    url:"/api/students/searchstu",
    params
});

//班级列表
export const getClasses=data=>axios({
       url:"/api/students/getclasses",
       method:'get',
       data
    });

//修改密码
export const resetPassword=(username,oldPassword,newPassword,againPassword)=>axios({
    url:"http://localhost:8080/user/updatePassword",
    method:'post',
    params:{
        username,oldPassword,newPassword,againPassword
    }
});
//获取学员信息
// export const getStuList=(count=10 ,page=1, Class)=>axios({
//     url:"/api/students/getstulist",
//     params:{
//         count,
//         page,
//         class:Class
//     },
//     timeout: 5000
// });

// export const addUser=(username,password,nickname)=>axios({
//     url:"/api/users/register",
//     params:{
//         username,password,nickname
//     },
//     timeout: 5000
// });

//获取酒店信息
export const getHotel=()=>axios({
  url:"http://localhost:8080/hotel/hotel",
  method:'post',
  params:{

  },
  timeout: 3000
});