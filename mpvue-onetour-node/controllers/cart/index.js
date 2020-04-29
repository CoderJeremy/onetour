// 购物车
const {mysql} = require('../../configs/mysql')  

// 加入购物车
async function addCart(ctx){
    const{openId, goodsId,number} = ctx.request.body

    // 判断当前商品是否已经存在 存在只增加数量 ,不存在增加商品数据
    const oldNumber = await mysql('tour_cart').where({
        'user_id': openId,
        'goods_id': goodsId
    }).column('number').select()

    // 不存在
    if(oldNumber.length === 0){
         const goods = await mysql('tour_goods').where({
             'id': goodsId
         }).select()
         const { retail_price, name, list_pic_url } = goods[0]
        // 如果不存在
        await mysql('tour_cart').insert({
            'user_id':openId,
            'goods_id': goodsId,
            number,
            'goods_name':name,
            retail_price,
            list_pic_url
        })
    }else{
        // 更新数据
        await mysql('tour_cart').where({
            'user_id':openId,
            'goods_id': goodsId
        }).update({
            'number': oldNumber[0].number+number
        })
    }

    ctx.body={
        data: 'success'
    }
}

// 获取购物车列表
async function cartList(ctx){
    const openId = ctx.query.openId
    
    const cartList = await mysql('tour_cart').where({
        'user_id': openId
    }).select()
    ctx.body={
        data: cartList
    }

}

module.exports = {
    addCart,
    cartList
}