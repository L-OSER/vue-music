import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
/*
禁止跨域
export function search(query, page, zhida) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    remoteplace: 'txt.mqq.all',
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
*/
export function search(query, page, zhida, perpage) {
  // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const url = '/api/search' // 在webpack.dev.config启用了代理跨域
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: 1537612841753
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    // 成功后返回
    return Promise.resolve(res.data)
  })
}
