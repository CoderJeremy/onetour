// 订单
const { mysql } = require('../../configs/mysql')

async function submitAction(ctx){
    const {openId} = ctx.request.body
    let goodsId = ctx.request.body.goodsId
    let allPrice = ctx.request.body.allPrice

    // 判断是否存在订单
    const isOrder = await mysql('tour_order').where({
        'user_id': openId
    }).select()
    // 订单已存在
    if(isOrder.length>0){
        // 订单已存在 更新订单
        const data = await mysql('tour_order').where({
            'user_id':openId
        }).update({
            'user_id': openId,
            'goods_id': goodsId,
            'allprice': allPrice
        })
        if(data){
            ctx.body ={
                data : true
            }
        }else{
            ctx.body={
                data : false
            }
        }
    }else{
        const data = await mysql('tour_order').where({
            'user_i': openId,
            'goods_id': goodsId,
            'allprice': allPrice
        })
        if(data){
            ctx.body ={
                data : true
            }
        }else{
            ctx.body={
                data : false
            }
        }
    }
}

module.exports = {
    submitAction
}
