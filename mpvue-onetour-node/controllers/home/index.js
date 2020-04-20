const { mysql } = require('../../configs/mysql')

module.exports =  async (ctx) => {
    // 轮播图数据
    const banner = await mysql('tour_ad').where({
        ad_position_id: 1
    }).select()

    // channel类型
    const channel = await mysql('tour_channel').select()

    // hotcountry热门国家 只要排名前4 sort_order
    const hotcountryList = await mysql('tour_country').where({
        is_new: 1
    }).orderBy('new_sort_order','asc').limit(4).select()
    
    // newGoods 新品首发 
    //const newGoods = await mysql('tour_goods').whereIn('id',[1181000, 1135002, 1134030, 1134032, 1006002]).andWhere('is_new',1).select()
    const newGoods = await mysql('tour_goods').where('is_new',1).limit(5).select();
    

    // hotGoods 热门单品
    const hotGoods = await mysql('tour_goods').column('id','name','list_pic_url','retail_price','goods_brief').where({
        is_hot: 1
    }).limit(5).select()

    // topicList专题精选列表
    const topicList = await mysql('tour_topic').limit(3).select()

    // newCategoryList 类别列表
        // is_categoryList 存放 要展示的类别
    const is_categoryList = await mysql('tour_category').where({
        parent_id: 0
    }).select()
    
    //存放根据类别展示的商品列表        
    const newCategoryList = [] 
    // 根据父id进行分类
    for(let i = 0;i<is_categoryList.length;i++){
        let item = is_categoryList[i]
        let childCategoryIds = await mysql('tour_category').where({
            parent_id: item.id
        }).column('id').select()
            // 存入数组 [10122,12333]
        childCategoryIds = childCategoryIds.map((item) => {
            return item.id
        })
        // 在商品表中找到childCategoryIds里类别相对应的数据
        const categoryGoods = await mysql('tour_goods').column('id','name','list_pic_url','retail_price').whereIn('category_id',childCategoryIds).limit(3).select()
        newCategoryList.push({
            'id':item.id,
            'name':item.name,
            'goodsList':categoryGoods
        })
    }

    ctx.body = {
        'banner': banner,
        'channel': channel,
        'hotcountryList': hotcountryList,
        'newGoods': newGoods,
        'hotGoods': hotGoods,
        'topicList': topicList,
        'newCategoryList':newCategoryList
    }
}