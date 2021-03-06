import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.data.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.data.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

// export function createSong(musicData) {
//   return new Song({
//     id: musicData.songid,
//     mid: musicData.songmid,
//     singer: filterSinger(musicData.singer),
//     name: musicData.songname,
//     album: musicData.albumname,
//     duration: musicData.interval,
//     image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
//     url: `http://14.29.117.14/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=309651137&vkey=C4F8CE1C5BDCEE8EA15B932813D7D4E4E4CD2138ACF8E1D3171DB78452E779E12C1CEE2577B5EF7F2A0AD9F9F88D34E7DA0327C0B12EDD52&uin=0&fromtag=66`
//   })
// }

export function createSong(musicData, songVkey, type) {
  if (type === 'search') {
    return new Song({
      id: musicData.id,
      mid: musicData.mid,
      singer: filterSinger(musicData.singer),
      name: musicData.name,
      album: musicData.album,
      duration: musicData.duration,
      image: musicData.image,
      url: `http://dl.stream.qqmusic.qq.com/C400${musicData.mid}.m4a?vkey=${songVkey}&guid=309651137&uin=0&fromtag=66`
    })
  }
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${songVkey}&guid=309651137&uin=0&fromtag=66`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  if (singer.constructor === Array) {
    singer.forEach((s) => {
      ret.push(s.name)
    })
    return ret.join('/')
  }
  return singer
}
