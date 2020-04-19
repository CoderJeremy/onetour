import Vue from 'vue'
import App from './index'
// 将index.vue页面引入到main.js文件中并挂载
const app = new Vue(App)
app.$mount()

// 下拉刷新
export default{
    config: {
        enablePullDownRefresh: true
    }
}