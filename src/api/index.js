import axios from "axios";
import da from "element-ui/src/locale/lang/da";
/*
//发送请求给每个请求体添加额外请求头
axios.interceptors.request.use(function (config) {
   if (config.url == "/api/user/login"){
       return config
   }else {
       let Token =localStorage.getItem("token");
       config.headers['authorization'] = Token;
       return config;
   }
});
*/
/*
//过滤响应内容
axios.interceptors.response.use(function (config) {
    if (config.config.url !=="api/getUsers"){
        if (!config.data.state && config.data.msg =="校验失败"){
            location.href="#/login";
            localStorage.removeItem("qftoken")
        }
    }
    return config
});
*/



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






//定义登陆方法
export const login=(username,password)=>axios({
    url:"/api/user/login",
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
  url:"/api/user/userlist",
  method:'post',
  params:{

  },
  timeout: 5000
});

//查询用户
export const searchUser=(username)=>axios({
  url:"/api/user/searchUser",
  method:'post',
  params:{
    username
  },
  timeout: 5000
});

//查询用户  模糊查询
export const searchUsers=(username)=>axios({
  url:"/api/user/searchUsers",
  method:'post',
  params:{
    username
  },
  timeout: 5000
});

//删除用户
export const deleteUser=(username,token)=>axios({
  url:"/api/user/deleteUser",
  method:'post',
  params:{
    username,token
  },
  timeout: 5000
});

//修改密码
export const resetPassword=(username,oldPassword,newPassword,againPassword)=>axios({
    url:"/api/user/updatePassword",
    method:'post',
    params:{
        username,oldPassword,newPassword,againPassword
    }
});

//注册用户
export const addUser=(username,password,nickname,des,habit,sex,age)=>axios({
    url:"/api/user/register",
    method:'post',
    params:{
        username,password,nickname,des,habit,sex,age
    },
    timeout: 5000
});

//修改用户信息
export const updateUser=(username,password,nickname,des,habit,sex,age,token)=>axios({
  url:"/api/user/updateUser",
  method:'post',
  params:{
    username,password,nickname,des,habit,sex,age,token
  },
  timeout: 5000
});

//获取酒店信息
export const getHotel=()=>axios({
  url:"/api/hotel/hotel",
  method:'post',
  params:{

  },
  timeout: 5000
});


//获取房间信息
export const getRooms=()=>axios({
  url:"/api/room/rooms",
  method:'post',
  params:{

  },
  timeout: 5000
});

//查找歌曲
export const searchSongs=(keyword)=>axios({
  url:"http://localhost:5000/search",
  method:'post',
  params:{
    keyword
  },
  timeout: 5000
});