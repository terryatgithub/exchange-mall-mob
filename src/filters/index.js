import dayjs from 'dayjs'

const timeFilter = (value) => {
  value = value.toString()
  console.log(value)
  if (value) {
    if (value.length === 13) {
      return dayjs(Number(value)).format('YYYY-MM-DD HH:mm:ss')
    }
    return dayjs.unix(Number(value)).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return '-'
  }
}

//保留两位小数
const numFilter = (value) => {
  // 截取当前数据到小数点后三位
  let tempVal = parseFloat(value).toFixed(3)
  let realVal = tempVal.substring(0, tempVal.length - 1)
  return realVal
}

export default {
  timeFilter,
  numFilter
}
