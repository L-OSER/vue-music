<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {getMusic} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
      }
      // 请求推荐歌单里的歌曲列表,推荐歌单dissid
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        // let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          getMusic(musicData.songmid).then((res) => {
            const svley = res.data.items[0]
            const songVkey = svley['vkey']
            ret.push(createSong(musicData, songVkey))
          })
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
