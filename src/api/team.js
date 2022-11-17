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
        method: 'post',
        data
    })
}

//获取团队成员
export const getTeamPersonApi = (data) => {
    return request({
        url: '/team/get_team_person',
        params: data
    })
}


//增加团队成员
export const addEmployeeApi = (person) => {
    return request({
        url: '/team/add_employee',
        method: 'post',
        data: person
    })
}

//获取单个团队成员
export const getEmployeeDetailApi = (eid) => {
    return request({
        url: "/team/get_employee_detail",
        params: {
            eid
        }
    })
}

//修改成员信息
export const uploadEmployeeApi = (data) => {
    return request({
        url: "/team/upload_employee",
        method: 'post',
        data
    })
}

//删除成员
export const deleteEmployApi = (eid) => {
    return request({
        url: "/team/delete_employee", 
        method:'delete',
        params: {
            eid
        }
    })
}
