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

// 分类相关的接口
router.get('/category/categorynav',controllers.category.index.categoryNav)

// 搜索相关的接口
router.get('/search/indexaction',controllers.search.index.indexAction)// 获取搜索历史数据
router.post('/search/addhistoryaction',controllers.search.index.addHistroyAction)//添加历史记录
router.post('/search/clearhistoryAction',controllers.search.index.clearHistoryAction)//清除历史记录
router.get('/search/helperaction',controllers.search.index.helperAction)//实时查询输入内容

// 商品详情页面接口
router.get('/goods/detailaction',controllers.goods.index.detailAction)//实时查询输入内容
router.get('/goods/goodslist',controllers.goods.index.goodsList) //获取商品列表

// 收藏相关的接口
router.post('/collect/addcollect',controllers.collect.index.addCollect)//实时查询输入内容

// 订单相关的接口
router.post('/order/submitaction',controllers.order.index.submitAction)//实时查询输入内容
router.get('/order/detailaction',controllers.order.index.detailAction)//获取订单详情

// 购物车相关的接口
router.post('/cart/addcart',controllers.cart.index.addCart)
router.get('/cart/cartlist',controllers.cart.index.cartList)

// 地址相关的接口
router.get('/address/getlistaction',controllers.address.index.getListAction)//获取地址列表
router.get('/address/detailaction',controllers.address.index.detailAction)//读取数据库中的地址信息
router.post('/address/saveaction',controllers.address.index.saveAction)//保存地址

module.exports = router

