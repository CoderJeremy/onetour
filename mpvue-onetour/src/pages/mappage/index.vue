<template>
  <div class="mappage">
      <div class="section">
          <input type="text" placeholder="搜索" focus='true' v-model="keywords" @input="bindInput">
      </div>

      <scroll-view :scroll-y="true" class="addcont" style="height: 500rpx;">
          <!-- 遍历搜索结果 -->
          <div class="result" @touchstart="bindSearch(item.name)" v-for="(item,index) in tips" :key="index">
              {{item.name}}
          </div>
      </scroll-view>
    
    <!-- 地图 -->
    <div class="map_container">
        <div class="title">显示当前位置:</div>
        <!-- 展示地图 map标签，wx提供-->
        <map name="map" id="map" scale="16" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
    </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            tips:[],
            longitude: 0,
            latitude: 0,
            markers:[],
            keywords: ''
        }
    },
    // 生命周期函数
    mounted(){
        this.getMapaddress()
    },
    methods:{
        // 解构
        ...mapMutations(['update']),
        getMapaddress(){
            let that = this
            var myAmapFun = new amapFile.AMapWX({key:'57c5dd2e633d0d151283c9e5da83448b'})
            myAmapFun.getRegeo({
                iconPath: "/static/images/marker.png",
                iconWidth: 22,
                iconHeight: 32,
                success: function(data){
                    //console.log(data)
                    let marker = [
                        {
                            id: data[0].id,
                            latitude: data[0].latitude,
                            longitude: data[0].longitude,
                            width: data[0].width,
                            height: data[0].height
                        }
                    ]
                    that.markers = marker
                    that.longitude = data[0].longitude
                    that.latitude = data[0].latitude
                },
                fail(info){
                    console.log(info)
                }
            })
        },
        bindInput(e){
            let that = this
            let keywords = that.keywords
            var myAmapFun = new amapFile.AMapWX({key:'57c5dd2e633d0d151283c9e5da83448b'})
            // 内容输入提示词
            myAmapFun.getInputtips({
                keywords:keywords,
                location:'',
                success:function(data){
                    if(data && data.tips){
                        that.tips=data.tips
                    }
                }
            })
        },
        bindSearch(cityName){
            this.update({cityName: cityName})
            // 跳回上一页面
            wx.navigateBack({
                delta: 1
            });
            
        }
    }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>