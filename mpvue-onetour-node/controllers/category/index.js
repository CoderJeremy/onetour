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

// 分类页面
async function indexAction(ctx){
    const categoryId = ctx.query.categoryId
    const categoryList = await mysql('tour_category').where({
        'parent_id':0
    }).select()
    const currentCategory = []

    if(categoryId){
        currentCategory =  await mysql('tour_category').where({
            'parent_id': categoryId
        }).select()
    }

    ctx.body={
        'categoryList': categoryList
    }
}

// 点击左侧菜单获取的分类商品
async function currentAction(ctx) {
    const categoryId = ctx.query.categoryId
    const data =  {}
    const currentOne = await mysql('tour_category').where({
      'id': categoryId
    }).select()
    const subList = await mysql('tour_category').where({
      'parent_id': currentOne[0].id
    }).select()
    data.currentOne = currentOne[0]
    data.currentOne.subList = subList
  
    ctx.body = {
      'data': data
    }
}

module.exports ={
    categoryNav,
    indexAction,
    currentAction
}