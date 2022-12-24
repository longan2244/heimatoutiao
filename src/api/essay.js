/**
 * 文章相关api
 */
import ajax from "@/utils/req"
// 获取频道
export const channelsapi = () => {
  return ajax({
    method: 'get',
    url: "/v1_0/user/channels",
  })
}
//获取文章推荐


export const articlesapi = (channel_id, timestamp) => {
  return ajax({
    method: 'get',
    url: `/v1_0/articles?channel_id=${channel_id}&timestamp=${timestamp}`,
  })
}
