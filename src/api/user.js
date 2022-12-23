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


