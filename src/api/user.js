import request from './request'

//登入
export const login_api = (data) => {
    return request({
        url:'/user/login',
        method:'post',
        data
    })
}

//注册
export const register_api = (data) => {
    return request({
        url:'/user/register',
        method:'post',
        data
    })
}

//获取验证码
export const get_code_api = (data) => {
    return request({
        url:'/user/get_code',
        params:{
            username:data
        }
    })
}