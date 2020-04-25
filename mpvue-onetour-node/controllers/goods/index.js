const {mysql} = require('../../configs/mysql')  

// 商品详情页数据
async function detailAction(ctx){
    const goodsId = ctx.query.goodsId
    const openId = ctx.query.openId
    // 商品信息
    const goodsInfo = await mysql('tour_goods').where({
        'id': goodsId
    }).select()
    // 获取商品的图片
    const gallery = await mysql('tour_goods_gallery').where({
        'goods_id': goodsId
    })
    // console.log(goodsInfo[0].category_id)
    // 国家商品信息查询商品分类
    const category = await mysql('tour_category').where({
        'id': goodsInfo[0].category_id
    }).select()

    ctx.body ={
        'goodsInfo': goodsInfo[0] || [],
        'gallery': gallery,
        'category': category[0]
    }
}

module.exports ={
    detailAction
}