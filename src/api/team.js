import request from './request';

export const get_Team_List = (currentPage,pageSize) => {
    return request({
        url:'/feast/get_feast_team_list',
        params:{
            currentPage,
            pageSize
        }
    })
}