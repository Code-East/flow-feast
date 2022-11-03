import request from './request'

export const get_header_list = () => {
    return request({
        url:'/index/get_header_list'
    }) 
}

export const get_aside_data = () => {
    return request({
        url:'/index/get_aside_data'
    }) 
}