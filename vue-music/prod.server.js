var express = require('express')
var config = require('./config/index')
var axios = require('axios')
// 开头调用:
var express = require('express')
var axios = require('axios')
var app = express()
var apiRoutes = express.Router()

app.get('/api/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' // 原api
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/getSongList', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg' // 原api
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/music', function (req, res) {//这里的路径是给前端发送请求的url
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  // http://183.60.131.110/amobile.music.tc.qq.com/C400002HuRZ4120Ght.m4a?guid=309651137&vkey=1EB659071A547AED4B2853C5F5F2B9CBFE08647599B7C12767B32FF71E6EE5CA4A4EDD9A880FBC54969E7DB04A8926FB9CEACA70E5A4E68C&uin=0&fromtag=66
  //   http://dl.stream.qqmusic.qq.com/C400002HuRZ4120Ght.m4a?vkey=ED1A21A13F2D546039FB7314C025F0204CA199CE35458C2FE4F18E80DAE17D3DEAE104839786B1F26168F317AA8694BB2954B66E94E9004D&guid=309651137&uin=0&fromtag=66
  // axios发送get请求，可以自己配置config
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/api/lyric', function (req, res) {
  var url = 'https://szc.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      // 以单词a-z，A-Z开头，一个或多个
      // \(\)转义括号以（）开头结尾
      // （）是用来分组
      // 【^()】不以左括号/右括号的字符+多个
      // {}大括号也要匹配到
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
        // 对匹配到的分组的内容进行转换
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })

})
//搜索列表接口
// https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp
app.get('/api/search', function(req, res) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

// 静态资源
app.use(express.static('./dist'))

var port = process.env.PORT || config.build.prot

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
