import request from './request'

export const get_header_list = (userinfo) => {
    return request({
        url:'/index/get_header_list',
        params:{
            userinfo
        }
    }) 
}

export const get_aside_data = () => {
    return request({
        url:'/index/get_aside_data'
    }) 
}

export const getUserApi = (userinfo) => {
    return request({
        url:'/index/get_user_data',
        method:'post',
        data:userinfo
    }) 
}

