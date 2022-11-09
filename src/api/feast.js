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

//获取个人用户发布的宴席
export const getPersonalFeastListApi = () => {
    return request({
        url:'/feast/get_personal_feast',
    })
}

//发布宴席
export const publicFeastApi = (data) => {
    return request({
        url:'/feast/public_feast',
        method:'post',
        data
    })
}

//查看宴席
export const getDetailFeastApi = (fid) => {
    return request({
        url:'/feast/check_feast',
        params:{
            fid
        }
    })
}

//删除宴席
export const deleteFeastApi = (fid) => {
    return request({
        url:'/feast/delete_feast',
        method:"delete",
        params:{
            fid
        }
    })
}

//修改宴席
export const updateFeastApi = (feast,fid) => {
    return request({
        url:'/feast/update_feast',
        method:"post",
        data:{
            feast,
            fid
        }
    })
}