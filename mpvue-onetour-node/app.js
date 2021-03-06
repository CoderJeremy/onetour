const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const config = require('./configs/config')
const router = require('./routes')

// 解析请求体
app.use(bodyParser())

app.use(router.routes())

app.listen(config.port, () => {
    console.log(`server is started at port ${config.port}`)
})
