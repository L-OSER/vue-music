function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    // 获取0-i的随机数
    let t = _arr[i]
    _arr[i] = _arr[j]
    // _arr[i] = 随机数的元素
    _arr[j] = t
  //  _arr[j] = _arr[i] 随机数的元素替换
  }
  return _arr
}
