import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  // console.log(commit) commit actions提交的方法
  // console.log(state)   状态
  // console.log(list)    传入的数组对象
  // console.log(index)   传入的索引值
}
/*
var a = {commit: 1, state: 2}, b = {list: 3, index: 4}
const selectPlay = function ({commit, state}, {list, index}) {
  console.log(commit, state, list, index)
}
selectPlay(a, b) // 1,2,3,4
*/
// 随机播放
export const randomPlay = function (commit, list) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  // 随机方法
  let randomList = shuffle((list))
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist
  let sequenceList = state.sequenceList
  let currentIndex = state.currentIndex
  //  记录当前歌曲
  let currentSong = playlist[currentIndex]

  // 查找列表中是否有带插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为插入歌曲,所以索引+1
  currentIndex++
  // 在当前索引的下一个插入一条歌
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
}
