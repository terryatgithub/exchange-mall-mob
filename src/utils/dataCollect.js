import './cm.js'

function submitLog(logType, data) {
    // window._czc.push(['_trackEvent', category, action, label, '', ''])
    window._cooc.push(['_trackEvent', 'user_exmall2020_mob', logType, data])
}

 //曝光
 function submitLogShow(data) {
     console.log('sumit show')
    submitLog('web_page_show_new', data)
}
//点击
function submitLogClick(data) {
    submitLog('web_button_clicked_new', data)
}
//结果
function submitLogResult(data) {
    submitLog('web_event_result_new', data)
}

function install(Vue) {
    Vue.prototype.$submitLogShow = submitLogShow
    Vue.prototype.$submitLogClick = submitLogClick
    Vue.prototype.$submitLogResult = submitLogResult
}

export default {
    install
}
