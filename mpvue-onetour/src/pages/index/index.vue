<template>
  <div class="index">
    <!-- 头部的搜索 -->
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000" circular="true">
        <block v-for="(item,index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url"/>
          </swiper-item>
        </block>
      </swiper>
    </div>

    <!-- 频道 -->
    <div class="channel">
      <div v-for="(item, index) in channel" :key="index" @click="categoryList(item.id)">
        <img :src="item.icon_url" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>

    <!-- 热门国家 -->
    <div class="hotcountry">
      <!-- 标题 点击跳转到国家列表 -->
      <div class="head" @click="toCountryList()">
        热门国家
      </div>
      <!-- 内容 -->
      <div class="content">
          <div v-for="(item, index) in hotcountryList"  :key="index" @click="countryDetail(item.id)">
            <div>
              <p>{{item.name}}</p>
              <p class="price">{{item.floor_price}}元起</p>
            </div>
            <img :src="item.pic_url" alt="">
          </div>
      </div>
    
    </div>

    <!-- 新的旅游单品 -->
    <div class="newgoods">
      <!-- 顶部标题 -->
      <div class="newgoods-top" @click="goodsList('new')">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <!-- 底部列表 左右滑动 -->
      <div class="list">
        <ul>
          <!-- 滚动组件 -->
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item, index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>¥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>

    <!-- 热门旅游单品 通过绑定事件 传递参数不同来区别-->
    <div class="newgoods hotgoods" @click="goodsList('hot')">
      <!-- 顶部标题 -->
      <div class="newgoods-top">
        <div class="top">
          <p>
            人气推荐
            <span></span>
            好物精选
          </p>
          <p>查看全部</p>
        </div>
      </div>
      <!-- 底部列表 左右滑动 -->
      <div class="list">
        <ul>
          <!-- 滚动组件 -->
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item, index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>¥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div> 

    <!-- 专题精选 -->
    <div class="topiclist">
      <!-- 顶部 -->
      <div class="topiclist-top">
        专题精选
        <span class="icon"></span>
      </div>
      <!-- 内容 -->
      <div class="list">
        <ul>
          <!-- 滚动 -->
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in topicList" :key="index" @click="topicDetail(item.id)">
              <img :src="item.item_pic_url" alt=""/>
              <div class="bottom">
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <div>￥{{item.price_info}}</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>

    <!-- 单品 好物推荐-->
    <div class="newcategory">
      <div class="list" v-for="(item,index) in newCategoryList" :key="index">
        <div class="head">{{item.name}}好物</div>
        <div class="sublist">
          <div v-for="(subitem,subindex) in item.goodsList" :key="subindex">
            <img :src="subitem.list_pic_url" alt="">
            <p>{{subitem.name}}</p>
            <p>￥{{subitem.retail_price}}</p>
          </div>
           <!-- 跳转 -->
          <div>
            <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import {mapState,mapMutations} from 'vuex'
import {get} from '../../utils'
export default {
  // 数据源
  data(){
    return{
      banner:[],
      channel:[],
      hotcountryList:[],
      newGoods:[],
      hotGoods:[],
      topicList:[],
      newCategoryList:[]
    }
  },
  computed:{
    // 解构
    ...mapState(['cityName'])
  },
  mounted(){
    // 生命周期函数 
    // 加载轮播图
    this.getData()
    // 加载定位信息
    this.getCityName()
  },
  methods:{
    ...mapMutations(['update']),

    toMappage(){
      // 通过wx.getSetting方法 先查询用户是否授权“scope.record”
      let that=this
      wx.getSetting({
        success: (result)=>{
          //如果没有同意授权 打开设置
          if(!result.authSetting['scope.userLocation']){
            wx.openSetting({
              success: (result)=>{
                // 获取授权位置信息
                that.getCityName()
              }
            })
          }else{
            wx.navigateTo({
              url: '/pages/mappage/main',
            });
          }
        },
        fail: (err)=>{console.log(err)},
        complete: ()=>{}
      });
    },

    // 获取城市信息
    getCityName(){
      // 绑定作用域
      let that = this;
      var myAmapFun = new amapFile.AMapWX({key:'57c5dd2e633d0d151283c9e5da83448b'});
      myAmapFun.getRegeo({
        success:function(data){
          //成功回调
          console.log(data)
          //...
        },
        fail:function(info){
          //失败回调
          console.log(info)
          //that.cityName='上海'
          that.update({cityName:'上海'})
        }
      })
    },

    // 异步获取轮播图、channel数据数据、热门国家数据、新品信息
    async getData(){
      const data = await get('/index/index')// http://localhost:8080/sdust/index/index
      console.log(data)
      this.banner = data.banner
      this.channel = data.channel
      this.hotcountryList = data.hotcountryList
      this.newGoods = data.newGoods
      this.hotGoods = data.hotGoods
      this.topicList = data.topicList
      this.newCategoryList = data.newCategoryList
    },

    // channel点击事件
    categoryList(id){
      wx.navigateTo({
        url:'/pages/categorylist/main?id=' + id
      })
    },

    // 获取国家信息
    countryDetail(id){
      wx.navigateTo({
        url:'/pages/countryDetail/main?id=' + id
      })
    },

    // 点击获取国家列表
    toCountryList(){
      wx.navigateTo({
        url:'/pages/countrylist/main'
      })
    },
    
    // 点击获取商品页面
    goodsList(info){
      if(info == 'new'){
        wx.navigateTo({
          url:'/pages/newgoods/main?isNew=' + 1
        })
      }else{
        wx.navigateTo({
          url:'/pages/newgoods/main?isHot=' + 1
        })
      }
    },

    // 话题精选 详情页面
    topicDetail(id){
      wx.navigateTo({
          url:'/pages/topicdetail/main?id=' + id
        })
    }

  }
}
</script>

<style lang="less" scoped>
// 引入样式文件
@import "./style.less";
</style>