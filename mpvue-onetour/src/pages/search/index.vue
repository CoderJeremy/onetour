<template>
  <!-- 搜索栏 -->
  <div class="search">
    <div class="head">
      <div>
        <img src="../../../static/images/search.png" alt="">
        <input type="text" confirm-type="search" focus="true" v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="景点搜索">
        <img @click="clearInput" class="del" src="../../../static/images/search_x.png" alt="">
      </div>
      <div @click="cancel">取消</div>
    </div>
    <!-- 搜索提示 -->
    <div class="searchtips" v-if="words">
      <div v-if="tipsData.length != 0">
        <div v-for="(item, index) in tipsData" :key="index" @click="searchWords" :data-value="item.name">
          {{item.name}}
        </div>
      </div>
      <!-- 数据未找到 -->
      <div class="nogoods" v-else>数据库暂无此类商品...</div>
    </div>

    <!-- 搜索历史记录 -->
    <div class="history" v-if="historyData.length!==0">
      <div class="t">
        <div>历史记录</div>
        <!-- 清除历史记录 -->
        <div @click="clearHistory"></div>
      </div>
      <div class="cont">
        <div v-for="(item, index) in historyData" :key="index" @click="searchWords" :data-value="item.keyword">
          {{item.keyword}}
        </div>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div v-for="(item, index) in hotData" :key="index" :class="{active: item.is_hot === 1}" @click="searchWords" :data-value="item.keyword">
          {{item.keyword}}
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="goodsList" v-if="listData.length!==0">
      <!-- 导航栏 -->
      <div class="sortnav">
        <div @click="changeTab(0)" :class="[0 === nowIndex ? 'active' : '']">综合</div>
        <div @click="changeTab(1)" :class="[1 === nowIndex ? 'active' : '']" class="price">价格</div>
        <div @click="changeTab(2)" :class="[2 === nowIndex ? 'active' : '']">分类</div>
      </div>
      <!-- 搜索结果 -->
      <div class="sortlist">
        <div @click="goodsDetail(item.id)" class="item" v-for="(item, index) in listData" :key="index">
          <img :src="item.list_pic_url" alt="">
          <p class="name">{{item.name}}</p>
          <p class="price">¥{{item.retail_price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from '../../utils'
export default {
  data () {
    return {
      words: '',
      openid: '',
      hotData: [],
      historyData: [],
      tipsData: [],
      order: '',
      listData: [],
      nowIndex: 0
    }
  },
  mounted () {
    this.openid = wx.getStorageSync('openId') || '';
    this.getHotData()
  },
  methods: {
    // 点击X 清除输入记录
    clearInput() {
      this.words = ''
      this.listData = []
    },

    // 取消按钮 跳转上一页
    cancel() {
      wx.navigateBack({
        delta: 1
      })
    },

    // 清除历史记录
    async clearHistory() {
      const data = await post('/search/clearhistoryAction', {
        openId: this.openid
      })
      // 返回数据为null，直接设置数组为空，不用再返回查询数据库

      if (data) {
        this.historyData = []
      }
    },

    // 聚焦方法 清除商品
    inputFocus() {
      // 商品清空
      this.listData = []
      // 展示搜索提示信息
      this.tipsearch()
    },

    // 实时请求， 输入查询
    async tipsearch() {
      const data = await get('/search/helperaction', {
        keyword: this.words
      })
      this.tipsData = data.keywords
    },

    // 关键词搜索
    async searchWords(e) {
      let value = e.currentTarget.dataset.value
      this.words = value || this.words
      const data = await post('/search/addhistoryaction', {
        openId: this.openid,
        keyword: value || this.words
      })
      // console.log(data)
      // 获取历史数据
      this.getHotData()
      this.getlistData()
    },

    // 获取热门数据
    async getHotData (first) {
      const data = await get('/search/indexaction?openId=' + this.openid)
      this.historyData = data.historyData
      this.hotData = data.hotKeywordList
      // console.log(data)
    },

    // 获取商品列表列表数据
    async getlistData () {
      const data  = await get('/search/helperaction', {
        keyword: this.words,
        order: this.order
      })
      this.listData = data.keywords
      this.tipsData = []
      //console.log(data)
    },

    // 切换商品列表标签bar
    changeTab(index) {
      this.nowIndex = index
      if (index === 1) {
        this.order = this.order == 'asc' ? 'desc' : 'asc'
      } else {
        this.order = ''
      }
      // 重新请求数据
      this.getlistData()
    },

    // 商品详细 跳转到商品详情页面
    goodsDetail (id) {
      wx.navigateTo({
        url: '/pages/goods/main?id=' + id
      });
    }
  }
}
</script>

<style lang='less' scoped>
@import './style';
</style>