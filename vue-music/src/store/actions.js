import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'

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

export const deleteSearchHistory = function ({commit}, query) {
  // deleteSearch 删除指定历史记录,并返回新的数组存储本地缓存
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 清缓存
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
// 删除歌曲
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 查找playlist歌曲的索引
  let pIndex = findIndex(playlist, song)
  // 找到后删掉
  playlist.splice(pIndex, 1)

  // 查找sequenceList歌曲的索引,然后删掉
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  // 如果当前播放的歌曲的索引在删除歌曲的索引之后
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  // 如果列表没有歌曲了,播放状态为false
  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  }
}
