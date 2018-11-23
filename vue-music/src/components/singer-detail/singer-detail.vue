<template>
  <transition name="slide">
  <!--<div class="singer-detail"></div>-->
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail, getMusic} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: [],
      retlist: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
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
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"

.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
