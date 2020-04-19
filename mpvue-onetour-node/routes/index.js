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

router.get('/index/index', controllers.home.index)

module.exports = router