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

// 获取订单资料
async function detailAction(ctx){
    const openId = ctx.query.openId
    const addressId = ctx.query.addressId || ''
    const orderDetail = await mysql('tour_order').where({
        'user_id': openId
    }).select()
    
    // 查询订单中的商品id
    var goodsIds = orderDetail[0].goods_id.split(',')

    // 在购物车中查询商品
    const list = await mysql('tour_cart').andWhere({
        'user_id': openId
    }).whereIn('goods_id',goodsIds).select()

    // 收货地址
    var addressList;
    if(addressId){
        addressList = await mysql('tour_address').where({
            'user_id': openId,
            'id': addressId
        }).orderBy('is_default','desc').select()
    }else{
        addressList = await mysql('tour_address').where({
            'user_id': openId,
        }).orderBy('is_default','desc').select()
    }
    ctx.body={
        price: orderDetail[0].allprice,
        goodsList: list,
        address: addressList[0]||{}
    }
}

module.exports = {
    submitAction,
    detailAction
}
