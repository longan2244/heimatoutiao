/**
 * 文章相关api
 */
import ajax from "@/utils/req"
// 获取用户频道
export const channelsapi = () => {
  return ajax({
    method: 'get',
    url: "/v1_0/user/channels",
  })
}
//获取全部频道
export const allchannelsapi = () => {
  return ajax({
    method: 'get',
    url: "/v1_0/channels"
  })
}

//获取文章列表
export const articlesapi = (channel_id, timestamp) => {
  return ajax({
    method: 'get',
    url: `/v1_0/articles?channel_id=${channel_id}&timestamp=${timestamp}`,
  })
}
