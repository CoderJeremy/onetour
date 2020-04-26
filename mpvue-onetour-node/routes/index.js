// koa路由
const router = require('koa-router')({
    prefix:'/onetour'
})

// 控制器
// const controllers = require('../controllers/home/index')

// router.get('/index/index', controllers)


// router.get('/index/index',(ctx,next) => {
//     ctx.body = 'hello world'
//     // 从数据库获取数据返回给前端
// })

const controllers = require('../controllers/index')

// 首页相关的接口
router.get('/index/index', controllers.home.index)

// 搜索相关的接口
router.get('/search/indexaction',controllers.search.index.indexAction)// 获取搜索历史数据
router.post('/search/addhistoryaction',controllers.search.index.addHistroyAction)//添加历史记录
router.post('/search/clearhistoryAction',controllers.search.index.clearHistoryAction)//清除历史记录
router.get('/search/helperaction',controllers.search.index.helperAction)//实时查询输入内容

// 商品详情页面接口
router.get('/goods/detailaction',controllers.goods.index.detailAction)//实时查询输入内容
// 收藏相关的接口
router.post('/collect/addcollect',controllers.collect.index.addCollect)//实时查询输入内容
// 订单相关的接口
router.post('/order/submitaction',controllers.order.index.submitAction)//实时查询输入内容

// 购物车相关的接口
router.post('/cart/addcart',controllers.cart.index.addCart)
module.exports = router

