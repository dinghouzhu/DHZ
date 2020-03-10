<template>
    <div class="el">

        <div class="flex">

            <!--<div>我是今后非常火的弹性布局</div>-->
            <!--<div>今天又学到一个新的知识</div>-->
            <!--<div>真的很开心</div>-->
            <!--<div>所以好好学习，真的很重要。</div>-->
            <!--<div>再来一个！</div>-->

            <div v-for="item in List" :key="item.id" @click="handle(item.path)" class="CataBody">
                <div class="imgBody" :style="{backgroundImage: 'url(' + (item.img_url) + ')'}"  >


                </div>
                <h1>{{item.nickname}}</h1>
                <span>{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
 export default {

        data(){
          return{
              msg:'目录页',
              List:[
                  {
                      id:1,
                      title:'',
                      path:'oneself',
                      img_url:localStorage.getItem('img_url'),
                      nickname:localStorage.getItem('nickname')
                  },
                  {
                      id:2,
                      title:'经历',
                      path:'test',
                      img_url:''
                  },
                  {
                      id:3,
                      title:'未来展望',
                      path:'',
                      img_url:''
                  },

              ]

          }
        },

        methods:{
              handle(path){
                  console.log(path);
                  this.$router.push('/'+path)
              },


            // imgFn(lj){
            //     return require("../assets/imgs/"+ lj)
            // },
        }
    }
</script>

<style scoped>
 .el{
     height: 100%;
 }
    .flex
    {
        /* 基本样式 */
        /*width: 550px;*/

        height:100%;
        cursor: pointer;
        font: 14px Arial;

        /*  建立弹性框 */
        display: -webkit-flex;/*很多浏览器用到的内核*/
        display: -ms-flexbox;/*ie*/
        display: -webkit-box;/*苹果*/
        -webkit-flex-direction: row;
        -ms-flex-direction: row;

        display: flex;
        flex-direction: row;
    }

    .flex > div
    {
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        height: 100%;
        width: 500px; /* 让过渡表现良好。（从/到"width:auto"的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */

        -webkit-transition: width 0.7s ease-out;
        -ms-transition: width 0.7s ease-out;
        transition: width 0.7s ease-out;

    }

    /* colors */
    .flex > div:nth-child(1){ background : #009246; }
    .flex > div:nth-child(2){ background : #F1F2F1; }
    .flex > div:nth-child(3){ background : #CE2B37; }

    .flex > div:hover
    {
        width: 650px;
    }
    .CataBody{
        position: relative;
        text-align: center;
    }
    .imgBody{
        position: absolute;
        text-align: center;
        background-size: 100% 100%;
        width: 150px;
        height: 100px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .Btn{
        position: absolute;
        z-index: 10;
        right: 50px;
        top: 50px;
        font-size: 14px;
    }
</style>