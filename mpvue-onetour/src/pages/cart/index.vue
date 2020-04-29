<template>
  <div class="cart">
      <div class="top">
          <div>无需计划</div>
          <div>全程指导</div>
          <div>在线沟通</div>
      </div>
      <div class="cartlist">
          <div class="item" v-for="(item,index) in listData" :key="index">
              <div class="con">
                  <div class="left">
                      <div class="icon" @click="changeColor(index,item.goods_id)" :class="[listids[index] ? 'active':'']"></div>
                      <div class="img">
                          <img :src="item.list_pic_url" alt="">
                      </div>
                      <div class="info"  @click="toDetail(item.goods_id)">
                          <p>￥{{item.retail_price}}</p>
                      </div>
                  </div>
                  <div class="right">
                      <div class="num">x {{item.number}}</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="fixed">
          <div class="left" @click="allCheck" :class="{'active': isallcheck}">
              全选({{isCheckedNumber}})
          </div>
          <div class="right">
              <div>￥{{allPrice}}</div>
              <div @click="orderDown">下单</div>
          </div>
      </div>

  </div>
</template>

<script>
import { get, post, getStorageOpenId } from "../../utils";
export default {
    data(){
        return{
            openId:'',
            listData: [],
            listids:[],//被选中的商品id
            isallcheck: false,
        }
    },
    onShow(){
        this.openId = getStorageOpenId()
        this.getListData()
    },
    methods:{
        async getListData(){
            const data = await get('/cart/cartlist',{
                openId: this.openId
            })
            console.log(data)
            this.listData = data.data
        },
        // 单击选中 当单选全选 自动变全选
        changeColor(index, id){
            if(this.listids[index]){
                this.$set(this.listids, index, false)
            }else{
                this.$set(this.listids,index,id)
            }
        },
        // 全选
        allCheck(){
            // 先清空选择
            this.listids = []
            if(this.isallcheck){
                this.isallcheck = false
            }else{
                this.isallcheck = true
                // 全选
                for(let i=0;i<this.listData.length;i++){
                    const element = this.listData[i]
                    this.listids.push(element.goods_id)
                }
            }


        },
        // 下单
        async orderDown(){
            if(this.listids.length == 0){
                wx.showToast({
                    title: '请先选择商品',
                    icon: 'none',
                    duration: 1500,
                })
                return false
            }
            let newgoodsid = []//要下单的商品 去除数组中空的false
            for(let i=0;i<this.listids.length;i++){
                const element = this.listids[i]
                if(element){
                    newgoodsid.push(element)
                }
            }
            let goodsId = newgoodsid.join(',')
            const data = await post('/order/submitaction',{
                goodsId: goodsId,
                openId: this.openId,
                allPrice: this.allPrice
            })
            console.log(data)
            if(data){
                wx.navigateTo({
                    url: '/pages/order/main'
                });
            }
        },
        // 跳转商品详情
       toDetail (id) {
            wx.navigateTo({
                url: '/pages/goods/main?id=' + id
            });
        }
    },
    // 计算属性
    computed:{
        isCheckedNumber(){
            let number = 0
            for(let i=0;i<this.listids.length;i++){
                if(this.listids[i]){
                    number++
                }
            }
            // 已经全部勾选中
            if(number==this.listData.length && number!==0){
                this.isallcheck = true
            }else{
                this.isallcheck = false
            }
            return number
        },
        // 总价
        allPrice(){
            let Price = 0
            for(let i=0; i<this.listids.length;i++){
                if(this.listids[i]){
                    Price += this.listData[i].retail_price * this.listData[i].number
                }
            }
            return Price
        }
    }

}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>