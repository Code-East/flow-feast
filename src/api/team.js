import request from './request';

//获取所有上线的团队
export const get_Team_List = (currentPage, pageSize) => {
    return request({
        url: '/feast/get_feast_team_list',
        params: {
            currentPage,
            pageSize
        }
    })
}

//获取单个团队信息
export const getTeamDataApi = (id) => {
    return request({
        url: '/team/get_team_data',
        params: {
            id
        }
    })
}

//修改团队信息
export const setTeamDataApi = (data) => {
    return request({
        url: '/team/set_team_data',
        method:'post',
        data
    })
}