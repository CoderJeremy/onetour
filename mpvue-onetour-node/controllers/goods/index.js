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

    // 商品详情参数
    // 关联查询两张表 
    const attribute = await mysql('tour_goods_attribute')
    .column('tour_goods_attribute.value','tour_attribute.name')
    .leftJoin('tour_attribute','tour_goods_attribute.attribute_id','tour_attribute.id')
    .where({
        'tour_goods_attribute.goods_id': goodsId
    }).select()

    // 常见问题
    const issueList = await mysql('tour_goods_issue').where({
        'goods_id': goodsId
    }).select()

    // 大家都在看商品列表 productList
    const productList = await mysql('tour_goods').where({
        'category_id': goodsInfo[0].category_id
    }).select()


    // 判断该商品是否已经收藏
    const iscollect = await mysql("tour_collect").where({
        'user_id':openId,
        'goods_id':goodsId
    }).select()
    let collectFlag = false
    if(iscollect.length>0){
        collectFlag=true
    }

    // 购物车商品总数 已经标记tag为1 这样设计可以计算总数
    // 判断该用户购物车是否含有当前商品
    const oldSum = await mysql('tour_cart').where({
        'user_id': openId
    }).column('number').select()
    let allSum = 0
    if(oldSum.length>0){
        for(let i=0;i<oldSum.length;i++){
            const element = oldSum[i]
            allSum += element.number
        }
    }


    ctx.body ={
        'goodsInfo': goodsInfo[0] || [],
        'gallery': gallery,
        'category': category[0],
        'attribute': attribute,
        'issueList': issueList,
        'productList': productList,
        'collectFlag': collectFlag,
        'sumGoods': allSum
    }
}

module.exports ={
    detailAction
}