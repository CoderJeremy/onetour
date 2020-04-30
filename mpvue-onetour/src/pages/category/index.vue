<template>
  <div class="category">
      <div class="search" @click="tosearch">
          <div class="ser">
              <span class="icon"></span>
              <span>你想去哪儿？</span>
          </div>
      </div>
      <div class="content">
          <scroll-view class="left" scroll-y="true">
              <div class="iconText" @click="selectItem(item.id,index)" v-for="(item,index) in categoryList" :key="index" :class="[index === nowIndex?'active':'']">
                  {{item.name}}
              </div>
          </scroll-view>

          <scroll-view class="right" scroll-y="true">
              <div class="banner">
                  <img :src="detailData.banner_url" alt="">
              </div>
              <div class="title">
                  <span>-</span>
                  <span>{{detailData.name}}分类</span>
                  <span>-</span>
              </div>
              <div class="bottom">
                  <div class="item" v-for="(item,index) in detailData.subList" :key="index" @click="toCategory(item.id)">
                      <img :src="item.wap_banner_url" alt="">
                      <span>{{item.name}}</span>
                  </div>
              </div>
          </scroll-view>
      </div>
  </div>
</template>

<script>
import {get} from '../../utils'
export default {
    data(){
        return{
            nowIndex:0,
            categoryList:[],
            categoryId: '1005000',
            detailData:{}
        }
    },
    mounted(){
        this.getCategoryList()
        this.selectItem(this.categoryId,this.nowIndex)
    },
    methods:{
        // 跳转搜索页面
        tosearch(){
            wx.navigateTo({
                url: '/pages/search/main',
            });
        },
        // 获取数据
        async getCategoryList(){
            const data = await get('/category/indexaction')
            // console.log(data)
            this.categoryList = data.categoryList
        },
        // 获取右边商品的数据
        async selectItem(id,index){
            this.nowIndex = index
            const data = await get('/category/currentaction',{
                categoryId: id
            })
            console.log(data)
            this.detailData = data.data.currentOne
        },
        //跳转类别详情
        toCategory(id){
            wx.navigateTo({
                url: '/pages/categorylist/main?id=' + id
            });
        }
    }

}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>