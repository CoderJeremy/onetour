// 话题精选详情页面
<template>
  <div class="topicdetail">
      <div class="content">
          <div class="detail">
              <wxParse :content="goods_desc"/>
          </div>
      </div>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
import { get } from '../../utils'
export default {
    components: {
        wxParse
    },
    data () {
        return {
        goods_desc: '',
        id: '',
        }
    },
    mounted () {
        this.id = this.$root.$mp.query.id
        this.getListData()
    },
    methods: {
        async getListData () {
        const data = await get('/topic/detailaction', {
            id: this.id
        })
        console.log(data)
            this.goods_desc = data.data.content
        }
    }
}
</script>

<style>

</style>