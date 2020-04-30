// 引入mysql
const { mysql } = require('../../configs/mysql')

// 获取专题列表数据
async function listAction(ctx){
    let page = ctx.query.page || 1
    const size = 4
    // 分页处理
    const data = await mysql('tour_topic').column('id','title','price_info','subtitle','scene_pic_url').limit(size).offset((page-1) * size)
    const data1 = await mysql('tour_topic').column('id','title','price_info','subtitle','scene_pic_url').select()
    const total = parseInt(data1.length % 4)//总页数
    ctx.body={
        'page': page,
        'total': total,
        'data': data
    }
}
// 获取专题内容详情
async function detailAction(ctx){
    const id = ctx.query.id
    let data = [];
    if(id){
        data = await mysql('tour_topic').where({
            'id': id
        }).select()
    }
    ctx.body={
        'data': data[0],
    }
}

module.exports ={
    listAction,
    detailAction
}