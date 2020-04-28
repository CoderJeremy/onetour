<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="省份、城市、区县" v-model="address">
      </picker>
    </div>
    <div class="item">
      <input type="text" placeholder="详细地址，如楼道、楼盘号等" v-model="detailaddress">
    </div>

    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#b4282d"></checkbox>
          设置为默认地址
        </label>
      </checkbox-group>
      <div @click="wxaddress">一键导入微信</div>
    </div>

    <div class="bottom" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import { get, post, getStorageOpenId } from "../../utils";
export default {
  data () {
    return {
      userName: '',
      telNumber: '',
      region: [],
      customItem: '请选择',
      address: '',
      detailaddress: '',
      checked: false,//默认地址勾选
      openId: '',
      res: '',//上个页面传入数据
      id: ''//地址id
    }
  },
  mounted() {
    this.openId = getStorageOpenId()
    // 判断上一个页面是否带参数
    // 导入
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res))
      //console.log(this.res, '------')
      this.userName = this.res.userName
      this.telNumber = this.res.telNumber
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`
      this.detailaddress = this.res.detailInfo
    }
    if (this.$root.$mp.query.id) {
      this.id = this.$root.$mp.query.id
      this.getDetail()
       //获取详细地址 进行修改
    }
  },
  methods: {
    async getDetail () {
      const data = await get('/address/detailaction', {
        id: this.id
      })
      console.log(data)
      let detail = data.data//获取详细地址 进行修改
      this.userName = detail.name
      this.telNumber = detail.mobile
      this.address = detail.address
      this.detailaddress = detail.address_detail
      this.checked = detail.is_default === 1 ? true : false
    },
    // 绑定点击事件
    checkboxChange (e) {
      this.checked = e.mp.detail.value[0]
    },
    // 事件改变 取值
    bindRegionChange (e) {
      //console.log(e)
      let value = e.mp.detail.value
      this.address = `${value[0]} ${value[1]} ${value[2]}`
    },
    // 导入微信默认地址
    wxaddress () {
      wx.chooseAddress({
        success: (result) => {
          //console.log(result)
          this.userName = result.userName
          this.telNumber = result.telNumber
          this.address = `${result.provinceName} ${result.cityName} ${result.countyName}`
          this.detailaddress = result.detailInfo
        },
        fail: () => {},
        complete: () => {}
      });
        
    },
    // 保存地址
    async saveAddress () {
      const data = await post('/address/saveaction', {
        userName: this.userName,
        telNumber: this.telNumber,
        address: this.address,
        detailaddress: this.detailaddress,
        checked: this.checked,
        openId: this.openId,
        addressId: this.id
      })
      //console.log(data)
      if (data.data) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000,
          mask: true,
          success: (result) => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          },
          fail: () => {},
          complete: () => {}
        });
          
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>