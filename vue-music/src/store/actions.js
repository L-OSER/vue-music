import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch} from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  // SET_SEQUENCE_LIST歌曲列表
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    // SET_PLAYLIST 正在播放的歌曲列表。可以做处理的，比如随机
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

// 插播歌曲
export const insertSong = function ({commit, state}, song) {
  // 直接拷贝playlist,不要直接修改state
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  //  记录当前歌曲
  let currentSong = playlist[currentIndex]

  // 查找列表中是否有带插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为插入歌曲,所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
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

  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
