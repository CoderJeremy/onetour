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

      <!-- 商品详情参数 -->
      <div class="attribute">
          <div class="head">
              景点详情
          </div>
          <div class="item" v-for="(item, index) in attribute" :key="index">
              <div>{{item.name}}</div>
              <div>{{item.value}}</div>
          </div>
      </div>

      <!-- 图片展示 -->
      <div class="detail" v-if="goods_desc">
          <wxParse :content="goods_desc"/>
      </div>

      <!-- 常见问题 -->
      <div class="common-problem">
          <div class="head">
            <text class="title">常见问题</text>
          </div>
          <div class="body">
              <div class="item" v-for="(item,index) in issueList" :key="index">
                  <div class="question-box">
                      <text class="spot"></text>
                      <text class="question">{{item.question}}</text>
                  </div>
                  <div class="answer">{{item.answer}}</div>
              </div>
          </div>
      </div>

      <!-- 大家都在看 -->
        <div class="common-problem">
            <div class="head">
                <text class="title">大家都在看</text>
            </div>
            <div class="sublist">
                <div @click="toGoods(item.id)" v-for="(item,index) in productList" :key="index">
                    <img :src="item.list_pic_url" alt="" >
                    <p>{{item.name}}</p>
                    <p>￥{{item.retail_price}}</p>
                </div>
            </div>
        </div>

      <!-- footerBar -->
      <div class="bottom-fixed">
          <!-- 收藏 -->
          <div class="collect-box" @click="collect">
              <div class="collect" :class="[collectFlag ? 'active' : '']"></div>
          </div>
          <!-- 购物车 -->
          <div class="car-box" @click="toCart">
              <div class="car">
                  <!-- 购物车数量 -->
                  <span>{{sumGoods}}</span>
                  <img src="/static/images/car.png" alt="">
              </div>
          </div>
          <div @click="buy">立即购买</div>
          <div @click="addCart">加入购物车</div>
      </div>

      <!-- 选择规格 弹出层 -->
      <div class="pop" v-show="showpop" @click="showType"></div>
      <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
          <div class="top">
              <div class="left">
                  <img :src="goodsInfo.primary_pic_url" alt="">
              </div>
              <div class="right">
                  <div>
                      <p>价格￥{{goodsInfo.retail_price}}</p>
                      <p>请选择数量</p>
                  </div>
              </div>
              <div class="close" @click="showType">x</div>
          </div>
          <div class="bottom">
              <p>数量</p>
              <div class="count">
                  <div class="cut" @click="cut">-</div>
                  <input type="text" class="number" v-model="number" disabled="false">
                  <div class="add" @click="add">+</div>
              </div>
          </div>
      </div>




  </div>
</template>

<script>
import { get, post } from '../../utils'
import wxParse from 'mpvue-wxparse'
export default {
    data(){
        return{
            gallery: [],//banner图
            goodsId: '' ,//商品id
            openId: '',//用户id
            goodsInfo:{},//商品详情
            category:{},//商品分类
            showpop: false, //弹出框 
            number:0,//商品初始数量
            attribute: [], //商品属性
            goods_desc: '',//图片描述
            issueList: [],//常见问题
            productList: [],//大家都在看商品
            collectFlag: '', //默认 未收藏
            sumGoods:0,//当前用户购物车总数
            sumPrice:''//当前商品总价
        }
    },
    components:{
        wxParse
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
        // 获取用户id
        this.openId = wx.getStorageSync('openId')||'';
        // 获取链接上的商品id
        this.goodsId = this.$root.$mp.query.id
        // console.log(this.id)
        this.goodsDetail()
    },
    methods:{
        // 商品详情
        async goodsDetail(){
            const data = await get('/goods/detailaction',{
                goodsId: this.goodsId,
                openId: this.openId
            })
            console.log(data)
            this.goodsInfo = data.goodsInfo
            this.gallery = data.gallery
            this.category = data.category
            this.attribute = data.attribute
            this.goods_desc = data.goodsInfo.goods_desc
            this.issueList = data.issueList
            this.productList = data.productList
            this.collectFlag = data.collectFlag
            this.sumGoods = data.sumGoods
            this.allPrice = data.goodsInfo.retail_price
        },
        // 控制页面弹出
        showType(){
            this.showpop = !this.showpop
        },
        // 商品数量加减
        add(){
            this.number += 1;
        },
        cut(){
            if(this.number > 1){
                this.number -= 1;
            }else{
                return false;
            }
        },
        // 收藏
        async collect(){
            this.collectFlag = !this.collectFlag
            const data = await post('/collect/addcollect',{
                openId: this.openId,
                goodsId: this.goodsId
            })
            console.log(data)
        },
        // 跳转购物车导航页面
        toCart(){
            wx.switchTab({
                url: '/pages/cart/main',
            });
        },
        // 点击大家都在看商品页面 跳转到商品详情
        toGoods(id){
            wx.navigateTo({
                url: '/pages/goods/main?id=' + id
            });
        },
        // 立即购买
        async buy(){
            if(this.showpop){
                // 弹出提示
                if(this.number === 0){
                    wx.showToast({
                        title:'请选择商品数量',
                        duration: 2000,
                        icon:'none',
                        mask: true,
                        success: res => {}
                    })
                    return false
                }
                const data = await post('/order/submitaction',{
                    goodsId: this.goodsId,
                    openId: this.openId,
                    allPrice: this.allPrice
                })
                // 订单更新成功
                if(data){
                    wx.navigateTo({
                        url:'/pages/order/main'
                    })
                }
            }else{
                this.showpop = true
            }
        },
        // 加入购物车
        async addCart(){
            if(this.showpop){
                  if(this.number === 0){
                    wx.showToast({
                        title:'请选择商品数量',
                        duration: 2000,
                        icon:'none',
                        mask: true,
                        success: res => {}
                    })
                    return false
                }
                const data = await post('/cart/addcart',{
                    openId: this.openId,
                    goodsId: this.goodsId,
                    number: this.number
                })
                if(data){
                    this.sumGoods=this.sumGoods+this.number
                    // 更新购物车数量
                    wx.showToast({
                        title:'添加购物车成功',
                        icon:'success',
                        duration:1500
                    })
                }
            }else{
                this.showpop = true
            }
        }

    }
}
</script>

<style lang='less' scoped>
@import url('~mpvue-wxparse/src/wxParse.css');
@import './style';
</style>

