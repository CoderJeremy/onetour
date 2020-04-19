const Koa = require('koa')
const config = require('./configs/config')
const app = new Koa()

const router = require('./routes')

// router.get('/index',(ctx,next)=>{
//     ctx.body = 'hello world'
// })

app.use(router.routes())

app.listen(config.port, () => {
    console.log(`server is started at port ${config.port}`)
})
