import request from './request'

//获取发布的宴席信息
export const getFeastListApi = (currentPage,pageSize) => {
    return request({
        url:'/feast/get_feast_list',
        params:{
            currentPage,
            pageSize
        }
    })
}

//获取发布宴席的username
export const getNameListApi = (uid) => {
    return request({
        url:'/feast/get_name_list',
        params:{
            uid
        }
    })
}
