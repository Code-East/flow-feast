import request from './request'

//获取宴席订单列表
export const getOrderListApi = (data, pageObj) => {
    return request({
        url: '/order/get_order_list',
        method: 'post',
        data: {
            userinfo: data,
            pageObj
        }
    })
}

//删除宴席订单
export const detleteOrderApi = (oid) => {
    return request({
        url: '/order/delete_order',
        method: 'delete',
        params: {
            oid
        }
    })
}

//订单退款
export const orderRefundApi = (data) => {
    return request({
        url: '/order/order_refund',
        method: 'post',
        data
    })
}

//获取退款信息
export const getRefundMessageApi = (oid) => {
    return request({
        url: '/order/get_refund_message',
        params: {
            oid
        }
    })
}

//确认退款
export const allowRefundApi = (oid) => {
    return request({
        url: '/order/allow_refund',
        params: {
            oid
        }
    })
}

//驳回退款
export const rejectRefundApi = (oid) => {
    return request({
        url: '/order/reject_refund',
        params: {
            oid
        }
    })
}

//完成订单
export const completeOrderApi = (oid) => {
    return request({
        url: '/order/complete_order',
        params: {
            oid
        }
    })
}

//付款
export const paymentOrderApi = (orderData) => {
    return request({
        url:'/order/order_payment',
        method:'post',
        data:orderData
    })
}