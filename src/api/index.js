import axios from "axios";
import da from "element-ui/src/locale/lang/da";

/*
//发送请求给每个请求体添加额外请求头
axios.interceptors.request.use(function (config) {
   if (config.url == "http://106.12.176.212:8080/user/login"){
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
    url:"http://106.12.176.212:8080/getloginlog",
});
export const getClass=()=>axios({
    url:"http://106.12.176.212:8080/students/getstulist",
});
export const delStu=(sId,token)=>axios({
    url:"http://106.12.176.212:8080/students/delstu",
    method:'get',
    params:{
        sId,
        token
    }
});
//添加数据
export const addstu=(data)=>axios({
    url:"http://106.12.176.212:8080/students/addstu",
    method:'post',
    data:data,
});
//更新数据
export const editStuInfo=data=>axios({
    url:"http://106.12.176.212:8080/students/updatestu",
    method:'post',
    data
});
//查找数据
export const searchStu=params=>axios({
    url:"http://106.12.176.212:8080/students/searchstu",
    params
});

//班级列表
export const getClasses=data=>axios({
       url:"http://106.12.176.212:8080/students/getclasses",
       method:'get',
       data
    });






//定义登陆方法
export const login=(username,password)=>axios({
    url:"http://106.12.176.212:8080/user/login",
    method:'post',
    data:{
      username,
      password
    },
    timeout:5000,
  });

//查询所有用户
export const getUsers=()=>axios({
  url:"http://106.12.176.212:8080/user/userlist",
  method:'post',
  params:{

  },
  timeout: 5000
});

//查询用户
export const searchUser=(username)=>axios({
  url:"http://106.12.176.212:8080/user/searchUser",
  method:'post',
  params:{
    username
  },
  timeout: 5000
});

//查询用户  模糊查询
export const searchUsers=(username)=>axios({
  url:"http://106.12.176.212:8080/user/searchUsers",
  method:'post',
  params:{
    username
  },
  timeout: 5000
});

//删除用户
export const deleteUser=(username,token)=>axios({
  url:"http://106.12.176.212:8080/user/deleteUser",
  method:'post',
  data:{
    username,token
  },
  timeout: 5000
});

//修改密码
export const resetPassword=(username,oldPassword,newPassword,againPassword)=>axios({
    url:"http://106.12.176.212:8080/user/updatePassword",
    method:'post',
    data:{
        username,oldPassword,newPassword,againPassword
    }
});

//注册用户
export const addUser=(username,password,nickname,des,habit,sex,age,IP,token)=>axios({
    url:"http://106.12.176.212:8080/user/register",
    method:'post',
    data:{
        username,password,nickname,des,habit,sex,age,IP,token
    },
    timeout: 5000
});

//修改用户信息
export const updateUser=(username,password,nickname,des,habit,sex,age,token)=>axios({
  url:"http://106.12.176.212:8080/user/updateUser",
  method:'post',
  data:{
    username,password,nickname,des,habit,sex,age,token
  },
  timeout: 5000,

});

//获取酒店信息
export const getHotel=()=>axios({
  url:"http://106.12.176.212:8080/hotel/hotel",
  method:'post',
  params:{

  },
  timeout: 5000
});

//获取房间信息
export const getRooms=()=>axios({
  url:"http://106.12.176.212:8080/room/rooms",
  method:'post',
  params:{

  },
  timeout: 5000
});

//插入新订单
export const updateOrders=(username,roomid,type,price,breakfast ,date,token)=>axios({
  url:"http://106.12.176.212:8080/order/insert",
  method:'post',
  data:{
    username,roomid,type,price,breakfast ,date,token
  },
  timeout: 5000
});

//搜索歌曲
export const searchSongs=(keywords)=>axios({
  url:"http://106.12.176.212:3000/search",
  method:'post',
  params:{
    keywords
  },
  timeout: 5000
});

//根据歌曲id获取URL
export const searchSong=(id)=>axios({
  url:"http://106.12.176.212:3000/song/url",
  method:'post',
  params:{
    id
  },
  timeout: 5000
});

//间隔验证token
export const getAgain=(token)=>axios({
  url:"http://106.12.176.212:8080/user/again",
  method:'post',
  data:{
     token
  },
  timeout: 5000
});

//登录日志
export const loginLog=(username,nickname,date,IP)=>axios({
  url:"http://106.12.176.212:8080/user/loginLog",
  method:'post',
  data:{
    username,nickname,date,IP
  }
});


//世界新冠疫情各国疫情
export const getXinguan=()=>axios({
  url:"https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist",
  method:'post',
  timeout: 5000
});

//https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoContinentStatis,FAutoGlobalDailyList,FAutoCountryWeekCompRank,FAutoCountryConfirmAdd
//世界新冠疫情总览
export const getMsg=()=>axios({
  url:"https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoContinentStatis,FAutoGlobalDailyList,FAutoCountryWeekCompRank,FAutoCountryConfirmAdd",
  method:'post',
  timeout: 5000
});

//https://mat1.gtimg.com/news/feiyanarea/hubei.json
//湖北疫情
export const getHubei=()=>axios({
  url:"https://mat1.gtimg.com/news/feiyanarea/hubei.json",
  method:'post',
  timeout: 5000
});
//获取公告
export const getMessage=()=>axios({
  url:"http://106.12.176.212:8080/msg/msg",
  method:'post',
  timeout: 5000
});
//插入单条公告
export const insertMsg=(username,level,title,msg,date,token)=>axios({
  url:"http://106.12.176.212:8080/msg/insertmsg",
  method:'post',
  data:{
    username,level,title,msg,date,token
  },
  timeout: 5000
});

//删除单条公告
export const deleteMsg=(id,token)=>axios({
  url:"http://106.12.176.212:8080/msg/deleteMsg",
  method:'post',
  data:{
    id,token
  },
  timeout: 5000
});



//货权权限列表
export const getJur=()=>axios({
  url:"http://106.12.176.212:8080/jur/jur",
  method:'post',
  timeout: 5000
});
