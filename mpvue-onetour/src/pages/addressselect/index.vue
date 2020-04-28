// 地址选择
<template>
    <div class="address">
        <scroll-view scroll-y="true" class="addcont" style="height: 100%">
            <div class="item" v-if="listData.length!==0">
                <div class="list" v-for="(item,index) in listData" :key="index">
                    <div class="addresslist">
                        <div>
                            <span>{{item.name}}</span>
                            <div class="moren" v-if="item.is_default">默认</div>
                        </div>
                        <!-- 选择新地址 -->
                        <div class="info" @click="selAddress(item.id)">
                            <p>{{item.mobile}}</p>
                            <p>{{item.address+item.address_detail}}</p>
                        </div>
                        <div @click="toDetail(item.id)"></div>
                    </div>
                </div>
            </div>
            <!-- 没有地址时 -->
            <div class="center" v-else>
                <p>收货地址在哪里？</p>
            </div>
        </scroll-view>



        <div class="bottom">
            <div @click="wxaddress(1)">+新建地址</div>
            <div @click="wxaddress">一键导入微信地址</div>
        </div>
    </div>
</template>

<script>
import {get, getStorageOpenId} from '../../utils'
export default {
    data(){
        return{
            listData: [],
            openId:'',
            id:''
        }
    },
    onShow(){
        this.openId = getStorageOpenId()
        this.getAddressList()
    },
    methods:{
        // 展示地址详情
        toDetail(id){
            wx.navigateTo({
                url: '/pages/addresslist/main?id='+id,
            });  
        },
        wxaddress(index){
            if(index===1){
                wx.navigateTo({
                    url: '/pages/addresslist/main',
                });
            }else{
                wx.chooseAddress({
                    success: function(res){
                        var result = encodeURIComponent(JSON.stringify(res))
                        //console.log(res)
                        wx.navigateTo({
                            url: '/pages/addresslist/main?res=' + result,
                        })
                    },
                });
            }
        },
        async getAddressList(){
            let that = this
            const data = await get('/address/getlistaction',{
                openId: that.openId
            })
            console.log(data)
            that.listData = data.data
        },
        // 更换地址
        selAddress(id){
            wx.setStorageSync('addressId',id)
            wx.navigateBack({
                delta: 1
            });
        }
    }
}
</script>

<style lang="less" scoped>
// 引入样式文件
@import "./style.less";
</style>