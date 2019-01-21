import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  // 数组有这条数据,并且不是第一条
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 在数组头插入一个元素
  arr.unshift(val)
  // 如果有长度限制,并且大于这个长度,则抛出最后一个元素
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function saveSearch(query) {
  // 获取缓存上的搜索历史
  let searches = storage.get(SEARCH_KEY, [])
  // 处理刚搜索的元素,查找是否搜索过
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  // 设置新的缓存历史
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
