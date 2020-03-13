<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-popover
                        placement="top-start"
                        trigger="hover">
                    <div style="text-align: center">
                        <el-progress
                                color="#67C23A"
                                type="circle"
                                :percentage="music.volume"></el-progress><br>
                        <el-button
                                @click="changeVolume(-10)"
                                icon="el-icon-minus"
                                circle></el-button>
                        <el-button
                                @click="changeVolume(10)"
                                icon="el-icon-plus"
                                circle></el-button>
                    </div>
                    <el-button
                            @click="play"
                            id="play"
                            slot="reference"
                            :icon="music.isPlay?'el-icon-refresh':'el-icon-caret-right'"
                            circle></el-button>
                </el-popover>
            </el-col>
            <el-col :span="14"  style="padding-left: 20px">
                <el-slider
                        @change="changeTime"
                        :format-tooltip="formatTime"
                        :max="music.maxTime"
                        v-model="music.currentTime"
                        style="width: 100%;"></el-slider>
            </el-col>
            <el-col :span="6" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
                {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
            </el-col>
        </el-row>
        <audio ref="music" loop id="palyurl">
            <source :src="NowMusic" type="audio/mpeg" >
        </audio>



        <template>
            <el-select v-model="value"
                       @change="searchResultChange"
                       clearable
                       filterable
                       remote
                       reserve-keyword
                       placeholder="目前只支持精确查找 "
                       :remote-method="searchInput">
                <el-option v-for="item in searchResult"
                           :key="item.username"
                           :value="item.username">
                </el-option>
            </el-select>
        </template>


    </div>
</template>

<script>
  import qs from "qs"
  import {searchUser,searchSongs} from "../../api";

  export default{
        data(){
            return {
                value:'',
                searchResult:[],
                newList:null,
                dataList:['aaa','abc','ccc','cdc','ddd','今日说法','今日预报','你的答案','你的'],
                MusicName:null,
                musicList:[],
                NowMusic:require('../../assets/img/Masque_Jupiter - 亡灵序曲（纯钢琴）.mp3'),
                music:{
                    isPlay:false,
                    currentTime:0,
                    maxTime:0,
                    volume:40
                },
              userList:[],



            }
        },
        mounted(){
            this.$nextTick(()=>{
                setInterval(this.listenMusic,1000)
            })

        },

        methods:{
          searchResultChange(key) {
            //过滤请求到的数据  如果没有  刷新页面
            if (!key) {
               console.log('输入不能为空');
            } else {
              this.userList = this.searchResult.filter(item => item.username === key)
            }
          },

          searchInput(key) {
            searchSongs(key)
              .then(res => {
                if (res.data.code) {
                  this.searchResult = [];
                  this.searchResult.push(res.data.data);
                } else {
                  this.searchResult = []
                }
                console.log(res)
              })
              .catch(err => {
                throw new Error(err)
              });
            console.log(key)
          },
            change(MusicName){
                this.search(MusicName)
                // var newList=this.dataList.filter(item=>item.indexOf(this.MusicName)>-1);
                //  this.newList=newList;
                // console.log(this.dataList,newList);
            },

            listenMusic(){
                if(!this.$refs.music){
                    return
                }
                if(this.$refs.music.readyState){
                    this.music.maxTime = this.$refs.music.duration
                }
                this.music.isPlay=!this.$refs.music.paused;
                this.music.currentTime = this.$refs.music.currentTime
            },
            play(){
                if(this.$refs.music.paused){
                    this.$refs.music.play()
                }else{
                    this.$refs.music.pause()
                }
                this.music.isPlay=!this.$refs.music.paused;
                this.$nextTick(()=>{
                    document.getElementById('play').blur()
                })
            },
            changeTime(time){
                this.$refs.music.currentTime = time
            },
            changeVolume(v){
                this.music.volume += v;
                if(this.music.volume>100){
                    this.music.volume = 100
                }
                if(this.music.volume<0){
                    this.music.volume = 0
                }
                this.$refs.music.volume = this.music.volume/100
            },
            formatTime(time){
                let it = parseInt(time);
                let m = parseInt(it/60);
                let s = parseInt(it%60);
                return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
            }
        },
        watch:{


        }
    }
</script>
<style scoped>



    .ListBody::-webkit-scrollbar {
        display: none;
    }
    .ListLi{
        display: block;
        width: 200px;
        overflow: hidden;
        cursor: pointer;
        word-wrap:break-word;
        word-break:break-all;
    }
    .ListBody{
        width: 200px;
        height: 500px;
        margin: 0 auto;
        overflow-y: scroll;
        border: 1px solid black;
    ;
    }
    .inputBody{
        width: 250px;
    }

</style>