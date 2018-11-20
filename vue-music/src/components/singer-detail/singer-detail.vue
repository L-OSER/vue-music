<template>
  <transition name="slide">
  <div class="singer-detail"></div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail, getMusic} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  data() {
    return {
      songs: [],
      retlist: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail()
    console.log(this.singer)
  },
  methods: {
    _getDetail() {
      // 如果在详情页刷新
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      // console.log(list)
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          getMusic(musicData.songmid).then((res) => {
            const svley = res.data.items[0]
            const songVkey = svley['vkey']
            this.retlist.push(createSong(musicData, songVkey))
          })
        }
      })
      return this.retlist
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"

.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background

.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
