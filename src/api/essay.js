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
//搜索联想
export const sugapi = (q) => {
  return ajax({
    method: 'get',
    url: `/v1_0/suggestion?q=${q}`,
  })
}

//搜索结果
export const resapi = (params) => {
  return ajax({
    method: 'get',
    url: `/v1_0/search`,
    params,
  })
}
//搜索记录 
export const seachhistoryapi = (params) => {
  // return ajax({
  //   method: 'get',
  //   url: `/v1_0/search/histories`,
  //   params,
  // })
  return ["vue", "js", "javascript"]  //虚拟数据
}

