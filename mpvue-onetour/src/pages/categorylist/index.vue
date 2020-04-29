<template>
  <div class="categoryList">
      <scroll-view scroll-x="true" class="head" :scroll-left="scrollLeft">
          <div v-for="(item,index) in navData" :key="index" :class="[nowIndex == index ? 'active' :'']" @click="changeTab(index,item.id)">
            {{item.name}}
          </div>
      </scroll-view>

      <div class="info">
          <p>{{currentNav.name}}</p>
          <p>{{currentNav.front_name}}</p>
      </div>
      <!-- 商品列表 -->
      <div class="list" v-if="goodsList.length!==0">
          <div class="item" v-for="(item,index) in goodsList" :key="index" @click="toDetail(item.id)"> 
              <img :src="item.list_pic_url" alt="">
              <p class="name">{{item.name}}</p>
              <p class="price">￥{{item.retail_price}}</p>
          </div>
      </div>

      <!-- 暂无数据 -->
      <div class="none" v-else>数据库暂无数据...</div>
  </div>
</template>

<script>
import { get, post, getStorageOpenId } from "../../utils";
export default {
    data(){
        return{
            scrollLeft:0,
            navData: [],//导航栏数据
            categoryId:'',
            currentNav: {},//当前导航
            nowIndex: 0,//正选中的标签
            goodsList: [],//商品列表
        }
    },
    mounted(){
        // 获取页面传递的参数
        this.categoryId = this.$root.$mp.query.id
        this.getAllData()
    },
    methods:{
        async getAllData(){
            const data = await get('/category/categorynav',{
                categoryId: this.categoryId
            })
            //console.log(data)
            this.navData = data.navData
            this.currentNav = data.currentNav
            for(let i=0;i<this.navData.length;i++){
                const id = this.navData[i].id//获取类别id
                if(id==this.currentNav.id){
                    this.nowIndex=i
                }
            }

            // 获取标签下的商品列表
            const listData = await get('/goods/goodslist',{
                categoryId: this.categoryId
            })
            console.log(listData)
            this.goodsList = listData.data
        },
        // 查看商品详情
        toDetail(id){
            wx.navigateTo({
                url: '/pages/goods/main?id=' + id
            });
        },
        // 切换标签
        async changeTab(index,id){
            this.nowIndex = index
            // 获取标签下的商品列表
            const listData = await get('/goods/goodslist',{
                categoryId: id
            })
            this.goodsList = listData.data
            this.currentNav = listData.currentNav
            // 让标签滚到可见区域
            if(this.nowIndex>4){
                this.scrollLeft = this.nowIndex* 60
            }else{
                this.scrollLeft = 0
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>