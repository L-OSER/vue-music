function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    // 获取0-i的随机数
    let t = arr[i]
    arr[i] = arr[j]
    // arr[i] = 随机数的元素
    arr[j] = t
  //  arr[j] = arr[i] 随机数的元素替换
  }
  console.log(arr)
  return arr
}
