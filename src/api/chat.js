import request from './request'

//获取当前用户所有聊天记录
export const getChatListApi = (userinfo)=>{
    return request({
        url:'/chat/get_chat_list',
        params:userinfo
    })
}
//获取当前聊过天的用户
export const getChatUserListApi= (userinfo)=>{
    return request({
        url:'/chat/get_chat_user_list',
        method:'post',
        data:userinfo
    })
}

//获取当前聊天的极乐汤
export const getNowChatListApi =(sender,receiver)=>{
    return request({
        url:'/chat/get_now_chat_list',
        method:'post',
        data:{
            sender,
            receiver
        }
    })
}