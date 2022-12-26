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

// 获取文章详情
export const articleapi = (article_id) => {
  return ajax({
    method: 'get',
    url: `/v1_0/articles/${article_id}`,
  })
}
//获取一级评论
//获取二级评论
export const commentsapi = (params) => {
  return ajax({
    method: 'get',
    url: `/v1_0/comments`,
    params
  })
}
//文章点赞
export const forbidClickapi = target => {
  return ajax({
    method: 'post',
    url: `/v1_0/article/likings`,
    data: {
      target
    }
  })
}
//取消文章点赞
export const delforbidClickapi = target => {
  return ajax({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`,
  })
}
//收藏文章
export const collectionsapi = target => {
  return ajax({
    method: 'post',
    url: `/v1_0/article/collections`,
    data: {
      target
    }
  })
}
//取消收藏文章
export const delcollectionsapi = target => {
  return ajax({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`,
  })
}

//对评论点赞

export const commentlikeapi = target => {
  return ajax({
    method: 'post',
    url: `/v1_0/comment/likings`,
    data: {
      target
    }
  })
}

//发布评论

export const postcommentsapi = data => {
  return ajax({
    method: 'post',
    url: `/v1_0/comments`,
    data,
  })
}

