<template @clikc="getBusinessQy">
    <div class="music" >
        <div class="musicBody" >
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
        <audio ref="music"  id="palyurl">
            <source :src="NowMusic " type="audio/mpeg" >
        </audio>
        </div>

      <div class="search">
        <template>
            <el-select v-model="value"
                       @change="searchResultChange"
                       clearable
                       filterable
                       remote
                       reserve-keyword
                       placeholder="请输入歌曲名称... "
                       :remote-method="searchInput">
                <el-option v-for="item in searchResult"
                           :key="item.id"
                           :value="item.name"
                >
                </el-option>
            </el-select>
        </template>
      </div>
    </div>
</template>

<script>
  import qs from "qs"
  import {searchUser,searchSongs,searchSong} from "../../api";
  import {mapMutations,mapActions} from "vuex"
  export default{
    name:'oneself',
        data(){
            return {
                value:'',
                searchResult:[],
                newList:null,
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
          ...mapActions(['getBusinessQy']),
          searchResultChange(key) {
            //过滤请求到的数据  如果没有  刷新页面
            var _this=this;
            if (!key) {
               console.log('输入不能为空');
            } else {
              console.log(key);
              this.userList = this.searchResult.filter(item => item.name === key);
              let songId=this.userList[0].id;
              searchSong(songId)
                .then(res=>{
                  _this.$refs.music.src =res.data.data[0].url;
                  _this.play();
                })
                .catch(err=>{
                  console.log(err);
                })
            }
          },

          searchInput(key) {
            var _this=this;
            setTimeout((()=>{
              searchSongs(key)
                .then(res => {
                  if (res.data.code) {
                    _this.searchResult = [];
                    _this.searchResult=res.data.result.songs;
                  } else {
                    _this.searchResult = []
                  }
                })
                .catch(err => {
                  throw new Error(err)
                });
            }),1200);





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




    .ListLi{
        display: block;
        width: 200px;
        overflow: hidden;
        cursor: pointer;
        word-wrap:break-word;
        word-break:break-all;
    }

    .inputBody{
        width: 250px;
    }
    .music{

        /*position: absolute;*/
        /*bottom:0;*/
        /*left: 50%;*/
        /*transform: translateX(-50%);*/
        /*z-index: 10;*/
        background: #e9eef3;
        width: 80%;
        margin: 0 auto;


    }
    .music:hover{
        transition: .5s;
        opacity: 1;
    }

    .musicBody{
        float: left;
        width: 800px;
        height: 50px;
    }
    .search{
        float: left;
    }

</style>