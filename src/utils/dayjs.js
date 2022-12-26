import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)


// 解析xx多少分钟前时间
/**
 * 
 * @param {String} time  2019-03-11 09:00:00
 * @returns 
 */
export const parseTime = time => {
  return dayjs().to(dayjs(time))
}
//解析出生时间
export const parsebirthdayTime = systemtime => {
  return dayjs(systemtime).format('YYYY-MM-DD')
}



