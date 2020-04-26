const {mysql} = require('../../configs/mysql')  

// 添加收藏
async function addCollect(ctx){
    const {openId, goodsId} = ctx.request.body
    console.log(openId,goodsId)
    // 判断 当前用户 是否已经 收藏该商品
    const iscollect = await mysql('tour_collect').where({
        'user_id':openId,
        'goods_id': goodsId
    }).select()
    // 未收藏 加入收藏
    if(iscollect.length==0){
        await mysql('tour_collect').insert({
            'user_id':openId,
            'goods_id': goodsId  
        })
        ctx.body={
            data: 'collected'
        }
    }else{
        await mysql('tour_collect').insert({
            'user_id':openId,
            'goods_id': goodsId  
        }).del()
        
        ctx.body={
            data: 'uncollected'
        }
    }

}

module.exports={
    addCollect
}