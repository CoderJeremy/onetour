function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 请求封装
// 接口前缀
const host = "http://localhost:8080/onetour"
export {host};
// 封装wx.request请求
function request (url, method,data,header={}){
  wx.showLoading({
    title: "加载中..."
  });
  return new Promise((resolve,reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        "content-type":"application/json"
      },
      success (res){
        wx.hideLoading();
        resolve(res.data)
      },
      fail(err){
        wx.hideLoading();
        reject(err)
      },
      complete(){
        wx.hideLoading();
      }
    })
  })
}

// 封装get
export function get(url,data){
  return request(url,'GET',data)
}

// 封装post
export function post(url,data){
  return request(url,'POST',data)
}

// 封装openId获取方法
export function getStorageOpenId(){
  const openId = wx.getStorageSync('openId')
  if(openId){
    return openId
  }else{
    return ''
  }
};

// 判断用户是否登录
export function login(){
  const userInfo = wx.getStorageSync('userInfo')
  if(userInfo){
    return userInfo
  }
}
export function toLogin(){
    const userInfo = wx.getStorageSync('userInfo')
    if(!userInfo){
      wx.navigateTo({
        url: '/pages/login/main',
      });
    }else{
      return true
    }
}

export default {
  formatNumber,
  formatTime,
  getStorageOpenId
}
