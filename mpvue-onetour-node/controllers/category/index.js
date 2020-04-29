const {mysql} = require('../../configs/mysql')  

// 获取分类导航栏
async function categoryNav(ctx){
    const categoryId = ctx.query.categoryId
    // 获取分类
    const currentNav = await mysql('tour_category').where({
        'id': categoryId
    }).select()
    // 获取他的同类
    const navData = await mysql('tour_category').where({
        'parent_id': currentNav[0].parent_id
    }).select()

    ctx.body={
        navData,
        currentNav: currentNav[0]
    }

}

module.exports ={
    categoryNav
}