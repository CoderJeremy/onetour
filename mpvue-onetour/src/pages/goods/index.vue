// 商品详情页面
<template>
  <div class="goods">
      <!-- 轮播图 -->
      <div class="swiper">
          <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
             <!-- 渲染轮播图 -->
            <block v-for="(item, index) in gallery" :key="index">
                <swiper-item class="swiper-item">
                    <img :src="item.img_url" alt="" class="slide-image" />
                </swiper-item>
            </block>
          </swiper>
          <!-- 分享按钮 -->
          <button class="share" hover-class="none" open-type="share" value="">
              分享好友
          </button>
      </div>
      <!-- 标签 -->
      <div class="swiper-b">
          <div class="item">24小时全天候服务</div>
          <div class="item">专业导游规划</div>
          <div class="item">超高性价比推荐</div>
      </div>
      <!-- 商品信息 -->
      <div class="goods-info">
          <div class="c">
              <p>{{goodsInfo.name}}</p>
              <p>{{goodsInfo.goods_brief}}</p>
              <p>￥{{goodsInfo.retail_price}}</p>
              <div class="brand" v-if="category.name">
                 <p>{{category.name}}</p>
              </div>
          </div>
      </div>
      <!-- 导航 -->
      <div class="section-nav" @click="showType">
          <div>请选择规格数量</div>
          <div></div>
      </div>

      <!-- 选择规格 弹出层 -->
      <div class="pop" v-show="showpop" @click="showType"></div>
      <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
          <div class="top">
              <div class="left">
                  <img src="" alt="">
              </div>
              <div class="right">
                  <div>
                      <p>￥价格</p>
                      <p>请选择数量</p>
                  </div>
              </div>
              <div class="close" @click="showType">x</div>
          </div>
          <div class="bottom">
              <p>数量</p>
              <div class="count">
                  <div class="cut">-</div>
                  <input type="text" class="number">
                  <div class="add">+</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { get, post } from '../../utils'
export default {
    data(){
        return{
            gallery: [],//banner图
            goodsId: '' ,//商品id
            openId: '',//用户id
            goodsInfo:{},//商品详情
            category:{},//商品分类
            showpop: false //弹出框 
        }
    },
    // 商品分享
    onShareAppMessage() {
        console.log(this.goodsInfo.name)
        return {
        title: this.goodsInfo.name+'之旅'+this.goodsInfo.retail_price+'元起',
        path: '/pages/goods/main?id' + this.goodsInfo.id,
        imageUrl: this.gallery[0].img_url
        }
    },
    mounted(){
        this.openId = wx.getStorageSync('openId')||'';
        this.goodsDetail()
    },
    methods:{
        // 商品详情
        async goodsDetail(){
            const data = await get('/goods/detailaction',{
                goodsId: 1020000,
                openId: this.openId
            })
            console.log(data)
            this.goodsInfo = data.goodsInfo
            this.gallery = data.gallery
            this.category = data.category
        },
        //
        showType(){
            this.showpop = !this.showpop
        }
    }
}
</script>

<style lang='less' scoped>
@import './style';
</style>