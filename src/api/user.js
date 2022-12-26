/**
 * 用户相关api
 */
import ajax from "@/utils/req"

// 用户登录
export const loginapi = (data) => {
  return ajax({
    method: 'post',
    url: "/v1_0/authorizations",
    data,
  })
}

//发送验证码
export const sendSmsapi = mobile => {
  return ajax({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}

//获取用户资料
export const getuserinfoapi = () => {
  return ajax({
    method: 'get',
    url: "/v1_0/user",
  })
}
//关注用户

export const followingapi = (target) => {
  return ajax({
    method: 'post',
    url: "/v1_0/user/followings",
    data: {
      target
    }
  })
}
//取消关注
export const delfollowingapi = (target) => {
  return ajax({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`,
  })
}

//获取个人资料
export const profileapi = () => {
  return ajax({
    method: 'get',
    url: `/v1_0/user/profile`,
  })
}
// 编辑个人资料
export const editprofileapi = data => {
  return ajax({
    method: 'PATCH',
    url: `/v1_0/user/profile`,
    data
  })
}
//设置头像
export const avatarapi = data => {
  return ajax({
    method: 'PATCH',
    url: `/v1_0/user/photo`,
    data
  })
}
