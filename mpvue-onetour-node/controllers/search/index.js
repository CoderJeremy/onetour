// 引入mysql
const { mysql } = require('../../configs/mysql')


// 获取搜索历史数据indexaction
async function indexAction(ctx){
    const openId = ctx.query.openId
    // 默认关键字
    const defaultKeyword = await mysql('tour_keywords').where({
        is_default: 1
    }).limit(1).select()
    // 热门关键字
    const hotKeywordList = await mysql('tour_keywords').distinct('keyword').column('keyword','is_hot').limit(10).select()

    const historyData = await mysql('tour_search_history').where({
        'user_id': openId
    }).limit(10).select()
    ctx.body = {
        'defaultKeyword': defaultKeyword[0],
        'hotKeywordList': hotKeywordList,
        'historyData': historyData
    }
}

// 添加搜索历史addhitoryaction
async function addHistroyAction(ctx){
    const {openId, keyword} = ctx.request.body
    
    // 已存在的搜索历史
    const oldData = await mysql('tour_search_history').where({
        'user_id': openId,
        'keyword': keyword
    })
    // 判断记录是否存在  不存在 插入新数据
    if(oldData.length == 0){
        const data = await mysql('tour_search_history').insert({
            'user_id': openId,
            'keyword': keyword,
            'add_time': parseInt(new Date().getTime() / 1000)
        })
        if(data){
            ctx.body = {
                data:'success'
            }
        }else{
            ctx.body = {
                data:'fail'
            }
        }
    }else{
        ctx.body={
            data: '数据已存在'
        }
    }
}

// 清除历史记录clearHistoryAction  post用request get用query
async function clearHistoryAction(ctx){
    const openId = ctx.request.body.openId
    const data = await mysql('tour_search_history').where({
        'user_id': openId
    }).del()
    if(data){
        ctx.body={
            'data':'清除成功'
        }
    }else{
        ctx.body={
            'data': 'null'
        }
    }
    
}

// 搜索时匹配相关的内容 helperAction
async function helperAction(ctx){
    const keyword = ctx.query.keyword
    var order = ctx.query.order
    if(!order){
        order = ''
        orderBy = 'id'
    }else{
        orderBy = 'retail_price'
    }
    const keywords = await mysql('tour_goods').orderBy(orderBy, order)
    .column('id','name','list_pic_url','retail_price')
    .where('name','like','%'+keyword+'%').limit(10).select()
    if(keywords){
        ctx.body={
            keywords
        }
    }else{
        ctx.body={
            keywords: []
        }
    }
}


module.exports={
    indexAction,
    addHistroyAction,
    clearHistoryAction,
    helperAction
}
