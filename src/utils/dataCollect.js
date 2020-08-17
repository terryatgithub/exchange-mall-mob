import './cm.js'

function submitLog(logType, typer, data) {
    // window._czc.push(['_trackEvent', category, action, label, '', ''])
    window._cooc.push(['_trackEvent', logType, typer, data])
}

//曝光
function submitLogShow(data) {
    // console.log('sumit show')
    submitLog('web_page_show_new', "曝光", data)
}
//点击
function submitLogClick(data) {
    submitLog('web_button_clicked_new', "点击", data)
}
//结果
function submitLogResult(data) {
    submitLog('web_event_result_new', "结果", data) 
}

function install(Vue) {
    Vue.prototype.$submitLogShow = submitLogShow
    Vue.prototype.$submitLogClick = submitLogClick
    Vue.prototype.$submitLogResult = submitLogResult
}

export default {
    install
}
