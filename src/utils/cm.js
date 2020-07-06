/* eslint-disable */
;(function () {
  //获取浏览器信息
  var BrowserMatch = {
    init: function () {
      this.browser = this.getBrowser().browser || 'An Unknown Browser'
      this.version = this.getBrowser().version || 'An Unknown Version'
      this.OS = this.getOS() || 'Windows'
    },
    getOS: function () {
      if (navigator.userAgent.indexOf('Android') > -1) {
        return 'Android'
      } else if (navigator.userAgent.indexOf('iPhone') > -1) {
        return 'IOS'
      } else if (navigator.userAgent.indexOf('Linux') > -1) {
        return 'Linux'
      } else if (navigator.userAgent.indexOf('Macintosh') > -1) {
        return 'MAC'
      } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
        return 'WP'
      } else if (navigator.userAgent.indexOf('Windows') > -1) {
        return 'Windows'
      }
    },
    getBrowser: function () {
      var rMsie = /(msie\s|trident\/7)([\w\.]+)/
      var rTrident = /(trident)\/([\w.]+)/
      var rFirefox = /(firefox)\/([\w.]+)/
      var rOpera = /(opera).+version\/([\w.]+)/
      var rNewOpera = /(opr)\/(.+)/
      var rChrome = /(chrome)\/([\w.]+)/
      var rSafari = /version\/([\w.]+).*(safari)/
      var ua = navigator.userAgent.toLowerCase()
      var matchBS, matchBS2
      matchBS = rMsie.exec(ua)
      if (matchBS != null) {
        matchBS2 = rTrident.exec(ua)
        if (matchBS2 != null) {
          switch (matchBS2[2]) {
            case '4.0':
              return {
                browser:
                  'IE',
                version: '8'
              }
              break
            case '5.0':
              return {
                browser:
                  'IE',
                version: '9'
              }
              break
            case '6.0':
              return {
                browser:
                  'IE',
                version: '10'
              }
              break
            case '7.0':
              return {
                browser:
                  'IE',
                version: '11'
              }
              break
            default:
              return {
                browser:
                  'IE',
                version: 'Undefined'
              }
          }
        } else {
          return {
            browser: 'IE',
            version: matchBS[2] || '0'
          }
        }
      }
      matchBS = rFirefox.exec(ua)
      if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
        return {
          browser: matchBS[1] || '',
          version: matchBS[2] || '0'
        }
      }
      matchBS = rOpera.exec(ua)
      if ((matchBS != null) && (!(window.attachEvent))) {
        return {
          browser: matchBS[1] || '',
          version: matchBS[2] || '0'
        }
      }
      matchBS = rChrome.exec(ua)
      if ((matchBS != null) && (!!(window.chrome)) && (!(window.attachEvent))) {
        matchBS2 = rNewOpera.exec(ua)
        if (matchBS2 == null) {
          return {
            browser: matchBS[1] || '',
            version: matchBS[2] || '0'
          }
        } else {
          return {
            browser: 'Opera',
            version: matchBS2[2] || '0'
          }
        }
      }
      matchBS = rSafari.exec(ua)
      if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
        return {
          browser: matchBS[2] || '',
          version: matchBS[1] || '0'
        }
      }
      return {
        browser: '',
        version: ''
      }
    }
  }
  BrowserMatch.init()
  function getOS() { // 获取当前操作系统
    var os
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //Android
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    if (isAndroid) {
      os = 'Android'
    } else if (isIOS) {
      os = 'IOS'
    } else if (navigator.userAgent.indexOf('Macintosh') > -1) {
      return 'MAC'
    } else if (navigator.userAgent.indexOf('Windows') > -1) {
      var isWin = (navigator.platform == 'Win32') || (navigator.platform == 'Windows')
      if (isWin) {
        var sUserAgent = navigator.userAgent
        var isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1
        if (isWin2K) return 'Win2000'
        var isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1
        if (isWinXP) return 'WinXP'
        var isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1
        if (isWin2003) return 'Win2003'
        var isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1
        if (isWinVista) return 'WinVista'
        var isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1
        if (isWin7) return 'Win7'
      } else {
        os = 'Windows'
      }
    }
    /*  if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
      os = 'Android';
    } else if (navigator.userAgent.indexOf('iPhone') > -1) {
      os = 'IOS';
    } else if (navigator.userAgent.indexOf('iPad') > -1) {
      os = 'iPad';
    }else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
      os = 'WP';
    } else if (navigator.userAgent.indexOf('Windows') > -1) {
      var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
      if (isWin) {
        var sUserAgent = navigator.userAgent;
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
      } else {
        os = 'Windows';
      }

    }*/ else {
      os = 'Others'
    }
    return os
  }

  function getOSVersion() { // 获取操作系统版本
    var OSVision = '0'
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //Android
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

    if (isAndroid) {
    //  OSVision = navigator.userAgent.split(';')[2].match(/\d+\.\d+/g)[0];
      var ua = navigator.userAgent.toLowerCase()
      var reg = /android [\d._]+/gi
      var v_info = ua.match(reg)
      OSVision = (v_info + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.') //得到版本号4.2.2
      //OSVision = parseInt(OSVision.split('.')[0]);// 得到版本号第一位
    }
    if (isIOS) {
      // OSVision = navigator.userAgent.split(';')[1].match(/(\d+)_(\d+)_?(\d+)?/)[0];
      var ua = navigator.userAgent.toLowerCase()

      var reg = /os [\d._]+/gi
      var v_info = ua.match(reg)
      OSVision = (v_info + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.') //得到版本号9.3.2或者9.0
      //  version = parseInt(version.split('.')[0]); // 得到版本号第一位
    }
    return OSVision
  }

  //获取cookie,做为sid的值
  function getCookie(c_name) {
    if (document.cookie.length > 0) {
      var c_start
      var c_end
      c_start = document.cookie.indexOf(c_name + '=')
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    var t = (new Date()).getTime().toString()
    var r = RndNum(6).toString()
    var v = t + r
    setCookie(c_name, v, 30)
    return getCookie(c_name)
  }
  //产生随机数函数
  function RndNum(n) {
    var rnd = ''
    for (var i = 0; i < n; i++) { rnd += Math.floor(Math.random() * 10) }
    return rnd
  }
  function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    //因域名关系无法设置
    //document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())+";path=/;domain=coocaa.com";
  }

  var deleteKey = ['open_id', 'did', 'mac', 'sid', 'device', 'pkg']

  var tempdevice = {
    'brand': BrowserMatch.OS == 'Windows' ? 7 : BrowserMatch.OS == 'MAC' ? 7 : 6,
    'model': BrowserMatch.OS == 'Windows' ? 'PC端' : BrowserMatch.OS == 'MAC' ? 'PC端' : '移动端',
    'chip': '', //BrowserMatch.OS =="Windows" ? "PC端" : "移动端",
    'os': BrowserMatch.OS == 'Windows' ? 7 : BrowserMatch.OS == 'MAC' ? 7 : 6,
    'sys_ver': '', // BrowserMatch.OS == "Windows" ? "PC端" : "移动端",
    'vercode': '', //BrowserMatch.OS == "Windows" ? "PC端" : "移动端",
    'barcode': ''// BrowserMatch.OS == "Windows" ? "PC端" : "移动端"
  }

  var temppkg = {
    'pkg_name': getOS() + '_' + getOSVersion(),
    'pkg_version': BrowserMatch.version,
    'pkg_source': BrowserMatch.browser
  }
  function GetUrlRelativePath() {
    var url = document.location.toString()
    var arrUrl = url.split('//')

    var start = arrUrl[1].indexOf('/')
    var relUrl = arrUrl[1].substring(start)//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf('?') != -1) {
      relUrl = relUrl.split('?')[0]
    }
    return relUrl
  }

  function k() {
    this.params = {}
    this.params.data = {}
    //Document对象数据
    if (document) {
      this.params.data.domain = document.domain || ''
      this.params.data.url = document.URL || ''
      this.params.data.path = GetUrlRelativePath() || ''
      this.params.data.title = document.title || ''
      this.params.data.referrer = document.referrer || ''
    }
    //Window对象数据
    if (window && window.screen) {
      this.params.data.height = window.screen.height || 0
      this.params.data.width = window.screen.width || 0
      this.params.data.colorDepth = window.screen.colorDepth || 0
    }
    //navigator对象数据
    if (navigator) {
      this.params.data.lang = navigator.language || ''
    }
    //var time = (new Date()).getTime().toString();
    var time = (new Date()).valueOf().toString()
    // var time = Date.parse( new Date() ).toString().substr(0,10);
    this.params.time = time
    this.params.data.open_id = '未登录'
    this.params.data.did = getCookie('COOCAA_ID')
    this.params.data.mac = getCookie('COOCAA_ID')
    this.params.data.sid = getCookie('COOCAA_ID')
    this.params.data.device = tempdevice
    this.params.data.pkg = temppkg
    this.Ca()
  }

  function g(a,
    b) {
    try {
      console.log('记录异常' + a.name + f(b))
    } catch (d) {
    }
    return !0
  }

  var q = (function () {
      /*      for (var a = document.getElementsByTagName("script"), b = 0, c = a.length; b < c; b++) {
                var d, e = a[b];
                if (e.src && (d = /^(https?:)\/\/[\w\.\-]+\.cnzz\.com\//i.exec(e.src))) return d[1]
            }*/
      return window.location.protocol
    }()),
    h = document, e = window, f = encodeURIComponent, m = decodeURIComponent, r = unescape,
    t = q + '//c.cnzz.com/core.php', u = q + '//ca.cnzz.com'
  k.prototype = {
    Ca: function () {
      try {
        this.Ea()
      } catch (a) {
        g(a, 'i failed')
      }
    },

    Ea: function () { //集成事件L方法,相当于html
      try {
        var a = this
        e._cooc = {
          push: function () {
            return a.L.apply(a, arguments)
          }
        }
      } catch (b) {
        g(b, 'oP failed')
      }
    },

    L: function (a) {
      try {
        if ({}.toString.call(a) === '[object Array]') {
          switch (a[0]) {
            case '_trackEvent':
              this.s(a)
              break
          }
        }
      } catch (x) {
        g(x, 'aC failed')
      }
    },

    s: function (a) {
      try {
        var img = new Image(1, 1)
        // var time = Date.parse( new Date() ).toString().substr(0,10);
        // var time = Date.parse( new Date() ).toString()
        var time = (new Date()).valueOf().toString()
        this.params.time = time
        if (a[1]) { //
          this.params.name = a[1]
        } else {
          return false
        }
        if (a[2]) {
          this.params.type = a[2]
        } else {
          this.params.type = '浏览'
        }
        if (a[3] && a[3] instanceof Object && !(a[3] instanceof Array)) {
          // this.params.data=a[3]
          //this.params.data.test="test"
          for (var i in a[3]) {
            this.params.data[i] = a[3][i]
          }
        }
        for (var i = 0; i < deleteKey.length; i++) {
          var key = deleteKey[i]
          // console.log(key);
          if (key == 'device') {
            var tdevice = this.params.data.device || {}
            var cdevice = {}
            delete this.params.data.device
            for (var p in tempdevice) {
              cdevice[p] = tdevice[p] || tempdevice[p]
            }
            this.params.device = cdevice
          } else if (key == 'pkg') {
            var tpkg = this.params.data.pkg || {}
            var cpkg = {}
            delete this.params.data.pkg
            for (var p in temppkg) {
              cpkg[p] = tpkg[p] || temppkg[p]
            }
            this.params.pkg = cpkg
          } else {
            var v = this.params.data[key] || ''
            if (key == 'open_id') {
              if (v == null || v == '' || v == '未登录') {
                v = ''
                key = 'uid'
                this.params[key] = v
              } else {
                key = 'uid'
                this.params[key] = v
              }
            } else if (key == 'mac' || key == 'did') {
              v = 'COOCAA_ID'
              delete this.params.data[key]
              this.params[key] = getCookie(v)
            } else if (key == 'sid') {
              var sidVal = this.params.data[key]
              delete this.params.data[key]
              if (sidVal) {
                this.params[key] = sidVal
              } else {
                this.params[key] = getCookie(v)
              }
            } else {
              delete this.params.data[key]
              this.params[key] = v
            }
          }
        }

        var jsonStr = JSON.stringify(this.params)
        console.log(jsonStr)
        //console.log(this.params)
        //document.write(jsonStr)
        img.src = 'http://wlog.skysrt.com/dataCollect/push?params=' + encodeURIComponent(jsonStr)
        //清除这次传过来的参数
        for (var i in a[3]) {
          delete this.params.data[i]
        }
      } catch (d) {
        g(d, 'sD failed')
      }
    }

  }
  try {
    var p = new k()
  } catch (a) {
    g(a, 'main failed')
  }
})();
