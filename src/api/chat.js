import request from './request'

//获取当前用户所有聊天记录
export const getChatListApi = (userinfo)=>{
    return request({
        url:'/chat/get_chat_list',
        params:userinfo
    })
}